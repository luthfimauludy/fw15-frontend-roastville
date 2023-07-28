import Image from "next/image"
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi"
import { BiUser } from "react-icons/bi"
import { MdLocationPin } from "react-icons/md"
import { AiFillStar, AiOutlineHeart } from "react-icons/ai"
import Checkbox from "../../public/checkbox.png"
import TeamWork from "../../public/team-work.png"
import Hazelnut from "../../public/hazelnutcoffee.png"
import PinkyPromise from "../../public/pinkypromise.png"
import ChickenWings from "../../public/chicken-wings.png"
import Maps from "../../public/maps.png"
import Amazon from "../../public/amazon.png"
import Spotify from "../../public/spotify.png"
import Reddit from "../../public/reddit.png"
import Netflix from "../../public/netflix.png"
import Discord from "../../public/discord.png"
import ProfilePhoto from "../../public/profilephoto.png"
import Header from "@/components/header"
import Footer from "@/components/footer"
import cookieConfig from "@/helpers/cookieConfig"
import { withIronSessionSsr } from "iron-session/next"
import { useRouter } from "next/router"
import { Formik } from "formik"
import { useDispatch } from "react-redux"
import { setMessage } from "@/redux/reducers/message"
import { useRef } from "react"

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Home({ token }) {
  const listCarousel = useRef()
  const router = useRouter()
  const dispatch = useDispatch()

  const scrollLeft = () => {
    listCarousel.current.scrollLeft += 580
  }

  const scrollRight = () => {
    listCarousel.current.scrollLeft -= 580
  }

  const handleSearch = (values) => {
    router.push("/search")
    dispatch(setMessage(values.search))
  }

  return (
    <>
      <Header token={token} />
      <div className="w-full h-[900px] md:h-[645px] bg-home bg-no-repeat bg-cover px-10 z-0">
        <div className="flex flex-wrap w-full justify-between md:px-36">
          <div className="flex flex-col max-w-lg pt-28 gap-10">
            <div className="text-5xl font-bold text-white ">
              Start Your Day with Coffee and Good Meals
            </div>
            <div className="text-xl font-bold text-white">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </div>
            <div className="max-w-lg">
              <button className="btn btn-primary text-white rounded-lg normal-case w-full max-w-xs">
                Get Started
              </button>
            </div>
          </div>
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
        </div>
        <div className="flex flex-col md:flex-row justify-around items-center w-full h-[400px] md:h-[200px] bg-white mt-24 rounded-2xl shadow-2xl">
          <div className="relative">
            <div className="flex gap-5 items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary"></div>
              <div>
                <div className="font-black">90+</div>
                <div>Staff</div>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <BiUser size={25} color="white" />
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-5 items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary"></div>
              <div>
                <div className="font-black">30+</div>
                <div>Stores</div>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <MdLocationPin size={25} color="white" />
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-5 items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary"></div>
              <div>
                <div className="font-black">800+</div>
                <div>Customers</div>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <AiOutlineHeart size={25} color="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center xl:h-[550px] md:mt-28 xl:mt-0 pt-72 md:pt-36 gap-10 md:gap-0 flex-wrap">
        <div>
          <Image alt="" src={TeamWork}></Image>
        </div>
        <div className="flex flex-col gap-5 max-w-lg px-10 md:px-0">
          <div className="text-4xl">
            We Provide Good Coffee and Healthy Meals
          </div>
          <div>
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <Image alt="" src={Checkbox} />
              </div>
              <div>High quality beans</div>
            </div>
            <div className="flex gap-2">
              <div>
                <Image alt="" src={Checkbox} />
              </div>
              <div>Healthy meals, you can request the ingredients</div>
            </div>
            <div className="flex gap-2">
              <div>
                <Image alt="" src={Checkbox} />
              </div>
              <div>
                Chat with our staff to get better experience for ordering
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <Image alt="" src={Checkbox} />
              </div>
              <div>
                Free member card with a minimum purchase of IDR 200.000.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-10 items-center m:h-[900px]">
        <div className="flex flex-col justify-between gap-10 items-center px-10 py-10 md:pt-32">
          <div className="text-4xl font-bold text-center">
            Here is People&apos;s Favorite
          </div>
          <div>
            Let&apos;s choose and have a bit taste of poeple&apos;s favorite. It
            might be yours too!
          </div>
        </div>
        <div>
          <div className="carousel carousel-center max-w-[300px] md:max-w-3xl xl:max-w-7xl p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
              <div className="flex flex-col gap-10 justify-center items-center w-[240px] h-[560px] md:h-[660px] cursor-pointer duration-500 hover:scale-[1.05] border-2 rounded-xl">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                  <Image alt="" src={ChickenWings}></Image>
                </div>
                <div className="font-bold">Hazelnut Latte</div>
                <div className="flex flex-col gap-2">
                  <div>Hazelnut Syrup</div>
                  <div>Wanilla Whipped Cream</div>
                  <div>Ice / Hot</div>
                  <div>Sliced Banana on Top</div>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <div className="font-bold text-3xl">IDR 25.000</div>
                  <div>
                    <button className="btn rounded-full">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col gap-10 justify-center items-center w-[240px] h-[560px] md:h-[660px] cursor-pointer duration-500 hover:scale-[1.05] border-2 rounded-xl">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                  <Image alt="" src={Hazelnut}></Image>
                </div>
                <div className="font-bold">Hazelnut Latte</div>
                <div className="flex flex-col gap-2">
                  <div>Hazelnut Syrup</div>
                  <div>Wanilla Whipped Cream</div>
                  <div>Ice / Hot</div>
                  <div>Sliced Banana on Top</div>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <div className="font-bold text-3xl">IDR 25.000</div>
                  <div>
                    <button className="btn rounded-full">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col gap-10 justify-center items-center w-[240px] h-[560px] md:h-[660px] cursor-pointer duration-500 hover:scale-[1.05] border-2 rounded-xl">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                  <Image alt="" src={PinkyPromise}></Image>
                </div>
                <div className="font-bold">Hazelnut Latte</div>
                <div className="flex flex-col gap-2">
                  <div>Hazelnut Syrup</div>
                  <div>Wanilla Whipped Cream</div>
                  <div>Ice / Hot</div>
                  <div>Sliced Banana on Top</div>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <div className="font-bold text-3xl">IDR 25.000</div>
                  <div>
                    <button className="btn rounded-full">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center md:h-[850px]">
        <div className="flex flex-col gap-14 justify-center items-center">
          <div className="max-w-md flex flex-col gap-5 text-center justify-center items-center">
            <div className="text-4xl font-bold">
              Visit Our Store in the Spot on the Map Below
            </div>
            <div>
              See our store in every city on the spot and spen your good day
              there. See you soon!
            </div>
          </div>
          <div>
            <Image alt="" src={Maps}></Image>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-10 md:px-20">
        <div className="text-4xl font-bold">Our Partner</div>
        <div className="flex w-full justify-between items-center">
          <div>
            <Image src={Netflix} alt="partner" />
          </div>
          <div>
            <Image src={Reddit} alt="partner" />
          </div>
          <div>
            <Image src={Spotify} alt="partner" />
          </div>
          <div>
            <Image src={Amazon} alt="partner" />
          </div>
          <div>
            <Image src={Discord} alt="partner" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-14 w-full justify-center items-center px-10">
        <div className="text-3xl font-bold">
          Loved by Thousands of Happy Customer
        </div>
        <div>
          These are the stories of our customers who have visited us with great
          pleasure.
        </div>
        <div className="flex max-w-3xl gap-10 overflow-scroll items-center">
          <div
            ref={listCarousel}
            className="carousel carousel-center max-w-[300px] md:max-w-7xl p-4 space-x-4 bg-neutral rounded-box"
          >
            <div className="carousel-item">
              <div className="flex flex-col p-6 max-w-[200px] md:max-w-[400px] justify-around items-center rounded-lg border-2">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-5">
                    <div>
                      <Image src={ProfilePhoto} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Viezeh Robert</div>
                      <div>Warsaw, Poland</div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div>4.5</div>
                    <div>
                      <AiFillStar color="F2BE22" />
                    </div>
                  </div>
                </div>
                <div>
                  “Wow... I am very happy to spend my whole day here. the Wi-fi
                  is good, and the coffee and meals tho. I like it here!! Very
                  recommended!
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col p-6 max-w-[200px] md:max-w-[400px] justify-around items-center rounded-lg border-2">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-5">
                    <div>
                      <Image src={ProfilePhoto} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Yessica Christy</div>
                      <div>Yessica Christy</div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div>4.5</div>
                    <div>
                      <AiFillStar color="F2BE22" />
                    </div>
                  </div>
                </div>
                <div>
                  “I like it because I like to travel far and still can make my
                  day better just by drinking their Hazelnut Latte
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col p-6 max-w-[200px] md:max-w-[400px] justify-around items-center rounded-lg border-2">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-5">
                    <div>
                      <Image src={ProfilePhoto} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Kim Young Jou</div>
                      <div>Seoul, South Korea</div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div>4.5</div>
                    <div>
                      <AiFillStar color="F2BE22" />
                    </div>
                  </div>
                </div>
                <div>
                  “This is very unusual for my taste, I haven&apos;t liked
                  coffee before but their coffee is the best! and yup, you have
                  to order the chicken wings, the best in town!
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col p-6 max-w-[200px] md:max-w-[400px] justify-around items-center rounded-lg border-2">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-5">
                    <div>
                      <Image src={ProfilePhoto} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Viezeh Robert</div>
                      <div>Warsaw, Poland</div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div>4.5</div>
                    <div>
                      <AiFillStar color="F2BE22" />
                    </div>
                  </div>
                </div>
                <div>
                  “Wow... I am very happy to spend my whole day here. the Wi-fi
                  is good, and the coffee and meals tho. I like it here!! Very
                  recommended!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px]">
          <div className="flex justify-end gap-5">
            <div
              className="rounded-full border-2 p-2 border-gray-300 cursor-pointer"
              onClick={scrollRight}
            >
              <FiArrowLeft size={30} />
            </div>
            <div
              className="rounded-full border-2 p-2 border-gray-300 bg-primary cursor-pointer"
              onClick={scrollLeft}
            >
              <FiArrowRight size={30} color="white" />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full flex flex-col justify-around bg-gray-200 mt-36">
        <div className="w-full md:px-20 mt-[-110px] px-10">
          <div className="flex justify-around items-center w-full h-[200px] bg-white rounded-2xl border-2 px-10">
            <div>
              <div>
                <div className="font-bold text-xl">Check our promo today</div>
              </div>
              <div>
                <div>Let&apos;s see the deals and pick yours!</div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary text-white normal-case">
                See Promo
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </footer>
    </>
  )
}
