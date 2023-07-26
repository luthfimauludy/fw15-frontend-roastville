import React from "react"
import Image from "next/image"
import image from "/public/img-coupon.png"
import Header from "@/components/header"
import Footer from "@/components/footer"
import http from "@/helpers/http"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addVoucher,
  clearProduct,
  productDetail,
  variantDetail,
} from "@/redux/reducers/product"
import { withIronSessionSsr } from "iron-session/next"
import { FaArrowLeft } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { Formik } from "formik"
import { setMessage } from "@/redux/reducers/message"

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null
  checkCredentials(token, res, "/auth/login")
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

function SearchResults({ token }) {
  const [product, setProduct] = React.useState([])
  const message = useSelector((state) => state.message.data)
  const [selectedVoucher, setSelectedVoucher] = React.useState(null)
  const dispatch = useDispatch()
  const router = useRouter()

  const getProductCategory = React.useCallback(async () => {
    try {
      const { data } = await http().get("/categories")
      setCategories(data.results)
    } catch (err) {
      console.log(err)
    }
  }, [])

  async function getProductsSort(sort = "id") {
    try {
      const { data } = await http(token).get("/events", {
        params: {
          sort: sort,
        },
      })
      setSearchResults(data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function getProductsPaginated(page = 1) {
    try {
      const { data } = await http(token).get("/products", {
        params: {
          page: page,
        },
      })
      setProduct(data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const getEventSearch = useCallback(
    async function getEventsBySearch() {
      try {
        const { data } = await http().get("/products", {
          params: {
            search: message,
          },
        })
        setProduct(data)
      } catch (err) {
        console.log(err)
      }
    },
    [message]
  )

  React.useEffect(() => {
    dispatch(clearProduct())
    getEventSearch()
  }, [dispatch, getProductCategory, getEventSearch])

  const dispatchEvent = (item) => {
    const encodedProductName = encodeURIComponent(item.name)
    const url = `/product/${encodedProductName}`
    dispatch(
      productDetail({
        id: item.id,
        name: item.name,
        picture: item.picture,
        description: item.description,
      })
    )
    dispatch(
      variantDetail({
        quantity: 1,
        selectedQty: 1,
      })
    )
    dispatch(addVoucher(selectedVoucher))
    router.replace(url)
  }

  const setLimit = async (event) => {
    const limit = event.target.value
    const { data } = await http().get("/products", { params: { limit } })
    setProduct(data)
  }

  const sortProduct = async (event) => {
    const sort = event.target.value
    const { data } = await http().get("/products", { params: { sort } })
    setProduct(data)
  }

  const handleSearch = (values) => {
    getEventSearch()
    dispatch(setMessage(values.search))
  }

  return (
    <div className="h-min-screen">
      <Header token={token} />
      <div className="flex flex-wrap-reverse xl:flex-nowrap">
        <div className="w-full flex pt-10 justify-center flex-col items-center gap-20 mb-20">
          <div className="flex flex-col gap-10">
            <Formik initialValues={{ search: "" }} onSubmit={handleSearch}>
              {({ handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="pt-14 z-10">
                    <div className="relative">
                      <input
                        type="text"
                        className="input input-bordered w-full sm:max-w-lg pl-14 rounded-full"
                        placeholder="Search"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="search"
                      ></input>
                      <div className="absolute top-2.5 left-6">
                        <FiSearch size={25} />
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
            <div className="flex justify-center items-center gap-2">
              <p className="font-bold text-2xl">Sort By</p>
              <select onChange={sortProduct} className="select select-bordered">
                <option value="id">ID</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="font-bold text-2xl">Limit</p>
              <select onChange={setLimit} className="select select-bordered">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-20 px-10">
            <div className="flex justify-center items-center flex-wrap px-10 gap-10">
              {product?.results?.rows?.length === 0 ? (
                <div className="text-xl font-bold">No Data</div>
              ) : (
                product?.results?.rows?.map((item) => {
                  return (
                    <div
                      onClick={() => dispatchEvent(item)}
                      key={`product-${item.id}`}
                      className="flex flex-col justify-between bordered-2 items-center w-48 h-56 border border-none rounded-xl shadow-xl p-3 mb-7 cursor-pointer hover:scale-[1.05] active:scale-[.9] duration-300"
                    >
                      <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
                        <div className="w-32 justify-center h-32 shadow-lg border rounded-full overflow-hidden object-cover flex items-center mt-[-50px]">
                          <Image
                            src={item.picture}
                            alt="img-product.png"
                            width="400"
                            height="400"
                            className="object-cover w-full h-full bg-cover flex justify-center self-center"
                          />
                        </div>
                        <div className="text-center font-black text-xl text-accent">
                          {item?.name}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="flex w-full justify-center items-center gap-5 mt-5 md:mt-0">
              <button
                disabled={product.results?.pageInfo?.page <= 1}
                onClick={() =>
                  getProductsPaginated(product.results?.pageInfo?.page - 1)
                }
                className="btn bg-primary text-white border-none normal-case hover:bg-primary"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                disabled={
                  product.results?.pageInfo?.page ===
                  product.results?.pageInfo?.totalPage
                }
                onClick={() =>
                  getProductsPaginated(product.results?.pageInfo?.page + 1)
                }
                className="btn bg-primary text-white border-none normal-case hover:bg-primary"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchResults
