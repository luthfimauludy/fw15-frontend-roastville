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
  const [transactionsHistory, setTransactionHistory] = useState([])
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    async function getTranscationHistory() {
      try {
        const { data } = await http(token).get("/transactions/manage")
        setTransactionHistory(data.results)
      } catch (err) {
        console.log(err)
      }
    }

    getTranscationHistory()
  }, [token])

  return (
    <div className="max-w-full max-h-full">
      <Header token={token} />
      <div className="px-10 bg-payment bg-no-repeat bg-cover pb-[100px]">
        <div className="flex flex-col justify-center items-center leading-10 pt-20">
          <h1 className="text-white text-4xl font-bold text-center">
            Let&apos;s see what you have bought!
          </h1>
          <p className="text-white">Long press to delete item</p>
        </div>
        <div className="flex justify-center items-center pt-20">
          <div className="flex justify-center items-center flex-wrap gap-10">
            {transactionsHistory.map((tr) => {
              return (
                <>
                  <div className="max-w-[394px] h-auto bg-white rounded-2xl hover:opacity-50 cursor-pointer">
                    <div className="py-5 px-5 flex gap-5">
                      <Image
                        src={tr.picture}
                        width="82"
                        height="90"
                        alt=""
                        className="rounded-full"
                      />
                      <div className="flex-1 text-lg">
                        <p className="font-bold text-2xl">{tr.name}</p>
                        <p>
                          {new Intl.NumberFormat("in-IN", {
                            style: "currency",
                            currency: "IDR",
                          }).format(tr.price)}
                        </p>
                        <p>{tr.status}</p>
                      </div>
                      <input
                        className="self-end"
                        type="checkbox"
                        name="check"
                        id=""
                      />
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

export default HistoryCust
