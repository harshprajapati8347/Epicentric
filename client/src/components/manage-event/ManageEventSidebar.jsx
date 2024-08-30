import { SlCalender } from "react-icons/sl";
import { MdOutlineCelebration } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user";
import { Link } from "react-router-dom";

const ManageEventSidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-64 min-h-screen flex flex-col antialiased bg-white text-gray-800 absolute">
        <div className="flex flex-col w-64 h-full border-r">
          <div className="flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="hover:bg-slate-50">
                <Link
                  to={"/manage/user-events"}
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaTasks />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="hover:bg-slate-50">
                <Link
                  to={"/manage/user-events"}
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <SlCalender />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    My Events
                  </span>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Manage Events
                  </div>
                </div>
              </li>
              <li className="hover:bg-slate-50">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <MdOutlineCelebration />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Promotions
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </a>
              </li>
              <li className="hover:bg-slate-50">
                <Link
                  to="/manage/my-tickets"
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <IoTicketOutline />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Manage Tickets
                  </span>
                </Link>
              </li>
              <li className="hover:bg-slate-50">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <AiOutlineCodeSandbox />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Coupon Codes
                  </span>
                </a>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Settings
                  </div>
                </div>
              </li>
              <li className="hover:bg-slate-50">
                <Link
                  to="/profile"
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <CgProfile />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Profile
                  </span>
                </Link>
              </li>
              <li className="hover:bg-slate-50">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FiSettings />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Settings
                  </span>
                </a>
              </li>
              <li className="hover:bg-slate-50">
                <div
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <BiLogOutCircle />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEventSidebar;
