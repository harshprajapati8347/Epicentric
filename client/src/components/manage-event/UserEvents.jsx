import { useDispatch, useSelector } from "react-redux";
import { getUserEvents } from "../../redux/actions/eventAction";
import { useEffect } from "react";
import ManageEventSidebar from "./ManageEventSidebar";
import { Button, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import UserEventCard from "./UserEventCard";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const UserEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { userEvents, isLoading } = useSelector((state) => state.events);
  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(getUserEvents(user._id));
    };
    fetchEvents();
  }, [dispatch, user._id]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <ManageEventSidebar />
        <VStack>
          <HStack paddingBlock={"20px"}>
            {/* <Button
              display={{ base: "block", md: "none" }}
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
              >
              <RxHamburgerMenu />
            </Button> */}
            <h1 className="text-2xl font-semibold">
              EVENTS YOU&apos;RE MANAGING
            </h1>
            <Button
              onClick={() => navigate("/manage/create-event")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Event
            </Button>
          </HStack>

          <Grid templateColumns="repeat(1, 1fr)" gap={20} width={"50vw"}>
            {isLoading && <Loading />}
            {userEvents?.map((event, key) => (
              <GridItem key={key} margin={"auto"}>
                <UserEventCard key={key} event={event} />
              </GridItem>
            ))}
            {!isLoading && userEvents?.length === 0 && (
              <GridItem margin={"auto"}>
                <VStack
                  width={"1000px"}
                  height={"100px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  border="1px solid rgba(0,0,0,0.1)"
                  bg={"white"}
                  _hover={{
                    border: "3px solid rgba(0,0,0,0.2)",
                  }}
                  mx={"75"}
                >
                  <h1 className="text-2xl font-semibold">
                    You have not created any events yet
                  </h1>
                </VStack>
              </GridItem>
            )}
          </Grid>
        </VStack>
      </>
    );
  }
};

export default UserEvents;
