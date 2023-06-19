import React, { useState } from "react"
import side_picture from "public/picture_auth.jpg"
import Image from "next/image"
import logo from "public/logo_roastville.png"
import { Formik } from "formik"
import * as Yup from "yup"
import FooterAuth from "@/components/footer-auth"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { RiErrorWarningLine } from "react-icons/ri"
import { useRouter } from "next/router"
import http from "@/helpers/http"

function SignUp() {
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()
  const [load, setLoading] = React.useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is empty !"),
  })
  async function doSubmit(values) {
    try {
      setLoading(true)
      const email = values.email
      const form = new URLSearchParams({ email }).toString()
      const { data } = await http().post("/auth/forgot-password", form)
      setLoading(false)
      if (data) {
        setSuccessMsg("Request to reset password has been sent")
      }
      setTimeout(() => {
        router.push("/auth/reset-password")
      }, 3000)
    } catch (err) {
      const message = err.response?.data?.message
      if (message === "auth_no_user") {
        setErrorMsg("your email is not found")
      }

      if (message === "email already send request") {
        setErrorMsg("Request already sent")
        setTimeout(() => {
          router.replace("/auth/reset-password")
        }, 2000)
      }

      setTimeout(() => {
        setErrorMsg("Request already sent")
        setErrorMsg(false)
        setSuccessMsg(false)
      }, 3000)
    }

    setLoading(false)
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
            <div className=" flex flex-col justify-center items-center w-full">
              <div className="flex gap-2 items-center">
                <div className="h-14 w-14">
                  <Image src={logo} className="object-cover" alt="logo" />
                </div>
                <div className="text-[20px] font-bold ">RoastVille</div>
              </div>
              <div className="text-[52px] leading-[78px] font-bold pt-8">
                Forgot your password?
              </div>
              <p>Don’t worry, we got your back!</p>
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
                initialValues={{ email: "" }}
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
                          <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter your email adress to get link"
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

                        <div>
                          <button
                            type="submit"
                            className="btn btn-primary normal-case w-full text-white shadow-2xl"
                            disabled={isSubmitting}
                          >
                            {load && (
                              <span className="loading loading-spinner loading-sm"></span>
                            )}
                            {!load && "Request Link"}
                          </button>
                        </div>
                        <div className="md:pt-4 md:block hidden">
                          <button className="btn btn-secondary rounded-xl w-full normal-case text-[20px] font-bold shadow-xl">
                            Resend Link
                          </button>
                        </div>
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
