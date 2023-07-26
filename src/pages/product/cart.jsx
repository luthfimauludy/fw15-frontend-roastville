import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { withIronSessionSsr } from "iron-session/next"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useEffect, useState } from "react"
import http from "@/helpers/http"
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

const Cart = ({ token }) => {
  const [listCart, setListCart] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getListCart() {
      try {
        const { data } = await http(token).get("/cart")
        setListCart(data.results)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

    getListCart()
  }, [token])

  return (
    <div className="max-w-full max-h-full">
      <Header token={token} />
      <div className="bg-payment bg-no-repeat bg-cover pb-[100px] px-10">
        <div className="flex flex-col justify-center items-center leading-10 pt-20">
          <h1 className="text-white text-4xl font-bold text-center">
            Here&apos;s your cart list
          </h1>
        </div>
        <div className="flex justify-center items-center pt-20">
          <div className="flex justify-center items-center flex-wrap gap-10">
            {listCart.map((cart, index) => {
              console.log(cart.picture)
              return (
                <>
                  <div
                    className="max-w-[394px] h-auto bg-white rounded-2xl hover:opacity-50 cursor-pointer"
                    key={index}
                  >
                    <div className="py-5 px-5 flex flex-wrap gap-5">
                      <Image
                        src={cart.picture}
                        width="82"
                        height="90"
                        alt=""
                        className="rounded-full"
                      />
                      <div className="flex-1 text-lg">
                        <p className="font-bold text-2xl">{cart.name}</p>
                        <p>{cart.name}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
