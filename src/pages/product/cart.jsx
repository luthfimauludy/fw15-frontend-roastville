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
      } catch (err) {
        console.log(err)
      }
    }

    getListCart()
  }, [token])

  return (
    <div className="max-w-full max-h-full">
      <Header token={token} />
      <div className="bg-payment bg-no-repeat bg-cover h-screen pb-[100px] px-10">
        <div className="flex flex-col justify-center items-center leading-10 pt-20">
          <h1 className="text-white text-4xl font-bold text-center">
            Here&apos;s your cart list
          </h1>
        </div>
        <div className="flex justify-center items-center pt-20">
          <div className="flex justify-center items-center flex-wrap gap-10">
            {listCart.map((cart, index) => {
              return (
                <>
                  <div
                    className="max-w-[400px] md:h-[150px] py-5 px-5 md:px-10 md:py-10 bg-white rounded-2xl hover:opacity-50 cursor-pointer flex justify-center items-center"
                    key={index}
                  >
                    <Image
                      src={cart.picture}
                      width={50}
                      height={50}
                      alt=""
                      className="max-w-sm object-cover"
                    />
                    <div className="flex-1 text-lg">
                      <p className="font-bold text-2xl">{cart.name}</p>
                      <p>{cart.name}</p>
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
