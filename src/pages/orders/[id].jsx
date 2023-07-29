import React, { useCallback, useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { BsCheck, BsBank2 } from "react-icons/bs"
import { withIronSessionSsr } from "iron-session/next"
import cookieConfig from "@/helpers/cookieConfig"
import { useSelector } from "react-redux"
import http from "@/helpers/http"
import { useRouter } from "next/router"

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      token,
    },
  }
}, cookieConfig)

function ConfirmOrder({ token }) {
  const product = useSelector((state) => state.product.data)
  const [payment, setSelectedPayment] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const router = useRouter()

  const getTransactions = useCallback(async () => {
    try {
      const { data } = await http(token).get(`/transactions/${product.id}`)
      setSelectedPayment(data.results.paymentMethod)
    } catch (err) {
      console.log(err)
    }
  }, [token, product.id])

  const getPayments = useCallback(async () => {
    try {
      const { data } = await http(token).get("/paymentMethods")
      setPaymentMethods(data.results)
    } catch (err) {
      console.log(err)
    }
  }, [token])

  useEffect(() => {
    getTransactions()
    getPayments()
  }, [getTransactions, getPayments])

  async function updateTransactions(id) {
    const transactionId = id
    const statusId = new URLSearchParams({ transactionId }).toString()
    try {
      const { data } = await http(token).patch(`/transactions/status`, statusId)
    } catch (err) {
      console.log(err)
    }
    router.replace("/orders/manage-order")
  }
  console.log(product.id)

  return (
    <>
      <Header token={token} />
      <div className="bg-payment bg-center bg-cover bg-no-repeat h-screen">
        <div className="px-28 py-10 flex flex-col gap-5">
          <div className="relative w-96 self-center">
            <div className="flex justify-between z-10 relative text-white">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Order</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                  <div className="h-5 w-5 rounded-full bg-info flex justify-center items-center">
                    <BsCheck className="text-white text-xl" />
                  </div>
                </div>
                <span>Payment</span>
              </div>
            </div>
            <hr className="h-[1px] w-80 p-0 absolute top-[28%] right-10 border-white" />
          </div>
          <div className="text-white font-bold text-4xl">
            Finish your customer order now.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="md:mx-10 flex justify-center p-5">
            <div className="bg-white rounded-lg p-5 md:p-10 w-[90%]">
              <div className="flex flex-col gap-[19px]">
                <div className="flex gap-[20px] md:gap-[33px]">
                  <div>
                    <Image
                      src={product.picture}
                      width={90}
                      height={100}
                      className="rounded-lg"
                      alt="desc"
                    />
                  </div>
                  <div className="flex-1 text-xl md:text-xl">
                    <p className="">{product.name}</p>
                    <p>x{product.variant[0].quantity}</p>
                    <p>{product.variant[0].variant}</p>
                  </div>
                  <p className="text-xl flex items-center">
                    {new Intl.NumberFormat("in-IN", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.variant[0].price)}
                  </p>
                </div>
              </div>
              <hr className="border-[#D0B8A8] mt-[5%]" />
              <div className="flex flex-col gap-3 mt-[5%]">
                <div className="flex">
                  <div className="grow">Applied Voucher</div>
                  <p>IDR 100000</p>
                </div>
                <div className="flex">
                  <div className="grow">SUB TOTAL</div>
                  <div>
                    {new Intl.NumberFormat("in-IN", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.variant[0].total)}
                  </div>
                </div>
                <div className="flex">
                  <div className="grow">SHIPPING</div>
                  <div>-</div>
                </div>
              </div>
              <div className="flex mt-[5%] text-2xl font-bold">
                <div className="grow">TOTAL</div>
                <div>
                  {new Intl.NumberFormat("in-IN", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product.variant[0].total)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col text-white w-10/12 md:w-[50%] pt-[5%]">
              <div className="font-bold grow">Payment Method</div>
            </div>
            <div className="flex flex-col divide-y bg-white w-10/12 md:w-[50%] rounded-lg px-[42px] py-[30px]">
              {paymentMethods.map((p) => (
                <>
                  <div>
                    <div className="outline-gray mt-[17px]"></div>
                    <div className="flex items-center gap-[11px] cursor-pointer">
                      <input
                        type="radio"
                        name="paymentmethod"
                        className="radio"
                        checked={p.id === payment}
                        id={p.id}
                      />
                      <div className="h-10 w-10 bg-[#895537] flex justify-center items-center rounded-lg">
                        <BsBank2 className="text-white" />
                      </div>
                      <label htmlFor={p.id} className="cursor-pointer">
                        {p.name}
                      </label>
                    </div>
                    <div className="outline-black mt-[17px]"></div>
                  </div>
                </>
              ))}
            </div>
            <button
              onClick={() => updateTransactions(product.id)}
              className="w-10/12 md:w-[50%] bg-secondary h-16 m-5 rounded-lg text-white font-bold text-lg hover:bg-amber-600 active:bg-amber-700 active:scale-[.9] duration-300"
            >
              Mark as done
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ConfirmOrder
