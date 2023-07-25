import React from "react"
import Image from "next/image"
import image from "/public/img-coupon.png"
import Header from "@/components/header"
import Footer from "@/components/footer"
import http from "@/helpers/http"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
  addVoucher,
  clearProduct,
  productDetail,
  variantDetail,
} from "@/redux/reducers/product"
import { withIronSessionSsr } from "iron-session/next"

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null
  checkCredentials(token, res, "/auth/login")
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

function ProductCust({ token }) {
  const [product, setProduct] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [eventCategories, setEventCategoriesData] = React.useState([])
  const [vouchers, setVouchers] = React.useState([])
  const [selectedVoucher, setSelectedVoucher] = React.useState(null)
  const productInfo = useSelector((state) => state.product.data)
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

  const getProductsByCategory = React.useCallback(
    async function getProductsByCategory(name) {
      const { data } = await http(token).get("/products", {
        params: { category: name },
      })
      console.log(data)
      setProduct(data.results)
    },
    [token]
  )

  const getProduct = React.useCallback(async () => {
    try {
      const { data } = await http().get("/products")
      setProduct(data.results)
    } catch (error) {
      console.log(error)
    }
  }, [setProduct])

  const getVoucher = React.useCallback(async () => {
    try {
      const { data } = await http().get("/vouchers/all")
      setVouchers(data.results)
    } catch (err) {
      console.log(err)
    }
  }, [])

  React.useEffect(() => {
    getProduct()
    dispatch(clearProduct())
    getVoucher()
    getProductCategory()
    getProductsByCategory()
  }, [
    getProduct,
    dispatch,
    getVoucher,
    getProductCategory,
    getProductsByCategory,
  ])

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

  return (
    <div className="h-min-screen">
      <Header token={token} />
      <div className="flex flex-wrap-reverse xl:flex-nowrap">
        <div className="w-full xl:w-[425px] border-r-2 px-20 py-7">
          <div className="flex flex-col text-center mb-16">
            <div className="text-primary font-bold text-2xl">Promo Today</div>
            <div className="text-sm text-center">
              Coupons will be updated every weeks.
              <br />
              Check them out!
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-12">
            <div className="flex flex-wrap xl:flex-col justify-center items-center gap-5">
              {vouchers.map((v) => {
                return (
                  <>
                    <div
                      key={`voucher-${v.id}`}
                      className={
                        v.code === selectedVoucher
                          ? "flex gap-2 w-80 h-28 border rounded-xl items-center px-3 bg-[#F5C361] hover:scale-[1.05] duration-300 cursor-pointer shadow-xl"
                          : "flex gap-2 w-80 h-28 border rounded-xl items-center px-3 bg-[#C59378] hover:scale-[1.05] duration-300 cursor-pointer shadow-xl"
                      }
                      onClick={() => setSelectedVoucher(v.code)}
                    >
                      <div className="w-[25%]">
                        <Image src={image} alt="img-coupon.png" />
                      </div>
                      <div className="w-[75%]">
                        <div className="font-bold">{v.name}</div>
                        <div>{v.description}</div>
                        <div className="font-bold">{v.code}</div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            {selectedVoucher ? (
              <div className="w-80">
                <button
                  type="submit"
                  className="btn btn-primary font-bold normal-case w-full text-white"
                  onClick={() => dispatch(addVoucher(selectedVoucher))}
                >
                  {productInfo.appliedVoucher === selectedVoucher
                    ? "Coupon applied"
                    : "Apply coupon"}
                </button>
              </div>
            ) : (
              <div></div>
            )}
            <div className="w-80">
              <div
                onClick={() => router.replace("/product/new-product")}
                className="btn btn-primary font-bold normal-case w-full text-white"
              >
                Create product
              </div>
            </div>
            <div className="w-80 text-xs">
              <div className="font-bold">Terms and Condition</div>
              <div>
                1. You can only apply 1 coupon per day
                <br />
                2. It only for dine in
                <br />
                3. Buy 1 get 1 only for new user
                <br />
                4. Should make member card to apply coupon
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex pt-10 justify-center">
          <div className="flex flex-col gap-20">
            <div className="flex flex-wrap justify-center gap-10 items-center cursor-pointer">
              {categories.map((c) => {
                return (
                  <>
                    <div
                      onClick={() => getProductsByCategory(c.name)}
                      className="flex justify-center hover:border-b-2 hover:border-primary duration-100 cursor-pointer hover:scale-[1.05]"
                      key={`category-${c.id}`}
                    >
                      <div className="text-[#9F9F9F] text-xl hover:text-primary">
                        {c.name}
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            <div className="flex justify-center items-center flex-wrap px-10 gap-10">
              {product.map((item) => {
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
                    {/* <div className="font-bold text-primary">
                      {new Intl.NumberFormat("in-IN", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item?.variant[0]?.price)}
                    </div> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductCust
