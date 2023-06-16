import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
// import ReactModal from "react-modal";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

const EditProfile = () => {

  return (
    <div className="font-poppins bg-primary">
      {/* <Navbar /> */}
      <div className="flex px-[5rem] h-[9rem] items-end py-5">
        <span className="text-white text-2xl font-bold">User Profile</span>
      </div>
      <div className="bg-profile_bg bg-no-repeat bg-cover bg-slate-100 mx-20 rounded-lg p-10">
        <div className="flex">
          <div className="flex flex-col gap-10 px-20 items-center">
            <div className="rounded-full overflow-hidden bg-blue-600 flex justify-center items-center w-52 h-52">
              <Image src='/coffee.png' width={200} height={200} alt="" className="rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-center m-2">
              <p className="text-xl font-bold">name</p>
              <p>email</p>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-primary h-16 rounded-3xl"
              >
                Save
              </button>
              <button
                className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-secondary h-16 rounded-3xl"
              >
                Cancel
              </button>
            </div>
            <div>
              <button className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-info h-16 rounded-3xl">
                Edit Password
              </button>
            </div>
            <span className="max-w-[200px] text-center">
              Do you want to save the change?
            </span>
            <div className="flex flex-col gap-5">
              <button
                className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-primary h-16 rounded-3xl"
              >
                Save Change
              </button>
              <button
                className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-secondary h-16 rounded-3xl"
              >
                Cancel
              </button>
            </div>
            <div>
              <button className="w-48 hover:bg-gray-400 active:bg-slate-600 active:scale-[.9] duration-300 bg-info h-16 rounded-3xl">
                Logout
              </button>
            </div>
          </div>
          <div className="shadow-[0_0px_50px_1px_rgba(0,0,0,0.3)] rounded-lg w-[60%] lg:flex flex-col p-10 border-b-[12px] border-primary gap-14">
            <span className="text-[#4F5665] text-[25px] font-bold self-start">
              Contacts
            </span>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Email adress :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    email
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]">
                    Delivery adress :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    address
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Mobile number :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    phone
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
            </div>
            <span className="text-[#4F5665] text-[25px] font-bold">
              Details
            </span>
            <div className="grid grid-cols-2 gap-10">
              <div >
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Display Name :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    Name
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    First name :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    name
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                    Last name :
                  </span>
                  <span className="text-[18px] font-rubik ">
                    name
                  </span>
                  <hr className="border-[1px] border-black" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px] ">
                  Mobile number :
                </span>
                <span className="text-[18px] font-rubik ">
                  phone
                </span>
                <hr className="border-[1px] border-black" />
              </div>
            </div>
            <div className="flex flex-col-2 justify-center gap-10 p-10">
              <div className="flex items-center gap-2">
                <input type="radio" className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]" />
                <label htmlFor="">Male</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="radio" className="text-[#9F9F9F] text-[18px] font-[500] leading-[30px]" />
                <label htmlFor="">Female</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default EditProfile;
