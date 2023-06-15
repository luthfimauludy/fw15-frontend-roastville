import Image from "next/image"
import Coffee from "../../public/coffee.png"

export default function Home() {
  return (
    <>
      <div className="flex w-full justify-between items-center px-36 h-24 bg-white">
        <div className="flex justify-center items-center gap-5">
          <div>
            <Image src={Coffee} alt="coffee_image"></Image>
          </div>
          <div className="text-black tracking-wide font-extrabold">
            Coffee Shop
          </div>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-5 text-gray-600">
            <li>Home</li>
            <li>Product</li>
            <li>Your Cart</li>
            <li>History</li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div>
            <button className="text-black">Login</button>
          </div>
          <div>
            <button className="btn btn-primary normal-case text-white rounded-3xl">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[645px] bg-home bg-no-repeat bg-cover">
        <div>
          <div className="text-5xl font-bold text-white">
            Start Your Day with Coffee and Good Meals
          </div>
          <div className="text-xl font-bold text-white">
            We provide high quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </div>
          <div>
            <button className="btn btn-primary text-white rounded-lg">
              Get Started
            </button>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </>
  )
}
