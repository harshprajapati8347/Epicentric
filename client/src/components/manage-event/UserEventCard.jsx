import {
  Box,
  Image,
  Text,
  HStack,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";
// import { BsTicketPerforated } from "react-icons/bs";
// import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../redux/actions/eventAction";
import { useDispatch } from "react-redux";

const UserEventCard = ({ event }) => {
  const {
    _id,
    eventName,
    eventLocation,
    // ticketPrice,
    // interested,
    eventImages,
  } = event;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { address1, address2, city, state, country, zipCode } = eventLocation;
  const menuItems = [
    {
      name: "View Event",
      onClick: () => navigate(`/manage/event/${event._id}`),
    },
    {
      name: "Edit Event",
      onClick: () => navigate(`/manage/edit-event/${event._id}`),
    },
    // {
    //   name: "Duplicate",
      // onClick: () => navigate(`/manage/event/duplicate/${event._id}`),
    // },
    {
      name: "Delete Event",
      onClick: () => {
        dispatch(deleteEvent(_id));
        navigate("/manage/user-events");
        window.location.reload();
      },
    },
  ];
  return (
    <Flex
      width={"1000px"}
      height={"150px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      key={_id}
      border="3px solid rgba(0,0,0,0.1)"
      bg={"white"}
      _hover={{
        border: "3px solid rgba(0,0,0,0.2)",
      }}
      mx={"75"}
    >
      <Flex alignItems={"center"}>
        <Image
          aspectRatio={16 / 9}
          objectFit="cover"
          src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
            eventImages[0]
          }`}
          alt={eventName}
          height={"100%"}
          width={"200px"}
          mx={20}
        />
        <Box className="mt-2 p-2">
          <Text
            onClick={() => {
              navigate(`/manage/event/${event._id}`);
              window.location.reload();
            }}
            className="text-gray-900 no-underline text-base py-5 leading-5 tracking-normal m-0 inline font-pn-semibold whitespace-normal font-semibold cursor-pointer"
          >
            {eventName}
          </Text>
          <Text className="text-gray-400 my-1">
            {address1}
            {address2 && `, ${address2}`}
            {city && `, ${city}`}
            {state && `, ${state}`}
            {country && `, ${country}`}
            {zipCode && `, ${zipCode}`}
          </Text>

          <HStack className="flex items-center justify-start my-1">
            {/* <Text className="flex items-center justify-center"> */}
              {/* <BsTicketPerforated className="mx-2" /> */}
              {/* INR ₹ {ticketPrice && ticketPrice === 0 ? "Free" : ticketPrice} */}
              {/* add eventPrice field in backend then fetch here */}
            {/* </Text> */}
            {/* Vertical Line */}
            {/* <Box
              className="h-5 w-0.5 bg-gray-300"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            ></Box> */}
            {/* <HStack className="flex items-center justify-center">
              <AiFillStar className="mx-2" />
              {interested?.length ? interested?.length : 0}
              <Text>Interested</Text>
            </HStack> */}
          </HStack>
        </Box>
      </Flex>
      <Box className="flex items-center justify-center mr-10">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border shadow"
          onClick={() => navigate(`/manage/event/${event._id}`) && window.location.reload()}
        >
          Dashboard
        </button>
        <Menu>
          <MenuButton className="py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border  shadow">
            <IoMdArrowDropdown />
          </MenuButton>
          <MenuList className="bg-white text-gray-800 border shadow">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={item.onClick}
                className="hover:bg-gray-100 py-2 px-4 border-b	"
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default UserEventCard;
