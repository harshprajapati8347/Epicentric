import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CloseButton, HStack, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateUserByAdmin } from "../../redux/actions/user";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserUpdateModal = ({ isOpen, closeModal, editUser, setEditUser }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const handleEditUser = async (e) => {
    e.preventDefault();
    setEditUser(editUser);
    dispatch(updateUserByAdmin(editUser));
    closeModal();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    async function uploadAvatar() {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/update-avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    uploadAvatar();
  };

  return (
    <div>
      <Transition appear={true} show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex flex-1 items-center justify-center p-4 text-center sm:items-center sm:justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all sm:max-w-xl lg:max-w-3xl">
                  <VStack>
                    <HStack
                      spacing="24px"
                      justifyContent="space-between"
                      alignItems="center"
                      className="w-full"
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium p-5 w-full"
                      >
                        Edit User
                      </Dialog.Title>
                      <CloseButton onClick={closeModal} className="px-6" />
                    </HStack>
                    <div className="border-b border-gray-200 w-full"></div>
                    <VStack className="w-full">
                      <form onSubmit={handleEditUser} className="w-full p-4">
                        {/* Avatar */}
                        <div className="relative flex items-center justify-center">
                          <img
                            src={`${
                              import.meta.env.VITE_REACT_APP_SERVER_ROOT
                            }/${editUser?.avatar}`}
                            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                            alt=""
                          />
                          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px]">
                            <input
                              type="file"
                              id="image"
                              className="hidden"
                              onChange={handleImage}
                            />
                            <label htmlFor="image">
                              <AiOutlineCamera />
                            </label>
                          </div>
                        </div>
                        {/* FirstName */}
                        <div className="mt-4">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="firstName"
                              autoComplete="firstName"
                              required
                              value={editUser.firstName}
                              onChange={(e) =>
                                setEditUser({
                                  ...editUser,
                                  firstName: e.target.value,
                                })
                              }
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        {/* LastName */}
                        <div className="mt-4">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="lastName"
                              autoComplete="lastName"
                              required
                              value={editUser.lastName}
                              onChange={(e) =>
                                setEditUser({
                                  ...editUser,
                                  lastName: e.target.value,
                                })
                              }
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="mt-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              autoComplete="email"
                              required
                              value={editUser.email}
                              onChange={(e) =>
                                setEditUser({
                                  ...editUser,
                                  email: e.target.value,
                                })
                              }
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        {/* Role */}
                        <div className="mt-4">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Role
                          </label>
                          <div className="mt-1">
                            <select
                              name="role"
                              required
                              value={editUser.role}
                              onChange={(e) =>
                                setEditUser({
                                  ...editUser,
                                  role: e.target.value,
                                })
                              }
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Update User
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </VStack>
                  </VStack>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserUpdateModal;
