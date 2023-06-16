import Image from "next/image"
import Link from "next/link"
import React from "react"
import logo from "public/assets/img/logo_roastville.png"

function Headers() {
  return (
    <>
      <div className="flex w-full justify-between items-center px-36 h-24 bg-white">
        <div className="flex justify-center items-center gap-2">
          <div className="h-20 w-20">
            <Image src={logo} alt="coffee_image"></Image>
          </div>
          <div className="text-black tracking-wide font-extrabold">
            Roastville
          </div>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-5 text-gray-600">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Product</Link>
            </li>
            <li>
              <Link href="/">Your Cart</Link>
            </li>
            <li>
              <Link href="/">History</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-10">
          <Link href="/auth/sign-in">
            <div>
              <button className="text-black font-bold">Login</button>
            </div>
          </Link>
          <div className="max-w-lg">
            <Link href="/auth/sign-up">
              <button className="btn btn-primary normal-case text-white rounded-3xl w-full max-w-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Headers
