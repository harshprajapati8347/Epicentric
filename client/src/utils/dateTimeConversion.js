import { toast } from "react-toastify";

export const dateTimeConversion = (startTime, endTime) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const startEvent = new Date(startTime).toLocaleString("en-IN", options);
  const endEvent = new Date(endTime).toLocaleString("en-IN", options);

  const startEventDate =
    startEvent.split(",")[0] + "," + startEvent.split(",")[1];
  const endEventDate = endEvent.split(",")[0] + "," + endEvent.split(",")[1];

  if (startEventDate === endEventDate) {
    return `${startEvent.split(",")[0]}, ${startEvent.split(",")[1]}, ${
      startEvent.split(",")[2]
    }, ${startEvent.split(",")[3]} to ${endEvent.split(",")[3]}`;
  }

  return `${startEvent} to ${endEvent}`;
};

// Get Month Value only from startTime

export const getMonthValue = (startTime) => {
  const options = {
    month: "short",
  };

  const startEvent = new Date(startTime).toLocaleString("en-IN", options);

  return startEvent;
};

// Get Date Value only from startTime

export const getDateValue = (startTime) => {
  const options = {
    day: "numeric",
  };

  const startEvent = new Date(startTime).toLocaleString("en-IN", options);

  return startEvent;
};

export const handleShareLink = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success("Link Copied to Clipboard");
};
