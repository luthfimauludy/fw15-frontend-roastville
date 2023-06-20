import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image"
import side_picture from "/public/picture_auth.jpg"
import logo from "/public/logo_roastville.png"
import { Formik } from "formik"
import * as Yup from "yup"
import FooterAuth from "@/components/footer-auth"
import cookieConfig from "@/helpers/cookieConfig"
import { withIronSessionSsr } from "iron-session/next"
import axios from "axios"
import { clearMessage } from "@/redux/reducers/message"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

function SignIn({ token }) {
  const [openEye, setOpenEye] = useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is empty !"),
    password: Yup.string().required("Password is empty !"),
  })
  const router = useRouter()
  const [load, setLoad] = React.useState(false)

  const [message, setMessage] = useState("")
  const msg = useSelector((state) => state.message.message)
  const dispatch = useDispatch()

  async function doLogin(values) {
    try {
      setLoad(true)
      const email = values.email
      const password = values.password
      const form = new URLSearchParams({
        email,
        password,
      }).toString()

      const { data } = await axios.post("../api/login", form.toString())
      setLoad(false)
      if (data?.results?.token) {
        router.push("/")
      }

      if (data?.message === "auth_wrong_password") {
        setMessage("invalid email or password")
      }
    } catch (err) {
      const msg = err.response?.data?.message

      if (msg) {
        setMessage("Email is invalid")
      }

      setTimeout(() => {
        setMessage(false)
      }, 3000)
      setLoad(false)
    }
  }
  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }, [dispatch, msg])
  React.useEffect(() => {
    if (token) {
      router.push("/")
    }
  })
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
        <div className="bg-login md:bg-login_mobile bg-no-repeat bg-cover flex flex-col flex-1">
          <div className="flex h-[75%] flex-col gap-12 items-center p-5">
            <div className=" flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <div className="h-14 w-14">
                  <Image src={logo} className="object-cover" alt="logo" />
                </div>
                <div className="text-[20px] font-bold ">RoastVille</div>
              </div>
              <div className="flex items-center">
                <span className="text-[20px] font-bold">Login</span>
              </div>
            </div>
            <div className="flex justify-center">
              {message && (
                <div className="alert alert-error text-lg text-white">
                  {message}
                </div>
              )}
              {msg && (
                <div className="alert alert-error text-lg text-white">
                  {msg}
                </div>
              )}
            </div>
            <div className="flex justify-center w-full px-0 md:px-24">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={doLogin}
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
                            className={
                              errors.password
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
                          {errors.password && touched.password && (
                            <label htmlFor="password" className="label p-0">
                              <span className="label-text-alt font-bold text-md text-error">
                                {errors.password}
                              </span>
                            </label>
                          )}
                          <Link href="/auth/forgot-password">
                            <label className="label flex justify-end">
                              <p className="text-primary font-bold cursor-pointer text-end hover:text-black">
                                Forgot Password
                              </p>
                            </label>
                          </Link>
                        </div>
                        <div className="w-full pt-8">
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
                              Sign In
                            </button>
                          )}
                        </div>
                        <div className="btn bg-white mt-4 hidden md:flex gap-4 items-center justify-center shadow-2xl normal-case ">
                          <div>
                            <FcGoogle size={25} />
                          </div>
                          <div className="text-[17px] font-bold ">
                            Login with Google
                          </div>
                        </div>
                        <div className="flex w-full items-center pt-4">
                          <div className="border-b-2 w-[50%] "></div>
                          <div className="text-[#9F9F9F] w-full text-[16px] text-center ">
                            Don&apos;t have an account?
                          </div>
                          <div className="border-b-2 w-[50%]"></div>
                        </div>
                        <div className="md:pt-4 md:block hidden">
                          <Link href="/auth/register">
                            <button className="btn btn-secondary rounded-xl w-full normal-case text-[20px] font-bold shadow-xl text-white">
                              Sign Up
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

export default SignIn
