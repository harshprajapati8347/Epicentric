import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link
          to="/admin/dashboard"
          className="flex gap-2 items-center justify-between bg-slate-200 p-2 rounded"
        >
          <GrUserAdmin color="#555" size={30} className="cursor-pointer" />
          Admin Dashboard
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/profile" className="md:block hidden">
            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                    user?.avatar
                  }`}
                  className="w-[35px] h-[35px] rounded-full"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
              </Link>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
