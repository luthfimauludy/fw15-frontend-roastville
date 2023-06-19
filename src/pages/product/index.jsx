import React from "react"
import Image from "next/image"
import image from "/public/img-coupon.png"
import image2 from "/public/img-coupon2.png"
import image3 from "/public/img-coupon3.png"
import img1 from "/public/img-product.png"
import img2 from "/public/img-product2.png"
import img3 from "/public/img-product3.png"
import img4 from "/public/img-product4.png"
import img5 from "/public/img-product5.png"
import img6 from "/public/img-product6.png"
import Header from "@/components/header"
import Footer from "@/components/footer"
import http from "@/helpers/http"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { productDetail } from "@/redux/reducers/product"

function ProductCust() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [product, setProduct] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const getProduct = React.useCallback(async () => {
    const { data } = await http().get('/products')
    setProduct(data.results)

  }, [setProduct])

  React.useEffect(() => {
    getProduct()
  }, [getProduct])

  // console.log(product[0].variant[0].price)

  const dispatchEvent = (item) => {
      const encodedProductName = encodeURIComponent(item.name);
      const url = `/product/${encodedProductName}`;
    dispatch(productDetail(item));
    router.replace(url)
  }

  return (
    <div className="h-min-screen">
      <div className="pb-24 header">
        <Header />
      </div>
      <div className="flex">
        <div className="w-[425px] border-r-2 px-20 py-7">
          <div className="flex flex-col text-center mb-16">
            <div className="text-primary font-bold text-2xl">Promo Today</div>
            <div className="text-sm text-center">
              Coupons will be updated every weeks.
              <br />
              Check them out!{" "}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-12">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex gap-2 w-80 h-28 border rounded-xl items-center px-3 bg-[#88B788]">
                <div className="w-[25%]">
                  <Image src={image} alt="img-coupon.png" />
                </div>
                <div className="w-[75%]">
                  <div className="font-bold">HAPPY MOTHER&apos;S DAY!</div>
                  <div>Get one of our favorite menu for free!</div>
                </div>
              </div>
              <div className="flex gap-2 w-80 h-28 border rounded-xl items-center px-3 bg-[#F5C361]">
                <div className="w-[25%]">
                  <Image src={image2} alt="img-coupon2.png" />
                </div>
                <div className="w-[75%]">
                  <div className="font-bold">
                    Get a cup of coffee for free on sunday morning Only
                  </div>
                  <div>Only at 7 to 9 AM</div>
                </div>
              </div>
              <div className="flex gap-2 w-80 h-28 border rounded-xl items-center px-3 bg-[#88B788]">
                <div className="w-[25%]">
                  <Image src={image} alt="img-coupon.png" />
                </div>
                <div className="w-[75%]">
                  <div className="font-bold">HAPPY MOTHER&apos;S DAY!</div>
                  <div>Get one of our favorite menu for free!</div>
                </div>
              </div>
              <div className="flex gap-2 w-80 h-28 border rounded-xl items-center p-2 bg-[#C59378]">
                <div className="w-[25%]">
                  <Image src={image3} alt="img-coupon3.png" />
                </div>
                <div className="w-[75%]">
                  <div className="font-bold">HAPPY HALLOWEEN!</div>
                  <div>
                    Do you like chicken wings? Get 1 free only if you buy pinky
                    promise
                  </div>
                </div>
              </div>
            </div>
            <div className="w-80">
              <button
                type="submit"
                className="btn btn-primary font-bold normal-case w-full"
              >
                Apply Coupon
              </button>
            </div>
            <div className="w-80 text-xs mt-20">
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
        <div className="flex flex-col gap-20">
          <div className="flex justify-center items-center py-7 gap-11 px-28 cursos-pointer">
            <div className="flex text-[#9F9F9F] text-xl justify-center w-48 hover:border-b-2 hover:border-primary duration-100 cursor-pointer hover:shadow-lg hover:scale-[1.05] hover:text-primary">
              Favorite & Promo
            </div>
            <div className="flex justify-center hover:border-b-2 hover:border-primary duration-100 cursor-pointer hover:scale-[1.05]">
              <div className="text-[#9F9F9F] text-xl hover:text-primary">
                Coffee
              </div>
            </div>
            <div className="flex justify-center hover:border-b-2 hover:border-primary duration-100 cursor-pointer hover:scale-[1.05]">
              <div className="text-[#9F9F9F] text-xl hover:text-primary">
                Non Coffee
              </div>
            </div>
            <div className="flex justify-center border-b-2 border-b-transparent hover:border-b-2 hover:border-primary duration-100 cursor-pointer ">
              <div className="text-[#9F9F9F] text-xl hover:text-primary hover:scale-[1.05]">
                Foods
              </div>
            </div>
            <div className="flex justify-center hover:border-b-2 hover:border-primary duration-100 cursor-pointer hover:scale-[1.05]">
              <div className="text-[#9F9F9F] text-xl hover:text-primary">
                Add-on
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 px-28">
            {product.map(item =>
              <div onClick={() => dispatchEvent(item)} key={`product-${item.id}`} className="flex flex-col justify-between items-center w-40 h-56 border border-none rounded-xl shadow-xl p-3 mb-7 cursor-pointer hover:scale-[1.05] active:scale-[.9] duration-300">
                <div className="flex flex-col">
                  <div className="w-32 h-32 shadow-lg border rounded-full overflow-hidden object-cover flex items-center mt-[-50px]">
                    <Image
                      className="w-full h-full "
                      src={img1}
                      alt="img-product.png"
                    />
                  </div>
                  <div className="text-center font-black text-xl text-accent px-5">
                    {item.name}
                  </div>
                </div>
                <div className="font-bold text-primary">{item.variant[0].price}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductCust
