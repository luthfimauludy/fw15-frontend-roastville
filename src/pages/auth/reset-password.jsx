import React, { useState } from "react"
import side_picture from "public/picture_auth.jpg"
import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image"
import logo from "public/logo_roastville.png"
import { Formik } from "formik"
import * as Yup from "yup"
import FooterAuth from "@/components/footer-auth"
import { useRouter } from "next/router"
import http from "@/helpers/http"
import { RiErrorWarningLine } from "react-icons/ri"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { setMessage } from "@/redux/reducers/message"

function SignUp() {
  const [openEye, setOpenEye] = useState(false)
  const [errorMsg, seterrorMsg] = useState("")
  const [errorMsg2, seterrorMsg2] = useState("")
  const [successMsg, setsuccessMsg] = useState("")
  const router = useRouter()
  const [load, setLoad] = React.useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is empty !"),
    newPassword: Yup.string().required("New password is empty !"),
    confirmPassword: Yup.string().required("Confirm password is empty !"),
    confirmPassword: Yup.string()
      .required("Confirm password is empty !")
      .oneOf([Yup.ref("newPassword"), null], "Password must be match"),
  })

  function showEye() {
    setOpenEye(!openEye)
  }
  async function doSubmit(values) {
    setLoad(true)
    try {
      setMessage("")
      const email = values.email
      const newPassword = values.newPassword
      const confirmPassword = values.confirmPassword

      const form = new URLSearchParams({
        email,
        newPassword,
        confirmPassword,
      }).toString()
      const { data } = await http().post("/auth/reset-password", form)
      console.log(data)
      setLoad(false)
      if (data) {
        setsuccessMsg("Password has been reset successfully")
        router.replace("/auth/login")
      }
    } catch (err) {
      const message = err?.response?.data.message
      seterrorMsg(message)
      if (err?.response?.data?.results[0].msg === "Email is invalid") {
        seterrorMsg("Email is Invalid")
      }
      if (
        err?.response?.data?.results[0].msg ===
        "Password must be strong, must include capital letters, numbers and symbols"
      ) {
        seterrorMsg("Password be strong")
      }
    }

    setLoad(false)
  }

  if (errorMsg || successMsg) {
    setTimeout(() => {
      seterrorMsg(false)
      setsuccessMsg(false)
    }, 3000)
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
        <div className="bg-login md:bg-login_mobile  bg-no-repeat bg-cover flex flex-col flex-1">
          <div className="flex h-[75%] flex-col gap-12 items-center p-5">
            <div className=" flex flex-col items-center justify-center w-full">
              <div className="flex gap-2 items-center">
                <div className="h-14 w-14">
                  <Image src={logo} className="object-cover" alt="logo" />
                </div>
                <div className="text-[20px] font-bold ">RoastVille</div>
              </div>
              <div className="text-[40px] font-bold pt-8 ">
                Reset Your Password
              </div>
            </div>

            {errorMsg && (
              <div className="alert alert-error text-xl text-white text-center">
                <RiErrorWarningLine />
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="alert alert-success text-xl text-white text-center">
                <AiOutlineCheckCircle />
                {successMsg}
              </div>
            )}
            <div className="flex justify-center w-full px-0 md:px-24">
              <Formik
                initialValues={{
                  email: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={doSubmit}
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
                            <span className="label-text text-[20px] font-bold md:text-black text-white">
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
                            className={
                              errors.email
                                ? "input input-error w-full px-3 mb-2"
                                : "input input-bordered w-full px-3 mb-2"
                            }
                          />
                          {errors.email && touched.email && (
                            <label htmlFor="email" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.email}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control w-full relative">
                          <label className="label">
                            <span className="label-text text-[20px] font-bold  md:text-black text-white">
                              New Password :
                            </span>
                          </label>
                          <input
                            type={openEye ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                            placeholder="Enter new password"
                            className={
                              errors.newPassword
                                ? "input input-error w-full px-3 mb-2"
                                : "input input-bordered w-full px-3 mb-2"
                            }
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
                          {errors.newPassword && touched.newPassword && (
                            <label htmlFor="newPassword" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.newPassword}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control w-full relative">
                          <label className="label">
                            <span className="label-text text-[20px] font-bold  md:text-black text-white">
                              Confirm New Password :
                            </span>
                          </label>
                          <input
                            type={openEye ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder="Enter confirm password"
                            className={
                              errors.confirmPassword
                                ? "input input-error w-full px-3 mb-2"
                                : "input input-bordered w-full px-3 mb-2"
                            }
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
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <label
                                htmlFor="confirmPassword"
                                className="label p-0"
                              >
                                <span className="label-text-alt font-bold text-md text-error">
                                  {errors.confirmPassword}
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
                              Confirm
                            </button>
                          )}
                        </div>

                        <button className="md:hidden btn btn-secondary rounded-xl w-full normal-case text-[20px] font-bold">
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
