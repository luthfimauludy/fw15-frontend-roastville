import React from "react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import logo from "public/logo_roastville.png"
import Link from "next/link"
import Image from "next/image"

function Footer() {
  return (
    <>
      <div className="py-14 bg-gray-200">
        <div className="w-full flex justify-around flex-wrap md:flex-nowrap">
          <div className="max-w-lg flex flex-col gap-8 px-10">
            <div className="flex items-center gap-2">
              <div className=" h-24 w-24">
                <Image src={logo} alt="" />
              </div>
              <div className="font-bold text-xl">Roastville</div>
            </div>
            <div>
              Roastville is a store that sells some good meals, and especially
              coffee. We provide high quality beans
            </div>
            <div className="flex gap-2">
              <div className="h-12 w-12 flex justify-center items-center bg-secondary rounded-full">
                <FaFacebook size={25} />
              </div>
              <div className="h-12 w-12 flex justify-center items-center bg-secondary rounded-full">
                <FaTwitter size={25} />
              </div>
              <div className="h-12 w-12 flex justify-center items-center bg-secondary rounded-full">
                <FaInstagram size={25} />
              </div>
            </div>
            <div> ©Roastville&nbsp;2023</div>
          </div>
          <div className="flex gap-20 w-full justify-around pt-10">
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Product</div>
              <div className="flex flex-col gap-3">
                <Link href="/">Download</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Locations</Link>
                <Link href="/">Countries</Link>
                <Link href="/">Blog</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Engage</div>
              <div className="flex flex-col gap-3">
                <Link href="/">Coffee Shop</Link>
                <Link href="/">FAQ</Link>
                <Link href="/">About Us</Link>
                <Link href="/">Privacy Policy</Link>
                <Link href="/">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
