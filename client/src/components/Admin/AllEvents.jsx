import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getAllevents } from "../../redux/actions/eventAction";
import styles from "../../styles/styles";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const events = useSelector((state) => state.events);
  const [searchEvent, setSearchEvent] = useState("");

  useEffect(() => {
    dispatch(getAllevents());
  }, [dispatch]);

  // Admin Delete Event
  const handleDelete = async (id) => {
    await axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/events/admin-delete-event/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllevents());
  };

  const columns = [
    {
      field: "id",
      headerName: "Event Id",
      minWidth: 180,
      flex: 0.9,
    },
    {
      field: "eventName",
      headerName: "Event Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "endTime",
      headerName: "End Time",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "eventCapacity",
      headerName: "Event Capacity",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "evenLocation",
      headerName: "Location",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "ticketType",
      headerName: "Ticket Type",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "ticketPrice",
      headerName: "Ticket Price",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      flex: 0.5,
      minWidth: 150,
      headerName: "Edit Event",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => navigate(`/manage/edit-event/${params.id}`)}>
            <AiOutlineEdit size={20} />
          </Button>
        );
      },
    },
    {
      field: " ",
      flex: 0.5,
      minWidth: 100,
      headerName: "Delete Event",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  function getCapacityFromTickets(tickets) {
    let capacity = 0;
    tickets?.map((ticket) => {
      const parsedTicket = JSON.parse(ticket);
      capacity += parsedTicket.ticketCapacity;
    });
    return Math.max(capacity, 0);
  }

  let row = [];
  events?.allEvents &&
    events?.allEvents?.forEach((item) => {
      row.push({
        id: item._id,
        eventName: item.eventName,
        startTime: item.startTime ? item.startTime : item.reoccStart,
        endTime: item.endTime ? item.endTime : item.reoccEnd,
        eventCapacity: getCapacityFromTickets(item.customTicketTypes),
        evenLocation:
          item.eventLocation.address1 +
          ", " +
          item.eventLocation.city +
          ", " +
          item.eventLocation.state +
          ", " +
          item.eventLocation.country +
          ", " +
          item.eventLocation.zipCode,
        ticketType: item.ticketType,
        ticketPrice: item.ticketPrice,
      });
    });

  if (searchEvent) {
    row = row.filter((event) =>
      event.eventName.toLowerCase().includes(searchEvent.toLowerCase())
    );
  }

  // const checkOptions = () => (
  //   <>
  //     {openOptions && (
  //       <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center px-4">
  //         <div className="flex items-center">
  //           <div
  //             onClick={() => deleteEvent(selected._id)}
  //             className="flex items-center mr-6 p-2 bg-slate-200 rounded-lg hover:bg-red-200 cursor-pointer"
  //           >
  //             <AiOutlineDelete color="#555" size={30} />
  //             <h5 className="text-sm ml-1">Delete</h5>
  //           </div>
  //         </div>
  //         <div className="flex items-center mr-6 p-2 bg-slate-200 rounded-lg hover:bg-blue-200 cursor-pointer">
  //           <AiOutlineEdit color="#555" size={30} />
  //           <h5 className="text-sm ml-1">Edit</h5>
  //         </div>
  //         <div className="flex items-center mr-6 p-2 bg-slate-200 rounded-lg hover:bg-green-200 cursor-pointer">
  //           <MdOutlineViewInAr color="#555" size={30} />
  //           <h5 className="text-sm ml-1">View-Admin</h5>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <div className="w-full flex justify-center pt-5">
      {events?.isLoading ? (
        <Loading />
      ) : (
        <div className="w-[97%]">
          <VStack>
            <HStack
              display={"flex"}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              padding={"4"}
            >
              <h3 className="text-[22px] font-Poppins pb-2">All Events</h3>
              <Input
                type="text"
                placeholder="Search by Event Name"
                className="w-[90%] h-[40px] px-3 border border-gray-300 rounded"
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
              />
            </HStack>
            <div className="w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                key={events?.allEvents?._id}
                rows={row}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
                loading={events?.isLoading}
              />
              {open && (
                <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                  <div className="w-[95%] md:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                    <div className="w-full flex justify-end cursor-pointer">
                      <RxCross1 size={25} onClick={() => setOpen(false)} />
                    </div>
                    <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                      Are you sure you wanna delete this event?
                    </h3>
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                        onClick={() => setOpen(false)}
                      >
                        cancel
                      </div>
                      <div
                        className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                        onClick={() => setOpen(false) || handleDelete(userId)}
                      >
                        confirm
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </VStack>
        </div>
      )}
    </div>
  );
};

export default AllEvents;
