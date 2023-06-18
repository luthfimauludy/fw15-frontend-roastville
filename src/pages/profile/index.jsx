import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import React from "react"
import { FiEdit2 } from "react-icons/fi"

import { withIronSessionSsr } from "iron-session/next"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null
  checkCredentials(token, res, "/auth/login")
  return {
    props: {
      token,
    },
  }
}, cookieConfig)
const Profile = ({ token }) => {
  return (
    <>
      <div className="header">
        <Header token={token} />
      </div>
      <div className="bg-profile bg-cover bg-center font-poppins bg-primary p-10">
        <div className="flex lg:px-[5rem] py-5">
          <span className="text-white text-2xl font-bold">User Profile</span>
        </div>
        <div className="bg-no-repeat bg-cover bg-slate-100 lg:mx-20 rounded-lg p-10 flex flex-col md:flex-row justify-center gap-10">
          <div className="flex flex-col gap-10 items-center md:w-80">
            <div className="rounded-full overflow-hidden bg-blue-600 flex justify-center items-center w-36 h-36 md:w-32 md:h-32 lg:w-52 lg:h-52">
              <Image
                src="/coffee.png"
                width={100}
                height={100}
                alt=""
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-center m-2">
              <p className="text-xl font-bold">name</p>
              <p>email</p>
            </div>
            <div className="flex flex-col gap-5">
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-primary h-16 rounded-3xl">
                Save
              </button>
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-secondary h-16 rounded-3xl">
                Cancel
              </button>
            </div>
            <div>
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-info h-16 rounded-3xl">
                Edit Password
              </button>
            </div>
            <span className="max-w-[200px] text-center">
              Do you want to save the change?
            </span>
            <div className="flex flex-col gap-5">
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-primary h-16 rounded-3xl">
                Save Change
              </button>
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-secondary h-16 rounded-3xl">
                Cancel
              </button>
            </div>
            <div>
              <button className="w-48 md:w-32 lg:w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-info h-16 rounded-3xl">
                Logout
              </button>
            </div>
          </div>
          <div className="shadow-[0_0px_50px_1px_rgba(0,0,0,0.3)] rounded-lg md:w-[60%] lg:flex flex-col p-10 border-b-[12px] border-primary gap-14">
            <form className="flex-col flex gap-10">
              <div className="flex items-center justify-between">
                <span className="text-[#4F5665] text-[25px] font-bold self-start">
                  Contacts
                </span>
                <div className="flex justify-center items-center bg-secondary w-10 h-10 rounded-full">
                  <button className="flex justify-center items-center">
                    <FiEdit2 size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                      Email adress :
                    </span>
                    <div className="text-[18px] font-rubik ">
                      <input
                        type="email"
                        className="input input-bordered w-full max-w-xs opacity-50"
                        name="email"
                      />
                    </div>
                    <hr className="border-[1px] border-black" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]">
                      Delivery adress :
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs opacity-50"
                    />
                    <hr className="border-[1px] border-black" />
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                      Mobile number :
                    </span>
                    <input
                      type="number"
                      className="input input-bordered w-full max-w-xs opacity-50"
                    />
                    <hr className="border-[1px] border-black" />
                  </div>
                </div>
              </div>
              <span className="text-[#4F5665] text-[25px] font-bold">
                Details
              </span>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                      Display Name :
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs opacity-50"
                    />
                    <hr className="border-[1px] border-black" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                      First name :
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs opacity-50"
                    />
                    <hr className="border-[1px] border-black" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                      Last name :
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs opacity-50"
                    />
                    <hr className="border-[1px] border-black" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Mobile number :
                  </span>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs opacity-50"
                  />
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
              <div className="flex flex-col-2 justify-center gap-10 p-10">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]"
                  />
                  <label>
                    {/* <label name='gender' value='0' type='radio' className='radio radio-primary'/> */}
                    <span>Male</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]"
                  />
                  <label htmlFor="">Female</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
