import React from "react"
import http from "@/helpers/http"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { FaCamera } from "react-icons/fa"
import { withIronSessionSsr } from "iron-session/next"
import cookieConfig from "@/helpers/cookieConfig"
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImageUploading from 'react-images-uploading';
import { GrFormClose } from "react-icons/gr";
import Compressor from 'compressorjs';
import { useDispatch } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"


export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const token = req.session.token || null

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      token,
    },
  }
}, cookieConfig)

function NewProduct({ token }) {
  const dispatch = useDispatch()

  const [size, setSize] = React.useState('')
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [picture, setPicture] = React.useState(null)
  const [camera, setCamera] = React.useState(false);
  const [alertTakePicture, setAlertTakePicture] = React.useState(false);
  const [deliveryMethod, setDeliveryMethod] = React.useState('')
  const [load, setLoad] = React.useState(false)
  const [time, setTime] = React.useState('')
  const [endHour, setEndHour] = React.useState('')
  const [selectedStock, setSelectedStock] = React.useState('');


  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Name is empty !"),
  //   price: Yup.string().required("price is empty !"),
  //   decription: Yup.string().min(150, 'Too Short!').required("Decription is empty !"),
  //   startHour: Yup.string().required(),
  //   endHour: Yup.string(),
  //   firstGr: Yup.string(),
  //   secondGr: Yup.string(),
  //   thirtGr: Yup.string(),
  // })

  const compressImage = async (file) => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
      maxSizeMB: 1,

      success(result) {
        setPicture(result)
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  async function handleTakePhoto(value) {
    const response = await fetch(value);
    const blob = await response.blob();

    const randomNumber = Math.floor(Math.random() * 1000000000);
    const fileName = randomNumber.toString().padStart(9, '0');

    const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });


    console.log(file);

    await compressImage(file);

    setTimeout(() => {
      setCamera(false);
    }, 3000);
  }

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };


  const addProduct = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('time', time)
    form.append('selectedStock', selectedStock)
    form.append('name', name)
    form.append('price', price)
    form.append('description', description)
    form.append('picture', picture)
    form.append('variant', JSON.stringify(size))
    form.append('deliveryMethod', deliveryMethod)

    const { data } = await http().post("/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return data.results
  }

  return (
    <div>
      {camera ?
        <div>
          <Camera
            onTakePhoto={(value) => { handleTakePhoto(value) }} />
          <div onClick={() => setCamera(false)} className='absolute top-5 right-20 cursor-pointer'>
            <GrFormClose className='btn btn-square w-2/4 rounded-full' />
          </div>
          {alertTakePicture ?
            <div className="absolute flex flex-col items-center top-5 left-[38%] alert alert-success shadow-lg w-1/4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Picture taken successfully</span>
              </div>
              <progress className="progress w-56"></progress>
            </div>
            : false}
        </div> :
        <>
          <div className="header">
            <Header token={token} />
          </div>
          <form onSubmit={addProduct}>
            <div className="flex justify-center items-center  w-full px-10 pb-10 pt-32">
              <div className="flex w-full justify-center items-center md:flex">
                <div className="flex-auto flex-col items-center justify-center gap-7">
                  <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="flex flex-col justify-center items-start gap-10">
                      <div className="flex flex-col justify-center items-center gap-5">
                        <div>
                          <div className="bg-gray-200 w-32 h-32 rounded-full flex justify-center items-center ">
                            <FaCamera size={40} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <label onClick={() => setCamera(true)} className="btn btn-primary text-gray-100 normal-case">
                            Take a picture
                          </label>
                          <ImageUploading
                            value={picture}
                            onChange={(value) => setPicture(value[0].file)}
                            dataURLKey="data_url"
                            acceptType={["jpg", "png"]}
                          >
                            {({
                              onImageUpload
                            }) => (
                              <div className='md:w-full mb-5'>
                                <button type='button' onClick={onImageUpload} className='btn bg-secondary text-white border-0 w-full font-bold hover:text-secondary'>Choose from gallery</button>
                              </div>
                            )}
                          </ImageUploading>
                        </div>
                      </div>
                      <div className="flex flex-col gap-16">
                        <div className="flex-col flex gap-1">
                          <span className="text-sm font-semibold">
                            Delivery Hour :
                          </span>
                          <div className="dropdown">
                            <label tabIndex={0} className="btn m-1 normal-case">
                              Select start hour
                            </label>
                            <input
                              onChange={(e) => setTime(e.target.value)}
                              name="startHour"
                              id="startHour"
                              type="time"
                              // onChange={handleChange}
                              // onBlur={handleBlur}
                              // value={values.startHour}
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                            />
                          </div>
                          <div className="dropdown">
                            <label tabIndex={0} className="btn m-1 normal-case">
                              Select end hour
                            </label>
                            <input
                              // onChange={handleChange}
                              // onBlur={handleBlur}
                              // value={values.endHour}
                              onChange={(e) => setTime(e.target.value)}
                              name="endHour"
                              id="endHour"
                              type="time"
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                            />
                          </div>
                        </div>
                        <div className="bg-base-100">
                          <select
                            value={selectedStock}
                            onChange={handleStockChange}
                            className="select select-bordered  w-full max-w-xs bg-base-100">
                            <option disabled selected className="bg-base-100">Input stock :</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-auto">
                  <div className="flex flex-col  w-full">
                    <div className="max-w-md flex flex-col gap-4">
                      <div htmlFor="name" className="flex flex-col text-start gap-1">
                        <span className="text-sm font-bold">Name :</span>
                        <input
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // value={values.name}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Type promo name min. 50 characters"
                          onChange={(e) => setName(e.target.value)}
                          className="input text-xs input-bordered w-full max-w-md"
                          style={{ outline: "none" }}
                        />
                      </div>
                      <div htmlFor="price" className="flex flex-col gap-1">
                        <span className="text-sm font-bold">Normal Price :</span>
                        <input
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // value={values.price}
                          type="text"
                          name="price"
                          id="price"
                          placeholder="Type the price"
                          onChange={(e) => setPrice(e.target.value)}
                          className="input text-xs input-bordered w-full max-w-md"
                          style={{ outline: "none" }}
                        />
                      </div>
                      <div htmlFor="description" className="flex flex-col gap-1">
                        <span className="text-sm font-bold">Description :</span>
                        <input
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // value={values.description}
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Describe your product min. 150 characters"
                          onChange={(e) => setDescription(e.target.value)}
                          className="input text-xs input-bordered w-full max-w-md"
                          style={{ outline: "none" }}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-bold">
                            Input product size :
                          </span>
                          <span className="text-xs opacity-50">
                            Click product size you want to use for this promo
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div onClick={() => setSize('R')} className={size === 'R' ? "hover:bg-primary bg-primary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center" : "hover:bg-primary bg-secondary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"}>
                            <span className="font-bold text-white">R</span>
                          </div>
                          <div onClick={() => setSize('L')} className={size === 'L' ? "hover:bg-primary bg-primary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center" : "hover:bg-primary bg-secondary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"}>
                            <span className="font-bold text-white">L</span>
                          </div>
                          <div onClick={() => setSize('XL')} className={size === 'XL' ? "hover:bg-primary bg-primary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center" : "hover:bg-primary bg-secondary cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"}>
                            <span className="font-bold text-white">XL</span>
                          </div>
                          <div
                            type="text"
                            value="250 gr"
                            name="firstGr"
                            onClick={() => setSize('250 gr')}
                            className={size === '250 gr' ? "cursor-pointer bg-gray-400 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200" : "cursor-pointer bg-gray-200 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200"}
                          >250 gr</div>
                          <div
                            type="text"
                            value="300 gr"
                            name="secondGr"
                            onClick={() => setSize('300 gr')}
                            className={size === '300 gr' ? "cursor-pointer bg-gray-400 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200" : "cursor-pointer bg-gray-200 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200"}
                          >300 gr</div>
                          <div
                            type="text"
                            value="500 gr"
                            name="thirtGr"
                            onClick={(e) => setSize('500 gr')}
                            className={size === '500 gr' ? "cursor-pointer bg-gray-400 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200" : "cursor-pointer bg-gray-200 w-11 h-11 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center active:bg-gray-300 active:scale-[.9] duration-200"}
                          >500 gr</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-bold text-sm">
                            Input delivery methods :
                          </span>
                          <span className="text-xs opacity-50">
                            Click methods you want to use for this promo
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-14">
                        <div className="flex gap-3 max-w-md">
                          <div onClick={() => setDeliveryMethod('Home Delivery')} className="w-full">
                            <label className={deliveryMethod === 'Home Delivery' ? "btn btn-primary normal-case w-full" : "btn btn-secondary normal-case w-full"}>
                              <span className="text-white">Home Delivery</span>
                            </label>
                          </div>
                          <div onClick={() => setDeliveryMethod('Dine in')} className="w-full">
                            <label className={deliveryMethod === 'Dine in' ? "btn btn-primary normal-case w-full" : "btn btn-secondary normal-case w-full"}>
                              <span className="text-white">Dine in</span>
                            </label>
                          </div>
                          <div onClick={() => setDeliveryMethod('Take away')} className="w-full">
                            <label className={deliveryMethod === 'Take away' ? "btn btn-primary normal-case w-full" : "btn btn-secondary normal-case w-full"}>
                              <span className="text-white">Take away</span>
                            </label>
                          </div>
                        </div>
                        <div className="flex-col flex gap-4 max-w-md">
                          <button type="submit" className="btn btn-primary normal-case">
                            Save Product
                          </button>
                          <button className="btn btn-default normal-case">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* )
            }}
          </Formik> */}
          <div>
            <Footer />
          </div>
        </>
      }
    </div>
  )
}

export default NewProduct
