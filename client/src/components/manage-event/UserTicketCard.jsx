import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import {
  refundBooking,
  refundStripePayment,
} from "../../redux/actions/bookingAction";
import { useDispatch } from "react-redux";

const UserTicketCard = ({ ticket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tickets, event, totalPrice, paidAt, createdAt, paymentId, _id } =
    ticket;
  const { address1, address2, city, state, country, zipCode } =
    event.eventLocation;

  const handleCancelBooking = () => async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        dispatch(refundStripePayment(paymentId));
        dispatch(refundBooking(_id));
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  if (!ticket) return <Loading />;
  return (
    <>
      <AccordionItem className="m-4 border bg-white border-gray-200 rounded-lg shadow">
        <AccordionButton>
          <HStack gap={"8"} className="w-full p-4">
            <Image
              className="aspect-w-16 aspect-h-9 object-cover rounded-md mx-4"
              src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                event.eventImages[0]
              }`}
              alt={event.eventName}
              height="100px"
              width="150px"
            />
            <Flex className="flex-col items-start">
              <Text className="text-gray-900 no-underline text-base leading-5 tracking-normal inline font-pn-semibold whitespace-normal font-semibold cursor-pointer">
                {event.eventName}
              </Text>
              <Text className="text-gray-400 my-1">
                {address1}
                {address2 && `, ${address2}`}
                {city && `, ${city}`}
                {state && `, ${state}`}
                {country && `, ${country}`}
                {zipCode && `, ${zipCode}`}
              </Text>
              <HStack spacing={4}>
                <Button
                  className="text-sm text-blue-700 border border-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2 py-1 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  onClick={() => navigate(`/manage/event/${event._id}`)}
                >
                  View Event Page
                </Button>
                <Button
                  className="text-sm text-red-700 border border-red-700 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-2 py-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                  onClick={handleCancelBooking()}
                >
                  Cancel Booking
                </Button>
              </HStack>
            </Flex>
          </HStack>
          <Flex className="mx-12">
            <AccordionIcon />
          </Flex>
        </AccordionButton>
        <AccordionPanel className="pb-4">
          {tickets.map((ticket, index) => (
            <Box
              key={index}
              className="border-b border-gray-200 flex items-start justify-between p-4"
            >
              <Box className="w-1/2 pr-4">
                <Text className="font-bold">{ticket.name}</Text>
                <Text className="text-gray-600">Price: ${ticket.price}</Text>
                <Text className="text-gray-600">
                  Quantity: {ticket.quantity}
                </Text>
              </Box>
              <Box className="w-1/2 pl-4">
                <Text className="font-bold">Attendee Details:</Text>
                <Text className="text-gray-600">
                  Name: {ticket.attendeeName}
                </Text>
                <Text className="text-gray-600">
                  Email: {ticket.attendeeEmail}
                </Text>
                <Text className="text-gray-600">
                  Phone: {ticket.attendeePhoneCountryCode}{" "}
                  {ticket.attendeePhone}
                </Text>
              </Box>
            </Box>
          ))}
          <Box className="flex items-center justify-between p-4">
            <Text className="font-bold">Total Price: ${totalPrice}</Text>

            <Text>Paid At: {new Date(paidAt).toDateString()}</Text>

            <Text>Booked At: {new Date(createdAt).toDateString()}</Text>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default UserTicketCard;
