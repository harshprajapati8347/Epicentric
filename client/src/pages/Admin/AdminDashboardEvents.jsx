import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllEvents from "../../components/Admin/AllEvents";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] md:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
