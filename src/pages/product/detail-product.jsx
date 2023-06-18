import Header from "@/components/header"
import Footer from "@/components/footer"
import React from "react"
import { IoIosArrowForward } from "react-icons/io"
import Image from "next/image"
import bg_detail from "public/assets/img/bg-detail-product.jpg"
import { FiTrash2 } from "react-icons/fi"

function detailProduct() {
  return (
    <div className="h-min-screen">
      <div className="pb-24 header">
        <Header />
      </div>
      <div className="h-[100%] px-24 py-8">
        <div className="flex h-full">
          <div className="flex w-[50%]">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex font-bold items-center text-[20px] ">
                Favourit & Promo <IoIosArrowForward size={30} />
                <div>name product</div>
              </div>
              <div className="h-[700px] relative ">
                <Image
                  src={bg_detail}
                  className="h-full w-full object-cover"
                  alt="bg-detail-product"
                />
                <button className="absolute top-10 right-10 bg-secondary h-14 w-14 rounded-full flex justify-center items-center">
                  <FiTrash2 size={30} />
                </button>
              </div>
              <div className="w-[400px] text-[25px]  ">
                Delivery only{" "}
                <span className="font-bold text-[25px] ">
                  on Monday to friday at 1 - 7 pm
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1  pl-12 pr-36 py-8 ">
            <div className="flex flex-col gap-4  w-full">
              <div className="font-bold text-[65px] ">Nama Product</div>
              <div className="border-t-2 border-b-2 text-[40px] py-2 ">
                IDR 300.00
              </div>
              <div className="text-[25px]  font-semi-bold py-4 border-b-2 ">
                Cold brewing is a method of brewing that combines ground coffee
                and cool water and uses time instead of heat to extract the
                flavor. It is brewed in small batches and steeped for as long as
                48 hours.
              </div>
              <div className="flex flex-col gap-8">
                <div className="w-full h-24 pt-8">
                  <select className="select select-primary w-full h-full text-[20px] ">
                    <option disabled selected>
                      --Select Size--
                    </option>
                    <option>Reguler</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>
                <div className="w-full pt-0 h-16 ">
                  <select className="select select-primary w-full h-full text-[20px] ">
                    <option disabled selected>
                      --Select Delivery Methods--
                    </option>
                    <option>Reguler</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>
                <div className="flex gap-4 w-full h-16">
                  <div className="h-full rounded-xl flex justify-between items-center w-[40%] border bordered-2 px-4">
                    <button className="p-2 text-[20px] ">-</button>
                    <div className="p-2">0</div>
                    <button className="p-2 text-[20px]">+</button>
                  </div>
                  <div className="flex flex-1 h-full ">
                    <button className="btn btn-secondary w-full h-full">
                      Add to Chart
                    </button>
                  </div>
                </div>
                <div className="w-full h-16">
                  <button className="btn btn-primary w-full h-full">
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default detailProduct
