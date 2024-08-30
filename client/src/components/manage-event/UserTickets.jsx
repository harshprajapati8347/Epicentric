import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserBookings } from "../../redux/actions/bookingAction";
import Loading from "../Loading";
import { Accordion, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import ManageEventSidebar from "./ManageEventSidebar";
import UserTicketCard from "./UserTicketCard";

const UserTickets = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getAllUserBookings());
  }, [dispatch]);

  console.log("User Tickets", tickets);
  if (isLoading) {
    <Loading />;
  } else {
    return (
      <>
        <ManageEventSidebar />
        <VStack className="p-6 mx-6">
          <HStack paddingBlock={"10px"}>
            <h1 className="text-2xl font-semibold">Your Tickets</h1>
          </HStack>
          <Grid templateColumns="repeat(1, 1fr)" width={"50vw"}>
            <Accordion allowMultiple className="h-32">
              {tickets &&
                tickets?.map((ticket) => (
                  <GridItem key={ticket._id} margin={"auto"}>
                    <UserTicketCard key={ticket._id} ticket={ticket} />
                  </GridItem>
                ))}
            </Accordion>

            {!isLoading && tickets?.length === 0 && (
              <GridItem margin={"auto"}>
                <h1 className="text-xl font-semibold">No Tickets Found</h1>
              </GridItem>
            )}
          </Grid>
        </VStack>
      </>
    );
  }
};

export default UserTickets;
