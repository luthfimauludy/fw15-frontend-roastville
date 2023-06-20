import Footer from "@/components/footer"
import { Field, Formik } from "formik"
import Image from "next/image"
import { FiEdit2, FiUser } from "react-icons/fi"
import React from "react"
import checkCredentials from "@/helpers/checkCredentials"
import cookieConfig from "@/helpers/cookieConfig"
import { withIronSessionSsr } from "iron-session/next"
import axios from "axios"
import http from "@/helpers/http"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import moment from "moment/moment"
import Link from "next/link"
import { useRouter } from "next/router"
import Headers from "../../components/header"

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token
    checkCredentials(token, res, "/auth/login")
    const { data } = await axios.get("http://localhost:8080/profile/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      props: {
        token,
        user: data.results,
      },
    }
  },
  cookieConfig
)

const Profile = ({ token, user }) => {
  const [selectedPicture, setSelectedPicture] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [pictureURI, setPictureURI] = React.useState("")
  const [editProfileUser, setEditProfilUser] = React.useState(false)
  const router = useRouter()
  const [profile, setProfile] = React.useState(user)

  React.useEffect(() => {
    async function getDataProfile() {
      const { data } = await http(token).get("/profile/user")
      console.log(data)
      setProfile(data.results)
    }
    getDataProfile()
  }, [token])

  const doLogout = async () => {
    await axios.get("/api/logout")
    router.replace("/auth/login")
  }

  const fileToDataUrl = (file) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setPictureURI(reader.result)
    })
    reader.readAsDataURL(file)
  }

  const changePicture = (e) => {
    const file = e.target.files[0]
    setSelectedPicture(file)
    fileToDataUrl(file)
  }

  React.useEffect(() => {}, [selectedPicture])

  const editProfile = async (values) => {
    setOpenModal(true)
    const form = new FormData()
    Object.keys(values).forEach((key) => {
      if (key === "birthDate") {
        form.append(key, moment(values[key]).format("YYYY-MM-DD"))
      } else {
        form.append(key, values[key])
      }
    })
    if (selectedPicture) {
      form.append("picture", selectedPicture)
    }
    try {
      const { data } = await http(token).patch("/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setProfile(data.results)
    } catch (err) {
      console.log(err)
    }
    setEditProfilUser(false)
    setOpenModal(false)
  }
  return (
    <>
      <div className="header pb-24">
        <Headers token={token} user={user} />
      </div>
      <div className="bg-profile bg-cover bg-center font-poppins bg-primary p-10">
        <div className="flex lg:px-[5rem] py-5">
          <span className="text-white text-2xl font-bold">User Profile</span>
        </div>
        <Formik
          initialValues={{
            email: profile?.email,
            phoneNumber: profile?.phoneNumber,
            address: profile?.address,
            displayName: profile?.displayName,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            gender: profile?.gender ? "1" : "0",
            birthDate: moment(profile?.birthDate).format("YYYY-MM-DD"),
          }}
          onSubmit={editProfile}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-no-repeat bg-cover bg-slate-100 lg:mx-20 rounded-lg p-10 flex flex-col md:flex-row justify-center gap-10"
            >
              <div className="flex flex-col gap-10 items-center md:w-80">
                <div className="rounded-full overflow-hidden bg-blue-600 flex justify-center items-center w-36 h-36 md:w-32 md:h-32 lg:w-52 lg:h-52">
                  <div>
                    <div>
                      {!selectedPicture && profile?.picture && (
                        <Image
                          className="bg-cover"
                          src={profile.picture}
                          alt="picture"
                          width={250}
                          height={250}
                        />
                      )}
                    </div>
                    {!selectedPicture && !profile?.picture && (
                      <div>
                        <FiUser size={100} hidden={profile.picture} />
                      </div>
                    )}
                    {selectedPicture && (
                      <div>
                        <Image
                          className="bg-cover"
                          src={pictureURI}
                          alt="profile"
                          width={250}
                          height={250}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center m-2 gap-3">
                  <div className="text-xl font-bold">
                    {!profile?.displayName && (
                      <div className="opacity-50 text-2xl text-red-500">
                        No Set
                      </div>
                    )}
                    {profile?.displayName && (
                      <div className="text-2xl font-bold">
                        {profile.displayName}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-sm opacity-75">
                    {profile?.email}
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="w-48 md:w-32 lg:w-48 btn btn-primary border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case text-white rounded-xl">
                      <span>Chosse Photo</span>
                      <input
                        onChange={changePicture}
                        type="file"
                        className="hidden"
                        name="picture"
                        disabled={!editProfileUser}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="w-48 md:w-32 lg:w-48 btn btn-secondary border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case text-white rounded-xl">
                      <span>Remove Photo</span>
                      <input className="hidden" name="picture" />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="w-48 md:w-32 lg:w-48 btn btn-default text-black border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case rounded-xl">
                    Edit Password
                  </label>
                </div>
                <span className="max-w-[200px] text-center font-bold text-primary ">
                  Do you want to save the change?
                </span>
                <div className="flex flex-col gap-5">
                  <button
                    className="w-48 md:w-32 lg:w-48 btn btn-primary text-white border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case rounded-xl"
                    disabled={!editProfileUser}
                  >
                    Save Change
                  </button>
                  <label className="w-48 md:w-32 lg:w-48 btn btn-secondary text-black border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case rounded-xl">
                    Cancel
                  </label>
                </div>
                <div>
                  <Link href="/">
                    <button
                      onClick={doLogout}
                      className="w-48 md:w-32 lg:w-48 btn btn-error text-black border-none hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 normal-case rounded-xl"
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
              <div className="shadow-[0_0px_50px_1px_rgba(0,0,0,0.3)] rounded-lg md:w-[60%] lg:flex flex-col p-10 border-b-[12px] border-primary gap-14">
                <div className="flex-col flex gap-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4F5665] text-[25px] font-bold self-start">
                      Contacts
                    </span>
                    <div className="flex justify-center items-center bg-secondary w-10 h-10 rounded-full">
                      {!editProfileUser && (
                        <button
                          onClick={() => setEditProfilUser(true)}
                          className="flex justify-center items-center"
                        >
                          <FiEdit2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-7">
                    <div className="flex flex-col gap-9">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                          Email adress :
                        </span>
                        <div className="text-[18px] font-rubik ">
                          <div>
                            {!editProfileUser && (
                              <span className="opacity-50">
                                {profile?.email === null ? (
                                  <span className="text-red-500">Not Set</span>
                                ) : (
                                  profile?.email
                                )}
                              </span>
                            )}
                            {editProfileUser && (
                              <input
                                type="email"
                                className="input input-ghost bg-transparent w-full max-w-xs"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                style={{ outline: "none" }}
                              />
                            )}
                          </div>
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]">
                          Delivery adress :
                        </span>
                        <div>
                          {!editProfileUser && (
                            <span className="opacity-50">
                              {profile?.address === null ? (
                                <span className="text-red-500">Not Set</span>
                              ) : (
                                profile?.address
                              )}
                            </span>
                          )}
                          {editProfileUser && (
                            <input
                              type="text"
                              className="input  input-ghost bg-transparent w-full max-w-xs"
                              name="address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address}
                              style={{ outline: "none" }}
                            />
                          )}
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                          Mobile number :
                        </span>
                        <div>
                          {!editProfileUser && (
                            <span className="opacity-50">
                              {profile?.phoneNumber === null ? (
                                <span className="text-red-500">Not Set</span>
                              ) : (
                                profile?.phoneNumber
                              )}
                            </span>
                          )}
                          {editProfileUser && (
                            <input
                              type="number"
                              className="input input-ghost bg-transparent w-full max-w-xs"
                              name="phoneNumber"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phoneNumber}
                              style={{ outline: "none" }}
                            />
                          )}
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[#4F5665] text-[25px] font-bold">
                    Details
                  </span>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                          Display Name :
                        </span>
                        <div>
                          {!editProfileUser && (
                            <span className="opacity-50">
                              {profile?.displayName === null ? (
                                <span className="text-red-500">Not Set</span>
                              ) : (
                                profile?.displayName
                              )}
                            </span>
                          )}
                          {editProfileUser && (
                            <input
                              type="text"
                              className="input  input-ghost bg-transparent w-full max-w-xs"
                              name="displayName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.displayName}
                              style={{ outline: "none" }}
                            />
                          )}
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                          First name :
                        </span>
                        <div>
                          {!editProfileUser && (
                            <span className="opacity-50">
                              {profile?.firstName === null ? (
                                <span className="text-red-500">Not Set</span>
                              ) : (
                                profile?.firstName
                              )}
                            </span>
                          )}
                          {editProfileUser && (
                            <input
                              type="text"
                              className="input  input-ghost bg-transparent w-full max-w-xs"
                              name="firstName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}
                              style={{ outline: "none" }}
                            />
                          )}
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                          Last name :
                        </span>
                        <div>
                          {!editProfileUser && (
                            <span className="opacity-50">
                              {profile?.lastName === null ? (
                                <span className="text-red-500">Not Set</span>
                              ) : (
                                profile?.lastName
                              )}
                            </span>
                          )}
                          {editProfileUser && (
                            <input
                              type="text"
                              className="input  input-ghost bg-transparent w-full max-w-xs"
                              name="lastName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                              style={{ outline: "none" }}
                            />
                          )}
                        </div>
                        <hr className="border-[1px] border-black" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                        DD/MM/YY :
                      </span>
                      <div>
                        {!editProfileUser && (
                          <span className="opacity-50">
                            {profile?.birthDate === null ? (
                              <span className="text-red-500">Not Set</span>
                            ) : (
                              moment(profile?.birthDate).format("DD/MM/YYYY")
                            )}
                          </span>
                        )}
                        {editProfileUser && (
                          <input
                            type="date"
                            className="input  input-ghost bg-transparent w-full max-w-xs"
                            name="birthDate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.birthDate}
                            style={{ outline: "none" }}
                          />
                        )}
                      </div>
                      <hr className="border-[1px] border-black" />
                    </div>
                  </div>
                  <div className="flex flex-col-2 justify-evenly gap-10 p-10">
                    <div className="flex items-center gap-2">
                      <label className="flex gap-2">
                        <Field
                          name="gender"
                          value="0"
                          type="radio"
                          disabled={!editProfileUser}
                          className="radio radio-primary"
                        />
                        <span className="font-bold">Male</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex gap-2">
                        <Field
                          name="gender"
                          value="1"
                          type="radio"
                          disabled={!editProfileUser}
                          className="radio radio-primary"
                        />
                        <span className="font-bold">Female</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <input
        type="checkbox"
        id="loading"
        className="modal-toggle"
        checked={openModal}
      />
      <div className="modal">
        <div className="modal-box bg-transparent shadow-none">
          <div className="justify-center flex ">
            <AiOutlineLoading3Quarters
              className="animate-spin "
              color="white"
              size={60}
            />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Profile
