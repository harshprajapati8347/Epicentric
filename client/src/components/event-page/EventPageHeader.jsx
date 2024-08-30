import { Image, HStack, Box, Heading, Text, Button } from "@chakra-ui/react";
import { BsTicketPerforated } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useState } from "react";
import { dateTimeConversion } from "../../utils/dateTimeConversion";
import TicketModal from "../TicketModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShareButtonModal from "../ShareButtonModal";

const EventPageHeader = ({ event }) => {
  const {
    eventName,
    eventImages,
    startTime,
    endTime,
    isReoccuring,
    reoccuringTimeTable,
    customTicketTypes,
  } = event;
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dateTimeEventData = dateTimeConversion(startTime, endTime);

  // Share Modal
  const [isShareOpen, setIsShareOpen] = useState(false);

  const closeShareModal = () => {
    setIsShareOpen(false);
  };

  const openShareModal = () => {
    setIsShareOpen(true);
  };

  // Ticket Modal
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };
  return (
    <>
      <Box
        className="flex items-center mt-6 justify-between shadow-lg"
        width={"85%"}
        gap={20}
        bg="white"
        borderRadius="0.5rem"
      >
        <HStack>
          <div className="p-4">
            <Image
              borderRadius={10}
              height={100}
              width={177.77}
              objectFit={"scale-down"}
              src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                eventImages[0]
              }`}
              alt="event image"
            />
          </div>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
          >
            <Heading noOfLines={1} size="lg" fontSize="25px" fontWeight={600}>
              {eventName}
            </Heading>
            <HStack marginBottom={10}>
              {!isReoccuring && <Text>{dateTimeEventData}</Text>}
              {isReoccuring && (
                <Text>
                  Event Occurs{" "}
                  {reoccuringTimeTable?.startYear && (
                    <>
                      Yearly From {reoccuringTimeTable?.startYear}-
                      {reoccuringTimeTable?.endYear}
                      {", "}
                    </>
                  )}
                  {reoccuringTimeTable?.startMonth && (
                    <>
                      Monthly From {reoccuringTimeTable?.startMonth}-
                      {reoccuringTimeTable?.endMonth}
                      {", "}
                    </>
                  )}
                  {reoccuringTimeTable?.startDate && (
                    <>
                      On Dates {reoccuringTimeTable?.startDate}-
                      {reoccuringTimeTable?.endDate}
                    </>
                  )}
                </Text>
              )}
            </HStack>
          </Box>
        </HStack>

        <HStack marginRight="5%">
          <Button
            className="flex items-center justify-evenly gap-2 lg:w-32 bg-yellow-500 text-white text-lg py-2 px-4 rounded-lg"
            onClick={openModal}
          >
            <BsTicketPerforated /> Tickets
          </Button>
          <Button
            className="flex items-center justify-evenly gap-2 lg:w-32 bg-gray-500 text-white text-lg py-2 px-4 rounded-lg"
            onClick={openShareModal}
          >
            <AiOutlineShareAlt /> Share
          </Button>
        </HStack>
        <TicketModal
          isOpen={isOpen}
          closeModal={closeModal}
          customTicketTypes={customTicketTypes}
          event={event}
        />
        <ShareButtonModal isOpen={isShareOpen} closeModal={closeShareModal} />
      </Box>
    </>
  );
};

export default EventPageHeader;
