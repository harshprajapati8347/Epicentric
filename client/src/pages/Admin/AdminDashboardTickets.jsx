import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllTickets from "../../components/Admin/AllTickets";

const AdminDashboardTickets = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] md:w-[330px]">
            <AdminSideBar active={6} />
          </div>
          <AllTickets />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTickets;
