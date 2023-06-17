import Image from "next/image"
import Link from "next/link"
import React from "react"
import logo from "public/assets/img/logo_roastville.png"
import { FiSearch } from "react-icons/fi"
import { BsChatLeftText } from "react-icons/bs"
import ProfilePhoto from "/public/profilephoto.png"


function Headers() {
  return (
    <>
      <div className="fixed w-full z-10">
        <div className="flex w-full justify-between items-center px-36 h-24 bg-white">
          <Link href='/' className="flex justify-center items-center gap-2">
            <div className="h-20 w-20">
              <Image src={logo} alt="coffee_image"></Image>
            </div>
            <div className="text-black tracking-wide font-extrabold">
              Roastville
            </div>
          </Link>
          <div>
            <div className="flex font-semibold justify-center items-center gap-7 text-gray-600">
              <span className="hover:text-secondary">
                <Link href="/">Home</Link>
              </span>
              <span className="hover:text-secondary">
                <Link href="/product">Product</Link>
              </span>
              <span className="hover:text-secondary">
                <Link href="/">Your Cart</Link>
              </span>
              <span className="hover:text-secondary">
                <Link href="/">History</Link>
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-10">
            <div className="flex gap-5">
              <Link href="/auth/sign-in">
                <div>
                  <button className="btn btn-ghost font-bold normal-case rounded-3xl">Login</button>
                </div>
              </Link>
              <div className="max-w-lg">
                <Link href="/auth/sign-up">
                  <button className="btn btn-primary normal-case text-md text-white rounded-3xl w-full max-w-lg">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center gap-10">
              <button>
                <FiSearch size={25} />
              </button>
              <Link href='/chat' className="cursor-pointer">
                <BsChatLeftText size={25} />
              </Link>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost hover:bg-white">
                  <div>
                    <Image src={ProfilePhoto} alt="" />
                  </div>
                </label>
                <ul tabIndex={0} className=" hover:bg-white dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <Link href='/profile'>
                    <li className="font-semibold">
                      <span>
                        Profile
                      </span>
                    </li>
                  </Link>
                  <button className="rounded-xl" href='/'>
                    <li className="text-red-500 font-semibold">
                      <span>Logout</span>
                    </li>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Headers
