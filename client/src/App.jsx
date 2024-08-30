import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./pages/Navbar";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/event-page/EventPage";
import EventsHome from "./components/home-page/EventsHome";
import ActivationPage from "./pages/ActivationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useLayoutEffect } from "react";
import ManageEventSidebar from "./components/manage-event/ManageEventSidebar";
import UserEvents from "./components/manage-event/UserEvents";
import EditEventForm from "./components/manage-event/EditEventForm";
import {
  AdminDashboardEvents,
  AdminDashboardPage,
  AdminDashboardUsers,
  // AdminDashboardUsers,
  // AdminDashboardSellers,
  // AdminDashboardOrders,
  // AdminDashboardProducts,
  // AdminDashboardEvents,
  // AdminDashboardWithdraw,
} from "./routes/AdminRoutes";
import { getAllevents } from "./redux/actions/eventAction";
import AdminDashboardTickets from "./pages/Admin/AdminDashboardTickets.jsx";
import UserTickets from "./components/manage-event/UserTickets.jsx";

const App = () => {
  useLayoutEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllevents());
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventsHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation" element={<ActivationPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/user-events"
          element={
            <ProtectedRoute>
              <UserEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/my-tickets"
          element={
            <ProtectedRoute>
              <UserTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/edit-event/:id"
          element={
            <>
              <ProtectedRoute>
                <div className="flex">
                  <ManageEventSidebar />
                  <EditEventForm />
                </div>
              </ProtectedRoute>
            </>
          }
        />
        <Route path="/manage/event/:id" element={<EventPage />} />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/all-tickets"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardTickets />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
