import { Flex } from "@chakra-ui/react";
import UserEvents from "./UserEvents";

const ManageEvents = () => {
  return (
    <>
      <Flex gap={50} padding={"0 50px 50px 0"}>
        <UserEvents />
      </Flex>
    </>
  );
};

export default ManageEvents;
