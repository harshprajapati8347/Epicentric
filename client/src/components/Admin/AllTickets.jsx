import { Button, Input } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteBooking,
  getBookings,
} from "../../redux/actions/bookingAction";
import Loading from "../Loading";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { DeleteIcon } from "@chakra-ui/icons";

const AllTickets = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ticketSelected, setTicketSelected] = useState("");
  const booking = useSelector((state) => state.booking);
  const [searchEvent, setSearchEvent] = useState("");

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  // Admin Delete Ticket
  const handleDelete = async (id) => {
    dispatch(adminDeleteBooking(id));
  };

  const columns = [
    // First Column - Number of the row from 1 to n
    {
      field: "id",
      headerName: "Ticket Id",
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
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketPrice",
      headerName: "Ticket Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketQuantity",
      headerName: "Ticket Quantity",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketSold",
      headerName: "Ticket Sold",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketLeft",
      headerName: "Ticket Left",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketType",
      headerName: "Ticket Type",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "ticketStatus",
      headerName: "Ticket Status",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 100,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(true);
                setTicketSelected(params.id);
              }}
              className="text-white bg-gray-500 hover:bg-red-600 w-content h-[30px] px-2 py-1 rounded-md"
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const allTickets = booking?.tickets;

  let gridData = allTickets?.map((ticket) => {
    return {
      id: ticket._id,
      eventName: ticket.event?.eventName || "N/A", // Add a default value or handle undefined
      startTime: ticket.event?.startTime
        ? ticket.event?.startTime
        : ticket.event?.reoccStart,
      endTime: ticket.event?.endTime
        ? ticket.event?.endTime
        : ticket.event?.reoccEnd,
      ticketPrice: ticket.totalPrice,
      ticketQuantity: ticket.tickets.length,
      ticketSold: ticket.tickets.length,
      ticketLeft: ticket.event?.eventCapacity - ticket.tickets.length || 0, // Add a default value or handle undefined
      ticketType: ticket.event?.ticketType || "N/A", // Add a default value or handle undefined
      ticketStatus: "Paid",
    };
  });

  if (searchEvent) {
    const filteredData = gridData.filter((ticket) =>
      ticket.eventName.toLowerCase().includes(searchEvent.toLowerCase())
    );
    gridData = filteredData;
  }

  return (
    <div className="w-full flex justify-center pt-5">
      {booking?.isLoading ? (
        <Loading />
      ) : (
        <div className="w-[97%]">
          <div className="w-full flex items-center justify-between m-2">
            <h3 className="text-[22px] font-Poppins pb-2">All Tickets</h3>
            <Input
              type="text"
              placeholder="Search by Event Name"
              className="w-[90%] h-[40px] px-3 border border-gray-300 rounded"
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
            />
          </div>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              key={allTickets?._id}
              rows={gridData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              loading={booking?.isLoading}
            />
            {open && (
              <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                <div className="w-[95%] md:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                  <div className="w-full flex justify-end cursor-pointer">
                    <RxCross1 size={25} onClick={() => setOpen(false)} />
                  </div>
                  <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                    Are you sure you want to delete this ticket?
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
                      onClick={() =>
                        handleDelete(ticketSelected) && setOpen(false)
                      }
                    >
                      confirm
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
