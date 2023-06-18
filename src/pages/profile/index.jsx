import Footer from "@/components/Footer"
import Headers from "@/components/Headers"
import Image from "next/image"

import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { withIronSessionSsr } from "iron-session/next"
import React from "react"
import axios from "axios"

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token
    checkCredentials(token, res, "/auth/login")
    const { data } = await axios.get("http://localhost:8080/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      props: {
        token,
        user: data.results,
      },
    }
  },
  cookieConfig
)

const Profile = ({ token }) => {
  return (
    <>
      <div className="header pb-24">
        <Headers />
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
                width={200}
                height={200}
                alt=""
                className="rounded-full"
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
            <span className="text-[#4F5665] text-[25px] font-bold self-start">
              Contacts
            </span>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Email adress :
                  </span>
                  <span className="text-[18px] font-rubik ">email</span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]">
                    Delivery adress :
                  </span>
                  <span className="text-[18px] font-rubik ">address</span>
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Mobile number :
                  </span>
                  <span className="text-[18px] font-rubik ">phone</span>
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
                  <span className="text-[18px] font-rubik ">Name</span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    First name :
                  </span>
                  <span className="text-[18px] font-rubik ">name</span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Last name :
                  </span>
                  <span className="text-[18px] font-rubik ">name</span>
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                  Mobile number :
                </span>
                <span className="text-[18px] font-rubik ">phone</span>
                <hr className="border-[1px] border-black" />
              </div>
            </div>
            <div className="flex flex-col-2 justify-center gap-10 p-10">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]"
                />
                <label htmlFor="">Male</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]"
                />
                <label htmlFor="">Female</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
