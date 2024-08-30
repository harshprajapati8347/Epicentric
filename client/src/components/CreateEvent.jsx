import "react-quill/dist/quill.snow.css";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import CreateEventRight from "./CreateEventRight";
import CreateEventHeaderGuide from "./CreateEventHeaderGuide";
import CreateEventForm from "./manage-event/CreateEventForm";
const CreateEvent = () => {
  return (
    <>
      <VStack marginInline={"120px"} marginBlock={"20px"} gap={20}>
        <CreateEventHeaderGuide />
        <Grid templateColumns="63% 35%" justifyContent={"space-between"}>
          <GridItem w="100%" h="10" bg="white">
            <CreateEventForm />
          </GridItem>
          <GridItem w="100%" h="10" bg="white">
            <CreateEventRight isReoccuring />
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
};

export default CreateEvent;
