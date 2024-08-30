import { Image, Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateEventHeaderGuide = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Box
        className="flex bg-white  shadow-lg rounded-lg p-4"
        bg="blue.500"
        width={"100%"}
        gap={20}
      >
        <div className="p-4">
          <Image
            borderRadius={10}
            height={100}
            width={100}
            src="https://cdn-az.allevents.in/banners/33cc4910-d5f5-11e8-bf5b-a32565f21459-rimg-w400-h225-dcaad0f1-gmir.jpg"
            alt="event image"
          />
        </div>
        {user?.blockUserFromCreatingEvent ? (
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
            >
              <Heading noOfLines={1} size="lg" fontSize="25px" fontWeight={600}>
                You are not allowed to create events!
              </Heading>
              <Text marginBottom={10}>
                You have been restricted from creating events. Please contact
                the support team for more information.
              </Text>
              <Link to="#">Contact Support Team</Link>
            </Box>
          </>
        ) : (
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
            >
              <Heading noOfLines={1} size="lg" fontSize="25px" fontWeight={600}>
                Here&apos;s a video to help you out!
              </Heading>
              <Text marginBottom={10}>
                Check out this product tour video and learn how you can make the
                most out of AllEvents.in and it&apos;s features!
              </Text>
              <Link to="https://www.youtube.com/">Watch Now</Link>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CreateEventHeaderGuide;
