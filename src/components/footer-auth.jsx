import React from "react"
import Image from "next/image"
import logo from "public/logo_roastville.png"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai"

function FooterAuth() {
  return (
    <>
      <footer className="md:flex md:gap-8 flex-1 pl-4 py-4 hidden">
        <div className="w-[50%] p-4">
          <div>
            <div className="flex gap-2 items-center">
              <div className="h-14 w-14">
                <Image src={logo} className="object-cover" alt="picture_side" />
              </div>
              <div className="text-[20px] font-bold ">RoastVille</div>
            </div>
            <div>
              RoastVille is a store that sells some good meals, and especially
              coffee. We provide high quality beans
            </div>
            <div className="flex gap-4 pt-4">
              <div>
                <AiFillTwitterCircle size={25} />
              </div>
              <div>
                <AiFillFacebook size={25} />
              </div>
              <div>
                <AiFillInstagram size={25} />
              </div>
            </div>
            <div className="text-[#9F9F9F] pt-4">@RoastVille &nbsp; 2023</div>
          </div>
        </div>
        <div className="flex-1 p-5">
          <div className="flex gap-3">
            <div className="flex flex-col">
              <div className="font-bold">Product</div>
              <div className="flex gap-8">
                <div className="flex gap-8">
                  <div className="w-28">Download </div>
                  <div>Pricing </div>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-28">Locations</div>
                <div>Countries </div>
              </div>
              <div>Blog</div>
              <div className="font-bold pt-4">Engage</div>
              <div className="flex gap-8">
                <div className="w-28">RoastVille? </div>
                <div>About Us </div>
              </div>
              <div className="flex gap-8">
                <div className="w-28">FAQ</div>
                <div>Privacy Policy</div>
              </div>
              <div>Terms of Service</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterAuth
