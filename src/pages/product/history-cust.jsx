import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { withIronSessionSsr } from "iron-session/next"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useEffect, useState } from "react"
import http from "@/helpers/http"

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null
  checkCredentials(token, res, "/auth/login")
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

const HistoryCust = ({ token }) => {
  const [history, setHistory] = useState([])
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    async function getHistory() {
      try {
        const { data } = await http(token).get("/history")
        setHistory(data.results)
      } catch (err) {
        const message = err.response?.data?.message
        setErrMsg(message)
      }
    }

    getHistory()
  }, [token])

  return (
    <div className="max-w-full max-h-full">
      <Header token={token} />
      <div className="bg-payment bg-no-repeat bg-cover pb-[100px]">
        <div className="flex flex-col justify-center items-center leading-10 pt-[160px]">
          <h1 className="text-white text-4xl font-bold">
            Let&apos;s see what you have bought!
          </h1>
          <p className="text-white">Long press to delete item</p>
        </div>
        <div className="flex justify-center items-center pt-20">
          <div className="grid grid-cols-3 gap-5">
            {history.map((h) => {
              console.log(h)
              return (
                <>
                  <div className="w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50 cursor-pointer">
                    <div className="py-5 px-5 flex gap-5">
                      <Image
                        src={h.picture}
                        width="82"
                        height="90"
                        alt="tomato"
                        className="rounded-full"
                      />
                      <div className="flex-1 text-lg">
                        <p className="font-bold text-2xl">{h.name}</p>
                        <p>IDR {h.price}</p>
                        <p>Delivered</p>
                      </div>
                      <input
                        className="self-end"
                        type="checkbox"
                        name="check"
                        id=""
                      />
                    </div>
                    <div></div>
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

export default HistoryCust
