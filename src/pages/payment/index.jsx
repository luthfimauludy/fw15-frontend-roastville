import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import {
  BsCheck,
  BsFillCreditCardFill,
  BsBank2,
  BsCashCoin,
} from "react-icons/bs"
import { withIronSessionSsr } from "iron-session/next"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useSelector } from "react-redux"
import http from "@/helpers/http"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null
  checkCredentials(token, res, "/auth/login")
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

const PaymentAndDeliveryCust = ({ token }) => {
  const product = useSelector((state) => state.product.data)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function getPaymentMethod() {
      try {
        const { data } = await http(token).get("/paymentMethods")
        setPaymentMethods(data.results)
      } catch (err) {
        console.log(err)
      }
    }

    getPaymentMethod()
  }, [token])

  const makePayment = async () => {
    const name = product.name
    const price = product.variant[0].price
    const form = new URLSearchParams({ name, price }).toString()
    try {
      const { data } = await http(token).post("/history", form)
      if (data.results) {
        router.push("/product/history-cust")
      }
    } catch (err) {
      const message = err.response?.data?.message
      setErrMsg(message)
    }
  }

  return (
    <>
      <div className="header">
        <Header token={token} />
      </div>
      <div className="bg-payment bg-center bg-cover bg-no-repeat font-rubik">
        <div className="pt-32 px-36 flex flex-col gap-5">
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
          <div className="text-white font-bold text-4xl w-full">
            Checkout Your Item Now
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mx-10 flex justify-center p-5">
            {/* <div className="bg-white w-full md:w-96 ml-[5%] md:ml-[0px] px-[5%] py-[5%] rounded-lg bg-blue-500 items-center"> */}
            <div className="bg-white rounded-lg p-10 w-[80%]">
              <div className="text-center font-bold text-[35px] font-poppins">
                Order Summary
              </div>
              <div className="flex flex-col gap-[19px] mt-[10%]">
                <div className="flex gap:[20px] md:gap-[33px]">
                  <div>
                    <Image
                      src={product.picture}
                      width={90}
                      height={100}
                      className="rounded-lg"
                      alt="desc"
                    />
                  </div>
                  <div className="flex-1 text-md md:text-xl">
                    <p className="">{product.name}</p>
                    <p>{product.variant[0].quantity}</p>
                    <p>{product.variant[0].name}</p>
                  </div>
                  <p className="text-xl flex items-center">
                    IDR {product.variant[0].price}
                  </p>
                </div>
              </div>
              <hr className="border-[#D0B8A8] mt-[5%]" />
              <div className="flex flex-col gap-3 mt-[5%]">
                <div className="flex">
                  <div className="grow">SUB TOTAL</div>
                  <p>IDR {product.variant[0].price}</p>
                </div>
                <div className="flex">
                  <div className="grow">TAX & FEES</div>
                  <div>-</div>
                </div>
                <div className="flex">
                  <div className="grow">SHIPPING</div>
                  <div>-</div>
                </div>
              </div>
              <div className="flex mt-[5%] text-2xl font-bold">
                <div className="grow">TOTAL</div>
                <div>IDR {product.variant[0].price}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex text-white w-10/12 md:w-[50%]">
              <div className="font-bold grow">Address Details</div>
              <div>edit</div>
            </div>
            <div className="bg-white w-10/12 md:w-[50%] rounded-lg px-[42px] py-[30px] flex flex-col gap-5">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, nostrum.
              </div>
              <div className="outline outline-1 outline-[#DFD3C3]"></div>
              <div>phone number</div>
            </div>
            <div className="flex flex-col text-white w-10/12 md:w-[50%] pt-[5%]">
              <div className="font-bold grow">Payment Method</div>
            </div>
            <div className="bg-white w-10/12 md:w-[50%] rounded-lg px-[42px] py-[30px]">
              {paymentMethods.map((p) => (
                <>
                  <div>
                    <div className="outline outline-1 outline-black mt-[17px]"></div>
                    <div className="flex items-center gap-[11px] pt-[17px] cursor-pointer">
                      <input
                        type="radio"
                        name="paymentmethod"
                        className="radio"
                        id="paymentmethod"
                      />
                      <div className="h-10 w-10 bg-[#895537] flex justify-center items-center rounded-lg">
                        <BsBank2 className="text-white" />
                      </div>
                      <label htmlFor="paymentmethod">{p.name}</label>
                    </div>
                    <div className="outline outline-1 outline-black mt-[17px]"></div>
                  </div>
                </>
              ))}
            </div>
            <button
              onClick={makePayment}
              className="w-10/12 md:w-[50%] flex items-center justify-center bg-secondary h-16 m-5 rounded-lg text-white font-bold text-lg hover:bg-amber-600 active:bg-amber-700 active:scale-[.9] duration-300"
            >
              Confirm and Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentAndDeliveryCust
