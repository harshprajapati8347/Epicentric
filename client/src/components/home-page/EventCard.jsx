import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsTicketPerforated } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TruncatedText from "../../utils/TruncatedText";
import { getDateValue, getMonthValue } from "../../utils/dateTimeConversion";
import { SlCalender } from "react-icons/sl";
import { months } from "../../utils/utils";
import { useEffect, useState } from "react";

const EventCard = ({ event }) => {
  const {
    _id,
    eventName,
    eventLocation,
    ticketPrice,
    interested,
    eventImages,
    isReoccuring,
    startTime,
    reoccuringTimeTable,
    customTicketTypes,
  } = event;
  const navigate = useNavigate();
  const { address1, city, state, country, zipCode } = eventLocation;
  const [lowestTicketPrice, setLowestTicketPrice] = useState(0);

  const reoccuringTimeTableStartMonth =
    months[reoccuringTimeTable?.startMonth - 1];
  const reoccuringTimeTableEndMonth = months[reoccuringTimeTable?.endMonth - 1];

  const month = getMonthValue(startTime);
  const date = getDateValue(startTime);

  // // Find Lowest Ticket Price from customTicketTypes - Create a async function and perform this operation

  useEffect(() => {
    const ticketPrices = customTicketTypes?.map((ticket) => ticket.price);
    const lowestTicketPrice = Math.min(...ticketPrices);
    setLowestTicketPrice(lowestTicketPrice);
  }, [customTicketTypes]);

  return (
    <>
      <Card
        key={_id}
        border="2px solid rgba(0,0,0,0.1)"
        overflow="hidden"
        variant="outline"
        height={"auto"}
        maxWidth={"400px"}
      >
        <CardBody>
          {eventImages?.length > 1 ? (
            <Image
              aspectRatio={16 / 9}
              objectFit={"cover"}
              src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                eventImages[0]
              }`}
              alt={eventName}
              max-width={"100%"}
            />
          ) : (
            <Image
              aspectRatio={16 / 9}
              objectFit={"cover"}
              src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                eventImages[0]
              }`}
              max-width={"100%"}
              alt={eventName}
            />
          )}
          <Grid templateColumns="22% 78%" height="140px">
            <GridItem
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <SlCalender size={22} className="my-2" />
              <Heading className="text-sm font-bold text-gray-700">
                {isReoccuring &&
                  reoccuringTimeTableStartMonth ===
                    reoccuringTimeTableEndMonth &&
                  reoccuringTimeTableStartMonth}
                {isReoccuring &&
                  reoccuringTimeTableStartMonth !==
                    reoccuringTimeTableEndMonth &&
                  reoccuringTimeTableStartMonth +
                    " to " +
                    reoccuringTimeTableEndMonth}

                {!isReoccuring && month}
              </Heading>
              <Text className="text-sm text-gray-700">
                {!isReoccuring && date}
                {isReoccuring &&
                  reoccuringTimeTable?.startDate +
                    " to " +
                    reoccuringTimeTable?.endDate}
              </Text>
            </GridItem>
            <GridItem
              display={"flex"}
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <Text
                onClick={() => navigate(`/manage/event/${event._id}`)}
                className="text-gray-900 text-sm font-semibold cursor-pointer"
              >
                {eventName}
              </Text>
              <Text className="text-gray-400 text-sm">
                <TruncatedText
                  text={`${address1} ${city && `, ${city}`} ${
                    state && `, ${state}`
                  } ${country && `, ${country}`} ${zipCode && `, ${zipCode}`}`}
                  limit="35"
                />
              </Text>

              <HStack className="my-1">
                {/* <Text className="flex text-sm items-center justify-center">
                  <BsTicketPerforated className="mx-2" />
                  INR ₹{" "}
                  {ticketPrice && ticketPrice === 0 ? "Free" : ticketPrice}
                  add eventPrice field in backend then fetch here
                </Text> */}
                {/* Ticket Starting from {customTicketTypes map and find lowest price}  */}
                <Text className="flex text-sm items-center justify-center">
                  <BsTicketPerforated className="mx-2" />
                  Tickets Starting from INR ₹ {lowestTicketPrice}
                </Text>
                {/* Vertical Line */}
                {/* <Box className="h-5 w-0.5 bg-gray-300"></Box> */}
                {/* <HStack className="flex text-sm items-center justify-center">
                  <AiFillStar className="mx-1" />
                  {interested?.length ? interested?.length : 0}
                  <Text>Interested</Text>
                </HStack> */}
              </HStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default EventCard;
