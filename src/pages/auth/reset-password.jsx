import React, { useState } from "react"
import side_picture from "public/picture_auth.jpg"
import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image"
import logo from "public/logo_roastville.png"
import { Formik } from "formik"
import * as Yup from "yup"
import FooterAuth from "@/components/footer-auth"

function SignUp() {
  const [openEye, setOpenEye] = useState(false)
  // const [load, setLoad] = React.useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is empty !"),
    newPassword: Yup.string().required("New Password is empty !"),
    confirmPassword: Yup.string().required("confirm new password si empty !"),
    confirmPassword: Yup.string()
      .required("confirm new password si empty !")
      .oneOf([Yup.ref("newPassword"), null], "Password must be match"),
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
        <div className="bg-login md:bg-login_mobile flex flex-col flex-1">
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
            <div className="flex justify-center w-full px-0 md:px-24">
              <Formik
                initialValues={{
                  email: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                // onSubmit={dologin}
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
                            placeholder="Enter your newPassword"
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
                            <span className="label-text text-[20px] font-bold">
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
                            placeholder="Enter your confirmPassword"
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
                          {/* {load ? (
                            <button
                              type="submit"
                              className="w-full btn btn-primary normal-case text-white"
                            >
                              <span className="loading loading-spinner loading-sm"></span>
                            </button>
                          ) : ( */}
                          <button
                            type="submit"
                            className=" w-full btn btn-primary normal-case text-white"
                          >
                            Confirm
                          </button>
                          {/* )} */}
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
