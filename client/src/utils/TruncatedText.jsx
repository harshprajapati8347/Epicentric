import { Text } from "@chakra-ui/react";

export const TruncatedText = ({ text, limit }) => {
  const truncatedText =
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
      {truncatedText}
    </Text>
  );
};

export const generateAvatarFromInitials = async (fname, lname) => {
  const initials = fname.charAt(0) + lname.charAt(0);
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const context = canvas.getContext("2d");
  context.fillStyle = "#f3f4f6";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "40px Arial";
  context.textAlign = "center";
  context.fillStyle = "#000000";
  context.fillText(initials, 50, 60);
  const url = canvas.toDataURL("image/png");
  return fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new File(
          [blob],
          Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png",
          { type: "image/png" }
        )
    );
};

export default TruncatedText;
