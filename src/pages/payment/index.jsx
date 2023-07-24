import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import http from "@/helpers/http"
import { BsCheck, BsBank2 } from "react-icons/bs"
import { withIronSessionSsr } from "iron-session/next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

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
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [selectedVoucher, setSelectedVoucher] = useState([])
  const router = useRouter()
  let totalPayment =
    parseInt(product.variant.price) * parseInt(product.variant.selectedQty)

  if (product.appliedVoucher) {
    let total =
      parseInt(product.variant.price) * parseInt(product.variant.selectedQty)
    let discountPrice = total * (selectedVoucher.percentage / 100)
    if (discountPrice > parseFloat(selectedVoucher.maxAmount)) {
      discountPrice = selectedVoucher.maxAmount
    }
    totalPayment = total - discountPrice
  }

  useEffect(() => {
    async function getPaymentMethod() {
      try {
        const { data } = await http(token).get("/paymentMethods")
        setPaymentMethods(data.results)
      } catch (err) {
        console.log(err)
      }
    }

    async function getSelectedVoucher() {
      try {
        const { data } = await http().get("/vouchers", {
          params: { code: product.appliedVoucher },
        })
        setSelectedVoucher(data.results)
      } catch (err) {
        console.log(err)
      }
    }

    getSelectedVoucher()
    getPaymentMethod()
  }, [token, product.appliedVoucher])

  const makePayment = async () => {
    const itemId = product.id
    const variant = product.variant.code
    const qty = product.variant.selectedQty
    const voucher = product.appliedVoucher
    let form = new URLSearchParams()
    form.append("itemId[]", itemId)
    form.append("variant[]", variant)
    form.append("quantity[]", qty)
    form.append("statusId", 1)
    form.append("paymentMethodId", selectedPayment)

    if (selectedVoucher) {
      form.append("voucher", voucher)
    }

    try {
      const { data } = await http(token).post("/transactions", form)
      if (data.success) {
        router.replace("/product/history-cust")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header token={token} />
      <div className="bg-payment bg-center bg-cover bg-no-repeat font-rubik z-10">
        <div className="pt-10 px-10 flex flex-col gap-5">
          <div className="relative w-96 self-center z-0">
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
          <div className="text-white font-bold text-4xl w-full text-center md:px-24">
            Checkout Your Item Now!
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pb-20">
          <div className="mx-0 flex justify-center p-5">
            <div className="bg-white rounded-lg p-10 w-full">
              <div className="text-center font-bold text-[35px] font-poppins">
                Order Summary
              </div>
              <div className="flex flex-col md:flex-row gap-[19px] mt-[10%]">
                <div className="flex flex-col flex-wrap md:flex-row justify-center items-center gap-[20px] md:gap-[33px]">
                  <Image
                    src={product.picture}
                    width={100}
                    height={100}
                    alt="picture"
                  />
                  <div className="flex-1 text-md md:text-xl text-center md:text-left">
                    <p className="">{product.name}</p>
                    <p>x{product.variant.selectedQty}</p>
                    <p>{product.variant.name}</p>
                  </div>
                  <p className="text-xl flex items-center">
                    {new Intl.NumberFormat("in-IN", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.variant.price)}
                  </p>
                </div>
              </div>
              <hr className="border-[#D0B8A8] mt-[5%]" />
              <div className="flex flex-col gap-3 mt-[5%]">
                <div className="flex">
                  <div className="grow">APPLIED VOUCHER</div>
                  <div>
                    {product.appliedVoucher
                      ? product.appliedVoucher
                      : "No applied voucher"}
                  </div>
                </div>
                <div className="flex">
                  <div className="grow">SUB TOTAL</div>
                  <p>
                    {new Intl.NumberFormat("in-IN", {
                      style: "currency",
                      currency: "IDR",
                    }).format(totalPayment)}
                  </p>
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
                  }).format(totalPayment)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex text-white w-10/12 md:w-[50%]">
              <div className="font-bold grow">Address Details</div>
              <div>Edit</div>
            </div>
            <div className="bg-white w-10/12 md:w-[50%] rounded-lg px-[42px] py-[30px] flex flex-col gap-5">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, nostrum.
              </div>
              <div className="outline-[#DFD3C3]"></div>
              <div>+62812345678</div>
            </div>
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
                        id={p.id}
                        onClick={() => setSelectedPayment(p.id)}
                      />
                      <div className="h-10 w-10 bg-[#895537] flex justify-center items-center rounded-lg">
                        <BsBank2 className="text-white" />
                      </div>
                      <label
                        onClick={() => setSelectedPayment(p.id)}
                        htmlFor={p.id}
                        className="cursor-pointer"
                      >
                        {p.name}
                      </label>
                    </div>
                    <div className="outline-black mt-[17px]"></div>
                  </div>
                </>
              ))}
            </div>
            <button
              onClick={makePayment}
              disabled={!selectedPayment ? true : false}
              className="w-10/12 md:w-[50%] flex items-center justify-center bg-secondary h-16 m-5 rounded-lg text-white font-bold text-lg hover:bg-amber-600 active:bg-amber-700 active:scale-[.9] duration-300"
            >
              {selectedPayment
                ? "Confirm and Pay"
                : "Please select payment method"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentAndDeliveryCust
