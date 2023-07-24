import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import default_picture from "/public/default.jpg"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import http from "@/helpers/http"
import { Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { FiTrash2 } from "react-icons/fi"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
  addSelectedQty,
  addVoucher,
  clearProduct,
  variantDetail,
} from "@/redux/reducers/product"
import { PURGE } from "redux-persist"
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

function DetailProduct({ token }) {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.product.data)
  const [editProduct, setEditProduct] = useState(false)
  const [product, setProduct] = useState([])
  const [productId, setProductId] = useState([])
  const [roleId, setRoleId] = useState("")
  const [initialQuantity, setInitialQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState(false)
  const selectSize = useRef()
  const selectDelivery = useRef()

  function increment() {
    if (initialQuantity === productDetails?.variant?.quantity) {
      setInitialQuantity(productDetails?.variant?.quantity)
    } else {
      setInitialQuantity(initialQuantity + 1)
      dispatch(addSelectedQty(initialQuantity + 1))
    }
  }

  const doCheckout = () => {
    if (selectSize.current.selectedIndex === 0) {
      setSelectedSize(true)
    } else if (selectDelivery.current.selectedIndex === 0) {
      setSelectedDelivery(true)
    } else {
      router.replace("/payment")
    }
  }

  function decrement() {
    if (initialQuantity <= 1) {
      setInitialQuantity(1)
    } else {
      setInitialQuantity(initialQuantity - 1)
      dispatch(addSelectedQty(initialQuantity - 1))
    }
  }

  useEffect(() => {
    async function getRoleId() {
      try {
        const { data } = await http(token).get("/users")
        setRoleId(data.results)
      } catch (err) {
        console.log(err)
      }
    }

    getRoleId()
  }, [token, roleId])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function getProductId() {
      try {
        const { data } = await http().get(`/products/${productDetails.id}`)
        setProductId(data.results.variant)
      } catch (err) {
        console.log(err)
      }
    }

    if (!productDetails) {
      router.replace("/product")
    }

    getProductId()
  }, [router, productDetails])

  const editProductAdmin = async (values) => {
    const form = new FormData()
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        form.append(key, values[key])
      }
    })
    try {
      const data = await http(token).patch(`/products/manage/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setProduct(data.result)
    } catch (err) {
      console.log(err)
    }
    setEditProduct(false)
  }

  useEffect(() => {
    const handleChangeRouter = () => {
      dispatch({
        type: PURGE,
        key: "product",
        result: () => null,
      })
      dispatch(clearProduct)
    }
    router.events.on("routeChangeStart", handleChangeRouter)
  })

  return (
    <div className="h-min-screen">
      <Header token={token} />
      <div className="h-full">
        <div className="flex px-5 md:px-24 py-10 flex-col md:flex-row h-full">
          <div className="flex md:w-[50%] pb-10">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex font-bold items-center md:text-[20px] ">
                Favourite & Promo <IoIosArrowForward size={30} />
                <div>{id}</div>
              </div>
              <div className="md:h-[700px] relative flex justify-center items-center">
                {productDetails.picture === null ? (
                  <Image
                    src={default_picture}
                    alt="img-product.png"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <Image
                    alt="img-product.png"
                    width="400"
                    height="400"
                    src={productDetails.picture}
                    className="object-cover"
                  />
                )}
                <button className="absolute top-10 right-10 bg-secondary h-14 w-14 rounded-full flex justify-center items-center">
                  <FiTrash2 size={30} color="white" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-1">
            <Formik
              initialValues={{
                name: productDetails?.name,
                description: productDetails?.description,
              }}
              onSubmit={doCheckout}
              enableReinitialize
            >
              {({ handleSubmit, handleChange, handleBlur, values }) => (
                <form onSubmit={handleSubmit} className="flex flex-1">
                  <div className="flex flex-col gap-4 px-10 w-full">
                    {!editProduct && (
                      <div className="font-black text-2xl md:tex-4xl lg:text-6xl">
                        {productDetails.name}
                      </div>
                    )}
                    {editProduct && (
                      <input
                        type="text"
                        className="input input-ghost bg-transparent w-full max-w-xs"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    )}
                    <div className="text-2xl md:text-[40px] py-2">
                      {!productDetails?.variant?.price
                        ? ""
                        : productDetails?.variant?.price}
                    </div>
                    <div className="text-2xl md:text-[20px] font-semi-bold py-4">
                      {productDetails.description}
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="w-full h-24 pt-8">
                        <select
                          ref={selectSize}
                          onChange={(e) => {
                            setInitialQuantity(1)
                            dispatch(variantDetail(JSON.parse(e.target.value)))
                            dispatch(addSelectedQty(1))
                            setSelectedSize(false)
                          }}
                          className={
                            !selectedSize
                              ? "select select-primary w-full h-full text-lg md:text-[18px]"
                              : "select select-error border-4 w-full h-full text-lg md:text-[18px]"
                          }
                        >
                          <option value="" disabled selected>
                            Select Size
                          </option>
                          {productId.map((variant, index) => {
                            return (
                              <option
                                key={index}
                                value={JSON.stringify(variant)}
                              >
                                {variant.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="w-full pt-0 h-16">
                        <select
                          ref={selectDelivery}
                          onChange={() => setSelectedDelivery(false)}
                          className={
                            !selectedDelivery
                              ? "select select-primary w-full h-full text-lg md:text-[18px]"
                              : "select select-error border-4 w-full h-full text-lg md:text-[18px]"
                          }
                        >
                          <option disabled selected>
                            Select Delivery Methods
                          </option>
                          <option value="Dine In">Dine In</option>
                          <option value="Door Delivery">Door Delivery</option>
                          <option value="Pick Up">Pick Up</option>
                        </select>
                      </div>
                      <div className="flex gap-4 w-full h-16">
                        <div className="h-full rounded-xl flex justify-between items-center w-[40%] border bordered-2 px-4">
                          <button
                            type="button"
                            onClick={decrement}
                            className="p-2 text-[20px] "
                          >
                            -
                          </button>
                          <div className="p-2">
                            {productDetails?.variant?.quantity === 0
                              ? "0"
                              : initialQuantity}
                          </div>
                          <button
                            type="button"
                            onClick={increment}
                            className="p-2 text-[20px]"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex flex-1 h-full ">
                          <button
                            type="button"
                            className="btn btn-secondary w-full h-full text-white normal-case text-xl"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      {roleId === 1 && (
                        <div className="flex flex-col gap-2">
                          <div className="w-full h-16">
                            <button
                              type="submit"
                              className="btn btn-primary w-full h-full"
                            >
                              Save Change
                            </button>
                          </div>
                          <div className="w-full h-16">
                            <button
                              type="button"
                              className="btn btn-primary w-full h-full"
                              onClick={() => setEditProduct(true)}
                            >
                              Edit Product
                            </button>
                          </div>
                        </div>
                      )}
                      {roleId === 2 && (
                        <div>
                          {productDetails?.variant?.quantity === 0 ? (
                            <p className="text-xl font-bold text-center text-red-500">
                              {productDetails?.variant?.name +
                                " is Out of Stock, please select another!"}
                            </p>
                          ) : (
                            <button
                              type="submit"
                              className="btn text-white normal-case btn-primary w-full"
                            >
                              Checkout
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <Footer />
        <input type="checkbox" id="deleteProduct" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alert!</h3>
            <p className="py-4">Are you sure want to delete this product</p>
            <div className="modal-action">
              <label
                htmlFor="deleteProduct"
                className="btn btn-error normal-case text-white cursor-pointer"
              >
                Yes!
              </label>
              <label
                htmlFor="deleteProduct"
                className="btn btn-success normal-case text-white cursor-pointer"
              >
                No!
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
