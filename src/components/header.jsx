import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import logo from "public/logo_roastville.png"
import { FiDelete, FiSearch } from "react-icons/fi"
import { BsChatLeftText } from "react-icons/bs"
import default_picture from "/public/default.jpg"
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import { useRouter } from "next/router"
import axios from "axios"
import cookieConfig from "@/helpers/cookieConfig"
import { withIronSessionSsr } from "iron-session/next"
import { useDispatch, useSelector } from "react-redux"
import { setProfile } from "@/redux/reducers/profile"
import http from "@/helpers/http"

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  console.log(token)
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Headers({ token }) {
  const dispatch = useDispatch()
  const [userRole, setUser] = useState({})
  const [search, setSearch] = useState(false)
  const [modal, setCheckModal] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const user = useSelector((state) => state.profile.data)
  const getData = React.useCallback(async () => {
    const { data } = await http(token).get("/profile")
    dispatch(setProfile(data.results))
  }, [token, dispatch])

  React.useEffect(() => {
    if (token) {
      getData()
    }
  }, [getData, token])

  React.useEffect(() => {
    async function getUser() {
      try {
        const { data } = await http(token).get("/users")
        setUser(data.results)
      } catch (error) {
        const message = error?.response?.data?.message
        if (message) {
        }
      }
    }
    if (token) {
      getUser()
    }
  }, [token])

  const router = useRouter()
  const doLogout = async () => {
    await axios.get("/api/logout")
    router.replace("/auth/login")
  }
  const handleShow = () => {
    setSearch(true)
  }
  const handleHide = () => {
    setSearch(false)
  }

  const clearInput = () => {
    setInputValue("")
  }

  const handleCheckboxChange = () => {
    setCheckModal(!modal)
  }

  function checkModal() {
    setCheckModal(!modal)
  }

  return (
    <>
      <div className="w-full z-10 border-b-2 relative">
        <div className="flex w-full items-center justify-between md:px-20 bg-white">
          <Link href="/" className="flex justify-center items-center gap-2">
            <div className="h-20 w-20">
              <Image src={logo} alt="coffee_image"></Image>
            </div>
            <div className="text-black tracking-wide font-extrabold">
              Roastville
            </div>
          </Link>
          <div className="font-semibold justify-center items-center gap-7 text-gray-600 hidden md:flex">
            <span className="hover:text-secondary">
              <Link href="/">Home</Link>
            </span>
            <span className="hover:text-secondary">
              <Link href="/product">Product</Link>
            </span>
            {userRole === 2 && (
              <>
                <span className="hover:text-secondary">
                  <Link href="/">Your Cart</Link>
                </span>
                <span className="hover:text-secondary">
                  <Link href="/product/history-cust">History</Link>
                </span>
              </>
            )}
            {userRole === 1 && (
              <>
                <span className="hover:text-secondary">
                  <Link href="/manage-order">Orders</Link>
                </span>
                <span className="hover:text-secondary">
                  <Link href="/dashboard">Dashboard</Link>
                </span>
              </>
            )}
          </div>
          <div className="justify-center items-center gap-10 hidden md:flex">
            {token ? (
              <div className="flex justify-center items-center gap-8">
                {search && (
                  <form className="relative">
                    <input
                      type="text"
                      className="input input-bordered bordered-primary w-full px-4"
                      name="search"
                      placeholder="search here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                      type="reset"
                      onClick={() => clearInput()}
                      className="absolute top-2 right-12 "
                    >
                      <FiDelete size={25} />
                    </button>{" "}
                    <div className="absolute top-2 right-4 ">
                      <button
                        onClick={() => handleHide()}
                        className="text-accent font-bold "
                      >
                        <RxCross2 size={25} />
                      </button>
                    </div>
                  </form>
                )}
                {!search && (
                  <div>
                    <button
                      onClick={() => handleShow()}
                      className="text-accent font-bold"
                    >
                      <FiSearch size={25} />
                    </button>
                  </div>
                )}
                <Link href="/chat" className="cursor-pointer">
                  <BsChatLeftText size={25} />
                </Link>
                <div className="dropdown dropdown-bottom dropdown-end ">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-white outline-none border-0 hover:bg-white "
                  >
                    <div className="rounded-full overflow-hidden h-12 w-12 border-4 border-secondary">
                      {user.picture === null ? (
                        <Image
                          src={default_picture}
                          className="w-full h-full"
                          alt="picture_logo"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <Image
                          src={user?.picture}
                          className="object-cover h-full w-full"
                          alt="picture_logo"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="border-2 dropdown-content menu p-2 shadow  bg-base-100 rounded-box w-[200px] px-2s flex flex-col items-center justify-between "
                  >
                    <li>
                      <Link href="/profile" className="">
                        <div className="flex gap-4  items-center justify-center">
                          <div>
                            <AiOutlineUser size={30} />
                          </div>
                          <div className="font-bold text-medium hover:text-accent ">
                            My Profile
                          </div>
                        </div>
                      </Link>
                    </li>
                    <div className="border-b-2 w-full hover:bg-white"></div>
                    <li className="font-bold text-primary">
                      <div className="hover:bg-white flex gap2 ">
                        <AiOutlineLogout size={25} color="red" />
                        <div>
                          <button
                            onClick={checkModal}
                            className="font-bold text-[#FF0000]"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <input
                    type="checkbox"
                    id="my_modal_6"
                    className="modal-toggle"
                    onChange={handleCheckboxChange}
                    checked={modal}
                  />
                  <div className="modal bg-red-100  ">
                    <div className=" modal-box bg-gray-300 p-12">
                      <h3 className="font-bold text-lg text-center">
                        Attention !
                      </h3>
                      <p className="py-4 text-center">
                        Are you sure to Logout?
                      </p>
                      <div className="modal-action justify-center">
                        <button
                          onClick={doLogout}
                          className="btn btn-primary hover:bg-success bg-gray-300 border-2 text-black normal-case w-20 h-8"
                        >
                          Yes
                        </button>
                        <button
                          onClick={checkModal}
                          className="btn btn-secondary hover:bg-error  bg-gray-300 border-2 text-black normal-case w-20"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-5">
                <Link href="/auth/login">
                  <div>
                    <button className="btn btn-ghost font-bold normal-case rounded-3xl">
                      Login
                    </button>
                  </div>
                </Link>
                <div className="max-w-lg">
                  <Link href="/auth/register">
                    <button className="btn btn-primary normal-case text-md text-white rounded-3xl w-full max-w-lg">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
