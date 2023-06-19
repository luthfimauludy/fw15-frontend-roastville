import React, { useState } from "react"
import side_picture from "public/picture_auth.jpg"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image"
import logo from "public/logo_roastville.png"
import { Formik } from "formik"
import * as Yup from "yup"
import FooterAuth from "@/components/footer-auth"
import http from "@/helpers/http"
import { MdError } from "react-icons/md"
import { useRouter } from "next/router"

function SignUp() {
  const router = useRouter()
  const [openEye, setOpenEye] = useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [load, setLoad] = React.useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is empty !"),
    password: Yup.string().required("Password is empty !"),
    phoneNumber: Yup.string().required("PhoneNumber is empty !"),
  })

  const doRegister = async (values) => {
    try {
      setLoad(true)
      const form = new URLSearchParams({
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      }).toString()

      const { data } = await http().post("/auth/register", form)
      console.log(data)
      if (data.success === false) {
        setErrorMessage("email or password is invalid")
        setLoad(false)
      }
      if (data.results.token) {
        router.push("/auth/login")
        setLoad(false)
      }
    } catch (err) {
      const message = err?.response?.data?.results[0].msg
      setErrorMessage(message)
    }
    setLoad(false)
  }

  function showEye() {
    setOpenEye(!openEye)
  }
  return (
    <>
      <div className="h-min-screen flex">
        <aside className="md:flex md:flex-1 hidden">
          <Image
            src={side_picture}
            className="object-cover"
            alt="picture_side"
          />
        </aside>
        <div className="bg-login md:bg-login_mobile flex flex-col flex-1">
          <div className="flex h-[75%] flex-col gap-12 items-center p-5">
            <div className=" flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <div className="h-14 w-14">
                  <Image src={logo} className="object-cover" alt="logo" />
                </div>
                <div className="text-[20px] font-bold ">RoastVille</div>
              </div>
              <div className="flex items-center">
                <span className="text-[20px] font-bold">Register</span>
              </div>
            </div>
            <div className="flex justify-center">
              {errorMessage && (
                <div className="max-w-[400px] flex flex-col gap-0 justify-center alert alert-error shadow-xl text-white text-lg">
                  <MdError size={25} />
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="flex justify-center w-full px-0 md:px-24">
              <Formik
                initialValues={{ email: "", password: "", phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={doRegister}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                }) => {
                  return (
                    <form onSubmit={handleSubmit} className="md:w-full w-full">
                      <div className="flex flex-col gap-4 ">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-[20px] font-bold">
                              Email Adress :
                            </span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter your email adress"
                            className="input input-bordered w-full  px-3"
                          />
                          {errors.email && touched.email && (
                            <label htmlFor="email" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.email}
                              </span>
                            </label>
                          )}
                          <label className="label"></label>
                        </div>
                        <div className="form-control w-full relative">
                          <label className="label">
                            <span className="label-text text-[20px] font-bold">
                              Password :
                            </span>
                          </label>
                          <input
                            type={openEye ? "text" : "password"}
                            name="password"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Enter your password"
                            className="input input-bordered w-full  px-3"
                          />
                          <button type="button" onClick={showEye}>
                            {openEye ? (
                              <FaEye
                                size={25}
                                className="absolute top-12 right-4"
                              />
                            ) : (
                              <FaEyeSlash
                                size={25}
                                className="absolute top-12 right-4"
                              />
                            )}
                          </button>
                          {errors.password && touched.password && (
                            <label htmlFor="password" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.password}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control w-full relative">
                          <label className="label">
                            <span className="label-text text-[20px] font-bold">
                              Phone Number :
                            </span>
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            placeholder="Enter your phoneNumber"
                            className="input input-bordered w-full  px-3"
                          />

                          {errors.phoneNumber && touched.phoneNumber && (
                            <label htmlFor="phoneNumber" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.phoneNumber}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="w-full pt-4">
                          {load ? (
                            <button
                              type="submit"
                              className="w-full btn btn-primary normal-case text-white"
                            >
                              <span className="loading loading-spinner loading-sm"></span>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className=" w-full btn btn-primary normal-case text-white"
                            >
                              Sign Up
                            </button>
                          )}
                        </div>
                        <div className="btn bg-white mt-4 hidden md:flex gap-4 items-center justify-center shadow-2xl normal-case ">
                          <div>
                            <FcGoogle size={25} />
                          </div>
                          <div className="text-[17px] font-bold ">
                            Sign Up with Google
                          </div>
                        </div>
                        <div className="flex w-full items-center pt-4">
                          <div className="border-b-2 w-[50%] "></div>
                          <div className="text-[#9F9F9F] w-full text-[16px] text-center ">
                            Already have an account?
                          </div>
                          <div className="border-b-2 w-[50%]"></div>
                        </div>
                        <div className="md:pt-4 md:block hidden">
                          <Link href="/auth/login">
                            <button className="btn btn-primary rounded-xl w-full normal-case text-[20px] font-bold shadow-xl">
                              Login Here
                            </button>
                          </Link>
                        </div>
                        <button className="md:hidden btn btn-primary rounded-xl w-full normal-case text-[20px] font-bold">
                          <div className="flex gap-4 justify-center shadow-bottom-xl">
                            <div>
                              <FcGoogle size={25} />
                            </div>
                            <div className="text-[17px] font-bold ">
                              Login with Google
                            </div>
                          </div>
                        </button>
                      </div>
                    </form>
                  )
                }}
              </Formik>
            </div>
          </div>
          <FooterAuth />
        </div>
      </div>
    </>
  )
}

export default SignUp
