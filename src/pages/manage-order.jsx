import React from "react"
import Header from "@/components/header"
import Footer from "@/components/Footer"
import Image from "next/image"
import {
  BsCheck,
  BsFillCreditCardFill,
  BsBank2,
  BsCashCoin,
} from "react-icons/bs"

function ManageOrder() {
  return (
    <>
      <div className="header pb-24">
        <Header />
      </div>
      <div className="bg-payment bg-center bg-cover bg-no-repeat font-rubik">
        <div className="px-28 py-10 flex flex-col gap-5">
          <div className="relative w-96 self-center">
            <div className="flex justify-between z-10 relative text-white">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  {/* <div className="h-5 w-5 rounded-full bg-primary"></div> */}
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Order</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  {/* <div className="h-5 w-5 rounded-full bg-primary"></div> */}
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  {/* <div className="h-5 w-5 rounded-full bg-primary"></div> */}
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Payment</span>
              </div>
            </div>
            <hr className="h-[1px] w-80 p-0 absolute top-[28%] right-10 border-white" />
          </div>
          <div className="text-white font-bold text-4xl max-w-sm">
            Finish your customer order now.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mx-10 flex justify-center p-5">
            {/* <div className="bg-white w-full md:w-96 ml-[5%] md:ml-[0px] px-[5%] py-[5%] rounded-lg bg-blue-500 items-center"> */}
            <div className="bg-white rounded-lg p-10 w-[90%]">
              <div className="text-center font-bold text-[35px] font-poppins">
                Dine in for Zulaikha
              </div>
              <div className="text-xl text-center">Table 4</div>
              <div className="flex flex-col gap-[19px] mt-[10%]">
                <div className="flex gap:[20px] md:gap-[33px]">
                  <div>
                    <Image
                      src="/paymentBg.png"
                      width={90}
                      height={100}
                      className="rounded-lg"
                      alt="desc"
                    />
                  </div>
                  <div className="flex-1 text-xl md:text-xl">
                    <p className="">product name</p>
                    <p>quantity</p>
                    <p>size</p>
                  </div>
                  <p className="text-xl flex items-center">IDR 10000</p>
                </div>
              </div>
              <hr className="border-[#D0B8A8] mt-[5%]" />
              <div className="flex flex-col gap-3 mt-[5%]">
                <div className="flex">
                  <div className="grow">SUB TOTAL</div>
                  <p>IDR 100000</p>
                </div>
                <div className="flex">
                  <div className="grow">TAX & FEES</div>
                  <div>IDR 100000</div>
                </div>
                <div className="flex">
                  <div className="grow">SHIPPING</div>
                  <div>IDR 1000000</div>
                </div>
              </div>
              <div className="flex mt-[5%] text-2xl font-bold">
                <div className="grow">TOTAL</div>
                <div>IDR 100000</div>
              </div>
            </div>
            {/* <div className="bg-white rounded-lg p-10 w-[90%] h-[90%] mt-[28px]"></div> */}
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col text-white w-10/12 md:w-[50%] pt-[5%]">
              <div className="font-bold grow">Payment Method</div>
            </div>
            <div className="bg-white w-10/12 md:w-[50%] rounded-lg px-[42px] py-[30px]">
              <div>
                <div className="flex items-center gap-[11px]">
                  <input type="radio" name="radio-1" className="radio" />
                  <div className="h-10 w-10 bg-[#F47B0A] flex justify-center items-center rounded-lg">
                    <BsFillCreditCardFill size={20} className="text-white" />
                  </div>
                  <div>Card</div>
                </div>
                <div className="outline outline-1 outline-black mt-[17px]"></div>
                <div className="flex items-center gap-[11px] pt-[17px]">
                  <input type="radio" name="radio-1" className="radio" />
                  <div className="h-10 w-10 bg-[#895537] flex justify-center items-center rounded-lg">
                    <BsBank2 className="text-white" />
                  </div>
                  <div>Bank Account</div>
                </div>
                <div className="outline outline-1 outline-black mt-[17px]"></div>

                <div className="flex items-center gap-[11px] pt-[17px]">
                  <input type="radio" name="radio-1" className="radio" />
                  <div className="h-10 w-10 bg-[#FFBA33] flex justify-center items-center rounded-lg">
                    <BsCashCoin size={20} className="text-white" />
                  </div>
                  <div>Cash on Delivery</div>
                </div>
              </div>
            </div>
            <button className="w-10/12 md:w-[50%] bg-secondary h-16 m-5 rounded-lg text-white font-bold text-lg hover:bg-amber-600 active:bg-amber-700 active:scale-[.9] duration-300">
              Mark as done
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ManageOrder
