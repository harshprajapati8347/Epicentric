import { SimpleGrid, VStack } from "@chakra-ui/react";
import EventWidget from "./EventWidget";
import EventLeft from "./EventLeft";
import EventHeader from "./EventPageHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { geteventById } from "../../redux/actions/eventAction";
import Loading from "../Loading";

const EventPage = () => {
  const events = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(geteventById(id));
    };
    fetchEvents();
  }, [dispatch, id]);

  const isLoading = events.isLoading || !events.event;

  return (
    <VStack gap={"20px"}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {events?.event ? (
            <>
              <EventHeader event={events.event} />
              <SimpleGrid
                templateColumns="68% 30%"
                width={"85%"}
                justifyContent={"space-between"}
              >
                <EventLeft event={events.event} />
                <EventWidget event={events.event} />
              </SimpleGrid>
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </VStack>
  );
};

export default EventPage;
