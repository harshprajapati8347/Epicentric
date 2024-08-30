import { GrAnalytics, GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineLogin, AiOutlineSetting } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/user";

const AdminSideBar = ({ active }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Home Dashboard - Active*/}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      {/* Analytics */}
      <div className="w-full flex items-center p-4">
        <Link to="#" className="w-full flex items-center">
          <GrAnalytics
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Analytics
          </h5>
        </Link>
      </div>
      {/* Horizontal Divider Line */}
      <div className="w-full h-[2px] bg-[#00000010]"></div>
      {/* All Events */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/admin-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      {/* All Users */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>
      {/* All Agents */}
      <div className="w-full flex items-center p-4">
        <Link to="#" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Agents
          </h5>
        </Link>
      </div>
      {/* Tickets */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/all-tickets" className="w-full flex items-center">
          <BsTicketPerforated
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tickets
          </h5>
        </Link>
      </div>

      {/* Event Details : Add Later */}
      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      {/* Logout */}
      <div className="w-full flex items-center p-4">
        <Link
          onClick={() => {
            dispatch(logoutUser());
          }}
          className="w-full flex items-center"
        >
          <AiOutlineLogin
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Logout
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
