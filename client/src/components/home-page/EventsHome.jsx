import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import EventCard from "./EventCard";
import Loading from "../Loading";
// import MapModal from "../event-page/MapModal";
import { useSelector } from "react-redux";

const EventsHome = () => {
  const events = useSelector((state) => state.events);

  return (
    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
      <div className="mt-6">
        {events?.allEvents?.length === 0 ? (
          <Heading
            className="text-center text-lg font-bold"
            noOfLines={1}
            size="lg"
          >
            No Events Found, Please Create One 🙂
          </Heading>
        ) : (
          <Heading
            className="text-center text-lg font-bold"
            noOfLines={1}
            size="lg"
          >
            Events Specially Curated For You
          </Heading>
        )}
      </div>
      {/* {events.isGoogleMapModalOpen && <MapModal />} */}
      {events.isLoading ? (
        <Loading />
      ) : (
        <SimpleGrid
          minChildWidth="350px"
          spacing="40px"
          padding={"20px 80px 80px 80px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {events?.allEvents?.map((event, key) => (
            <Box key={key} overflow="hidden" maxHeight="500px">
              <EventCard event={event} />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default EventsHome;
