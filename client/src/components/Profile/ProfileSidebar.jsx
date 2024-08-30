import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
// import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import // MdOutlineAdminPanelSettings,
// MdOutlineTrackChanges,
"react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/user";
// import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {/* TODO: Profile */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 1 ? "text-[red]" : ""} md:block hidden`}
        >
          Profile
        </span>
      </div>

      {/* TODO: Inbox - Chat With System */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/profile")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 4 ? "text-[red]" : ""} md:block hidden`}
        >
          Inbox
        </span>
      </div>

      {/* TODO: Change Password */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 6 ? "text-[red]" : ""} md:block hidden`}
        >
          Change Password
        </span>
      </div>

      {/* TODO: Update User Address */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 7 ? "text-[red]" : ""} md:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } md:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 8 ? "text-[red]" : ""} md:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
