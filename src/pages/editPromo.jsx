import React from 'react'
import Headers from '@/components/Headers'
import { FaCamera } from 'react-icons/fa'
import Footer from '@/components/Footer'

function EditPromo() {
  return (
    <>
      <div>
        <Headers />
      </div>
      <div className='flex justify-center items-center h-screen w-full px-10'>
        <div className='flex w-full justify-center items-center'>
          <div className='flex-auto flex-col items-center justify-center gap-7'>
            <div className='flex flex-col gap-5 justify-center items-center'>
              <div className='text-xs'>Favorite & Promo - <span className='font-bold'> Edit promo</span> </div>
              <div className='flex flex-col justify-center items-start gap-5'>
                <div className='flex flex-col justify-center items-center gap-5'>
                  <div className='bg-secondary/50 w-full h-auto flex justify-center items-center flex-col gap-4 rounded-xl'>
                    <div className='flex flex-col justify-center items-center p-6 gap-4'>
                      <div className='bg-gray-200 w-32 h-32 rounded-full flex justify-center items-center '>
                        <FaCamera size={40} />
                      </div>
                      <div className='flex flex-col items-center gap-2'>
                        <span className='text-2xl font-extrabold'>Beef Spaghetti</span>
                        <span className='text-xl font-extrabold'>20% OFF</span>
                      </div>
                      <div className='w-[200px] flex text-center justify-center'>
                        <span className='text-sm font-semibold'>Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</span>
                      </div>
                    </div>
                    <hr className='w-full border-t-black border-dashed' />
                    <div className='flex flex-col justify-center items-center gap-4 p-6'>
                      <span className='text-sm font-semibold'>COUPON CODE</span>
                      <span className='text-xl font-bold'>FNPR15RG</span>
                      <span className='text-xs'>Valid untill October 10th 2020</span>
                    </div>
                  </div>
                </div>
                <div className='flex-col flex gap-1'>
                  <span className='text-sm font-semibold'>Expire date :</span>
                  <div className="dropdown">
                    <label tabIndex={0} className="btn m-1 normal-case">Select start date</label>
                    <input type='date' tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" />
                  </div>
                  <div className="dropdown">
                    <label tabIndex={0} className="btn m-1 normal-case">Select end date</label>
                    <input type='date' tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Input coupon code :</span>
                  <div className="dropdown">
                    <label tabIndex={0} className="btn m-1 normal-case">Input stock</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>1</a></li>
                      <li><a>2</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-auto'>
            <form className='flex flex-col  w-full'>
              <div className='max-w-md flex flex-col gap-4'>
                <div className='flex flex-col text-start gap-1'>
                  <span className='text-sm font-bold'>Name :</span>
                  <input type="text" placeholder="Type promo name min. 50 characters" className="input text-xs input-bordered w-full max-w-md" style={{ outline: 'none' }} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-bold'>Normal Price :</span>
                  <input type="text" placeholder="Type the price" className="input text-xs input-bordered w-full max-w-md" style={{ outline: 'none' }} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-bold'>Description :</span>
                  <input type="text" placeholder="Describe your product min. 150 characters" className="input text-xs input-bordered w-full max-w-md" style={{ outline: 'none' }} />
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-sm font-bold'>Input product size :</span>
                    <span className='text-xs opacity-50'>Click product size you want to use for this promo</span>
                  </div>
                  <div className='flex gap-4'>
                    <div className='bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center'>
                      <span className='font-bold text-white'>R</span>
                    </div>
                    <div className='bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center'>
                      <span className='font-bold text-white'>L</span>
                    </div>
                    <div className='bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center'>
                      <span className='font-bold text-white'>XL</span>
                    </div>
                    <div className='bg-secondary/50 w-10 h-10 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center'>
                      <span>
                        250
                      </span>
                      <span>gr</span>
                    </div>
                    <div className='bg-secondary/50 w-10 h-10 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center'>
                      <span>
                        300
                      </span>
                      <span>gr</span>
                    </div>
                    <div className='bg-secondary/50 w-10 h-10 rounded-full flex justify-center items-center flex-col text-[10px] font-semibold text-center'>
                      <span>
                        500
                      </span>
                      <span>gr</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span className='font-bold text-sm'>Input delivery methods :</span>
                    <span className='text-xs opacity-50'>Click methods you want to use for this promo</span></div>
                </div>
                <div className='flex flex-col gap-14'>
                  <div className='flex gap-3 max-w-md'>
                    <div className='w-full'>
                      <label className='btn btn-secondary text-black normal-case w-full'>
                        <span className='text-white'>Home Delivery</span>
                      </label>
                    </div>
                    <div className='w-full'>
                      <label className='btn btn-secondary text-black normal-case w-full'>
                        <span className='text-white'>Dine in</span>
                      </label>
                    </div>
                    <div className='w-full'>
                      <label className='btn btn-default text-black normal-case w-full'>
                        <span className='text-black'>Take away</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <span className='text-sm font-bold'>Enter the discount :</span>
                  </div>
                  <div className='flex-col flex gap-4 max-w-md'>
                    <button className='btn btn-primary normal-case'>Save Change</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default EditPromo
