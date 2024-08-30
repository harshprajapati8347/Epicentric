import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import {
  blockUserFromCreatingEvent,
  getAllUsers,
} from "../../redux/actions/user";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Input } from "@mui/material";
import { HStack, VStack } from "@chakra-ui/react";
import UserUpdateModal from "./UserUpdateModal";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState({});

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/delete-user/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.9 },

    {
      field: "firstName",
      headerName: "First Name",
      type: "text",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "text",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.5,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "blockUserFromCreatingEvent",
      headerName: "Block User From Creating Event",
      type: "text",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              dispatch(blockUserFromCreatingEvent(params.id));
            }}
          >
            {params.value ? "Blocked" : "Not Blocked"}
          </Button>
        );
      },
    },
    {
      field: "Edit or Delete User",
      flex: 0.5,
      minWidth: 150,
      headerName: "Edit or Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                if (
                  users.length > 0 &&
                  users.find((user) => user._id === params.id)
                ) {
                  setEditUser(users.find((user) => user._id === params.id));
                  openModal();
                } else {
                  toast.error("User not found");
                }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setOpen(true);
                setUserId(params.id);
              }}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  let row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item?._id,
        firstName: item?.firstName,
        lastName: item?.lastName,
        email: item?.email,
        role: item?.role,
        joinedAt: item?.createdAt.slice(0, 10),
        blockUserFromCreatingEvent: item?.blockUserFromCreatingEvent,
      });
    });

  if (searchEvent) {
    row = row.filter((item) =>
      item.firstName.toLowerCase().includes(searchEvent.toLowerCase())
    );
  }

  editUser && console.log("editUser", editUser);
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <VStack>
          <HStack
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            padding={"4"}
          >
            <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
            <Input
              type="text"
              placeholder="Search by User Name"
              className="w-[90%] h-[40px] px-3 border border-gray-300 rounded"
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
            />
          </HStack>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              key={users?._id}
              rows={row}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              loading={users?.isLoading}
            />
          </div>
          {open && (
            <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
              <div className="w-[95%] md:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                  Are you sure you wanna delete this user?
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

          <UserUpdateModal
            isOpen={isOpen}
            closeModal={closeModal}
            editUser={editUser}
            setEditUser={setEditUser}
          />
        </VStack>
      </div>
    </div>
  );
};

export default AllUsers;
