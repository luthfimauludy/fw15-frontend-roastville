import Link from "next/link"
import Image from "next/image"
import Coffee from "../../../public/coffee.png"
import { FiSearch } from "react-icons/fi"
import { BsChatLeftText } from "react-icons/bs"
import ProfilePhoto from "../../../public/profilephoto.png"
import { FaFacebook } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import Filter from "../../../public/filter.png"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import Stacked from "../../../public/stacked.png"
import Headers from "@/components/header"

export default function Dashboard() {
  return (
    <>
      <div className="header pb-24">
        <Headers token={token} />
      </div>
      <div className="w-full h-[1050px]">
        <div className="text-primary font-bold text-2xl w-full flex items-center justify-center h-[100px]">
          See how your store progress so far
        </div>
        <div>
          <div>
            <div className="w-full flex pl-20 gap-10">
              <div className="flex gap-10 w-full h-14">
                <details className="dropdown mb-32">
                  <summary className="btn m-1 bg-white border-none hover:bg-white">
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <Image src={Filter} alt="" />
                      <div className="normal-case">Filter</div>
                    </div>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <a>Filter</a>
                    </li>
                  </ul>
                </details>
                <div className="text-lg font-black h-[60px] flex items-center">
                  15 April - 21 April 2020
                </div>
                <div className="flex gap-5 h-[60px] justify-center items-center">
                  <button>
                    <MdKeyboardArrowLeft size={30} />
                  </button>
                  <button>
                    <MdKeyboardArrowRight size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full p-20">
          <div className="flex flex-col gap-10 flex-auto w-1/2">
            <div className="flex w-auto h-[701px] rounded-2xl justify-center items-center">
              <Image src={Stacked} alt=""></Image>
            </div>
            <div>
              <button className="btn btn-primary shadow-2xl w-full normal-case text-white">
                Download Report
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-12 flex-auto w-1/2">
            <div className="w-[515px] h-[317px] shadow-2xl rounded-2xl flex items-center justify-center flex-col gap-5">
              <div className="flex gap-5">
                <div className="w-18 h-18 rounded-full">
                  <Image src={ProfilePhoto} alt=""></Image>
                </div>
                <div className="max-w-xs">
                  <div className="font-bold text-lg">Cheryn Laurent</div>
                  <div>Keep up the good work and spread love!</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 border-t-2 pt-5">
                <div className="font-black text-xl">
                  Best Staff of the Month
                </div>
                <div>
                  <div
                    className="radial-progress text-primary"
                    style={{ "--value": 90 }}
                  >
                    90%
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div>Achieved 3.5M of total 5M</div>
                  <div>478 Customers</div>
                </div>
              </div>
            </div>
            <div className="w-[515px] h-[317px] shadow-2xl rounded-2xl flex flex-col gap-4 items-center justify-center p-10">
              <div className="text-xl font-black ">Goals</div>
              <div>Your goals is still on 76%. Keep up the good work!</div>
              <div>
                <div
                  className="radial-progress text-primary"
                  style={{ "--value": 90 }}
                >
                  90%
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div>
              <button className="btn btn-primary shadow-2xl normal-case text-white w-full">
                Share Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full flex flex-col justify-around bg-[#F8F8F8]">
        <div className="py-14">
          <div className="w-full flex justify-around">
            <div className="max-w-lg flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <div>
                  <Image src={Coffee} alt="" />
                </div>
                <div className="font-bold text-xl">Coffee Shop</div>
              </div>
              <div>
                Coffee Shop is a store that sells some good meals, and
                especially coffee. We provide high quality beans
              </div>
              <div className="flex gap-2">
                <FaFacebook size={25} />
                <FaTwitter size={25} />
                <FaInstagram size={25} />
              </div>
              <div>©2020CoffeeStore</div>
            </div>
            <div className="flex gap-20">
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
      </footer>
    </>
  )
}
