import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import EventSocialHandles from "./EventSocialHandles";
// import MapModal from "./MapModal";
import { CalendarIcon } from "@chakra-ui/icons";
import { GrLocation } from "react-icons/gr";
import {
  // dateConversion,
  dateTimeConversion,
} from "../../utils/dateTimeConversion";
import "add-to-calendar-button";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useSelector } from "react-redux";
import { months } from "../../utils/utils";

const PostWidget = ({
  event: {
    eventName,
    startTime,
    endTime,
    eventLocation,
    // mapLocation,
    isReoccuring,
    reoccuringTimeTable,
    location,
    reoccStart,
    reoccEnd,
  },
}) => {
  const dateTimeEventData = dateTimeConversion(startTime, endTime);
  const { user } = useSelector((state) => state.user);

  const reoccuringTimeTableStartMonth =
    months[reoccuringTimeTable?.startMonth - 1];

  const reoccuringTimeTableEndMonth = months[reoccuringTimeTable?.endMonth - 1];

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-4">
        <VStack alignItems="start" paddingBottom="30px">
          <h3 className="text-xl font-semibold border-b">Date & Time</h3>
          {isReoccuring && (
            <span className="text-l font-semibold border-b">
              Recurring Event
            </span>
          )}
          <div className="flex items-center w-full">
            <div className="flex-grow">
              {startTime && endTime && (
                <HStack>
                  <CalendarIcon />
                  <p className="flex items-center justify-center text-gray-500 text-smfont-xs">
                    {startTime && endTime && dateTimeEventData}
                  </p>
                </HStack>
              )}
              {isReoccuring && (
                <HStack>
                  <CalendarIcon />
                  <p className="flex items-center justify-center text-gray-500 text-smfont-xs">
                    Event Occurs{" "}
                    {reoccuringTimeTable?.startYear ==
                    reoccuringTimeTable?.endYear ? (
                      <>On Year {reoccuringTimeTable?.startYear} </>
                    ) : (
                      <>
                        Yearly From {reoccuringTimeTable?.startYear}-
                        {reoccuringTimeTable?.endYear}
                        {", "}
                      </>
                    )}
                    {reoccuringTimeTableStartMonth ===
                    reoccuringTimeTableEndMonth ? (
                      <>Monthly On {reoccuringTimeTableStartMonth} </>
                    ) : (
                      <>
                        Monthly From {reoccuringTimeTableStartMonth}-
                        {reoccuringTimeTableEndMonth}
                        {", "}
                      </>
                    )}
                    {reoccuringTimeTable?.startDate && (
                      <>
                        On Dates {reoccuringTimeTable?.startDate}-
                        {reoccuringTimeTable?.endDate}{" "}
                      </>
                    )}
                    On Time {reoccStart} to {reoccEnd}
                  </p>
                </HStack>
              )}
              <AddToCalendarButton
                name={eventName}
                options={["Google"]}
                location={
                  eventLocation.address1 +
                  " " +
                  eventLocation.address2 +
                  " " +
                  eventLocation.city +
                  " " +
                  eventLocation.state +
                  " " +
                  eventLocation.zipCode
                }
                startDate="2023-08-26"
                endDate="2023-08-26"
                startTime="10:15"
                endTime="23:30"
                timeZone="India/Kolkata"
              />
            </div>
          </div>
        </VStack>

        <VStack alignItems="start">
          <h3 className="text-xl font-semibold border-b">Location</h3>
          <div className="flex items-center w-full">
            <div className="flex-grow">
              <VStack alignItems={"flex-start"}>
                <HStack>
                  <GrLocation size="50" />
                  {location === "online" && <Text>{location}</Text>}
                  <Text>
                    {eventLocation.address1}
                    {eventLocation.address2 && `, ${eventLocation.address2}`}
                    {eventLocation.city && `, ${eventLocation.city}`}
                    {eventLocation.zipCode && `, ${eventLocation.zipCode}`}
                    {eventLocation.state && `, ${eventLocation.state}, `}
                    <br />
                    {eventLocation.country && `${eventLocation.country}`}
                  </Text>
                </HStack>
              </VStack>
              {/* {mapLocation ? (
                <>
                  <MapModal mapLocation={mapLocation} />
                </>
              ) : (
                <>
                  <p>Map Data Not Available</p>
                </>
              )} */}
            </div>
          </div>
        </VStack>
        <EventSocialHandles />
        {/* Hosted By */}
        <VStack alignItems="start">
          <h3 className="text-xl font-semibold border-b">Hosted By</h3>
          <div className="flex items-center w-full">
            <div className="flex-grow">
              <HStack>
                <Image
                  src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                    user?.avatar
                  }`}
                  alt="Event Thumbnail"
                  height={"50px"}
                  width={"50px"}
                  objectFit="scale-down"
                  borderRadius="50%"
                />
                <Text
                  className="text-xl font-semibold text-gray-900"
                  fontSize="xl"
                >
                  {user?.firstName} {user?.lastName}
                </Text>
              </HStack>
              <VStack alignItems="start">
                <Text
                  className="text-sm font-semibold text-gray-500 pt-2"
                  fontSize="sm"
                  onClick={() => {
                    window.location.href = `mailto:${user?.email}`;
                  }}
                  cursor={"pointer"}
                >
                  {user?.email}
                </Text>
                <Text
                  className="text-sm font-semibold text-gray-500"
                  fontSize="sm"
                >
                  {user?.phone}
                </Text>
                <Text>{user?.aboutMe}</Text>
              </VStack>
            </div>
          </div>
        </VStack>
      </div>
    </>
  );
};

export default PostWidget;
