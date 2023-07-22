import React from "react"
import { FiSearch, FiUser } from "react-icons/fi"
import { FaCamera } from "react-icons/fa"
import Header from "@/components/header"
import Footer from "@/components/footer"
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

export default function RoomChat({ token }) {
  return (
    <>
      <Header token={token} />
      <div className="w-full h-full bg-gray-400 bg-chat bg-no-repeat bg-cover">
        <div className="flex justify-center gap-4 md:flex-nowrap flex-wrap px-5 py-10">
          <div className="flex flex-col gap-11 max-w-[448px] min-h-[1000px] rounded-xl px-12 py-14 bg-primary">
            <div className="flex gap-3 px-9 py-5 rounded-full bg-gray-200">
              <FiSearch size={25} />
              <input
                className="w-full bg-transparent outline-none"
                type="text"
                placeholder="Search Chat"
              />
            </div>
            <div>
              <p className="text-white text-center text-[15px] font-semibold">
                Choose a staff you want to talk with
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 py-5 border-b border-white">
                <div>
                  <FiUser size={50} color="white" />
                </div>
                <div className="flex flex-col gap-3 text-white">
                  <p className="text-xl font-semibold">Jason</p>
                  <p className="text-[15px]">
                    Hey, I&apos;m Jason, Let&apos;s talk and share what&apos;s
                    on your thoughts!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-5 border-b border-white">
                <div>
                  <FiUser size={50} color="white" />
                </div>
                <div className="flex flex-col gap-3 text-white">
                  <p className="text-xl font-semibold">Cheryn</p>
                  <p className="text-[15px]">
                    Hey, I&apos;m Cheryn, can I help you? Just chat me if you
                    have some trouble in ordering, happy shopping!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-5 border-b border-white">
                <div>
                  <FiUser size={50} color="white" />
                </div>
                <div className="flex flex-col gap-3 text-white">
                  <p className="text-xl font-semibold">Lou</p>
                  <p className="text-[15px]">
                    Hey, I&apos;m Lou, I&apos;ll here to help you, just talk to
                    me and we solve the problem. Have a good day!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between max-w-[570px] max-h-full">
            <div className="flex flex-col gap-12">
              <div className="bg-white px-[46px] py-7 rounded-xl">
                <p className="text-3xl font-semibold">Jason</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 py-5 bg-white px-[46px] rounded-xl">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="text-[10px] text-[#9F9F9F]">02.14 PM</p>
                      <p className="text-xl font-semibold">Zulaikha</p>
                    </div>
                    <p className="text-[15px] text-right">
                      Hey jason, I can&apos;t find the promo section. Can u tell
                      me where is it?
                    </p>
                  </div>
                  <div>
                    <FiUser size={50} />
                  </div>
                </div>
                <div className="flex items-center gap-4 py-5 bg-white px-[46px] rounded-xl">
                  <div>
                    <FiUser size={50} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold">Jason</p>
                      <p className="text-[10px] text-[#9F9F9F]">02.14 PM</p>
                    </div>
                    <p className="text-[15px]">
                      Hey, thanks for asking. It&apos;s in product menu, you can
                      see them on the left side.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-5 bg-white px-[46px] rounded-xl">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="text-[10px] text-[#9F9F9F]">02.14 PM</p>
                      <p className="text-xl font-semibold">Zulaikha</p>
                    </div>
                    <p className="text-[15px] text-right">
                      Hey jason, I can&apos;t find the promo section. Can u tell
                      me where is it?
                    </p>
                  </div>
                  <div>
                    <FiUser size={50} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center h-16 bg-white rounded-xl px-12 py-5 mt-5">
              <input className="w-full pr-2 outline-none" type="text" />
              <FaCamera size={25} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
