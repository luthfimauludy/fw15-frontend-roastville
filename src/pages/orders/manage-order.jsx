import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { withIronSessionSsr } from "iron-session/next"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useCallback, useEffect, useState } from "react"
import http from "@/helpers/http"
import { productDetail } from "@/redux/reducers/product"
import { variantDetail } from "@/redux/reducers/product"
import { FaArrowLeft } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
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

const ManageOrder = ({ token }) => {
  const [listTransactions, setListTransactions] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  console.log(listTransactions)
  const getListTransactions = useCallback(
    async (page = 1) => {
      try {
        const { data } = await http(token).get("/transactions", {
          params: {
            page: page,
          },
        })
        setListTransactions(data)
      } catch (err) {
        console.log(err)
      }
    },
    [token]
  )

  useEffect(() => {
    getListTransactions()
  }, [token, getListTransactions])

  const dispatchEvent = (item, index) => {
    const encodedProductName = encodeURIComponent(item.name)
    const url = `/orders/${encodedProductName}`
    dispatch(
      productDetail({
        id: index + 1,
        name: item.name,
        picture: item.picture,
        description: item.description,
      })
    )
    dispatch(variantDetail(item.variant))
    router.replace(url)
  }

  return (
    <div className="max-w-full max-h-full">
      <Header token={token} />
      <div className="bg-payment bg-no-repeat bg-cover h-screen pb-[100px] px-10">
        <div className="flex flex-col justify-center items-center leading-10 pt-20">
          <h1 className="text-white text-4xl font-bold text-center">
            Here&apos;s transactions list
          </h1>
        </div>
        <div className="flex justify-center items-center pt-20">
          <div className="flex justify-center items-center flex-wrap gap-10">
            {listTransactions?.results?.rows.map((transactions, index) => {
              return (
                <>
                  <div
                    className="max-w-[400px] md:h-[150px] py-5 px-5 md:px-10 md:py-10 bg-white rounded-2xl hover:opacity-50 cursor-pointer flex justify-center items-center"
                    key={index}
                    onClick={() => dispatchEvent(transactions, index)}
                  >
                    <Image
                      src={transactions.picture}
                      width={50}
                      height={50}
                      alt=""
                      className="max-w-sm object-cover"
                    />
                    <div className="flex-1 text-lg">
                      <p className="font-bold text-2xl">{transactions.name}</p>
                      <p>{transactions.name}</p>
                      <p>{transactions.status}</p>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="flex w-full justify-center items-center gap-5 mt-12">
          <button
            disabled={listTransactions.results?.pageInfo?.page <= 1}
            onClick={() =>
              getListTransactions(listTransactions.results?.pageInfo?.page - 1)
            }
            className="btn bg-primary text-white border-none normal-case hover:bg-primary"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            disabled={
              listTransactions.results?.pageInfo?.page ===
              listTransactions.results?.pageInfo?.totalPage
            }
            onClick={() =>
              getListTransactions(listTransactions.results?.pageInfo?.page + 1)
            }
            className="btn bg-primary text-white border-none normal-case hover:bg-primary"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageOrder
