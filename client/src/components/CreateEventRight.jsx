import { Box, Text } from "@chakra-ui/react";

const CreateEventRight = ({ isReoccuring }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <Box
        style={{
          position: "sticky",
          marginLeft: "10px",
          padding: "20px",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Tips
        </Text>
        <Text my={20}>
          To make your event stand out and get unique traffic on your event,
          follow the tips provided in this panel as you create your event
          step-by-step. <br />
        </Text>
        {isReoccuring && (
          <>
            <Text>
              <b>Tip: For Adding Recurring Event</b>
              <Text>
                When creating a calendar event, it&amp;s important to ensure
                that your ticketing options are set up correctly, as you
                won&amp;t be able to add or change them later on.
              </Text>
            </Text>
          </>
        )}
      </Box>
    </div>
  );
};

export default CreateEventRight;
