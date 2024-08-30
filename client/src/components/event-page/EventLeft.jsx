import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "../../App.css";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/actions/user";
import { dateTimeConversion } from "../../utils/dateTimeConversion";

const EventLeft = ({
  event: {
    startTime,
    endTime,
    eventName,
    eventImages,
    eventDescription,
    eventVideo,
    createdBy,
  },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(getUserById(createdBy));
    };
    fetchUserDetails();
  }, [createdBy, dispatch]);
  const dateTimeEventData = dateTimeConversion(startTime, endTime);

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="relative overflow-hidden shadow-md mb-6">
          <Image
            src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
              eventImages[0]
            }`}
            alt="Event Thumbnail"
            height={"450px"}
            width={"100%"}
            objectFit="scale-down"
          />
        </div>

        <h1 className="transition duration-700 text-start mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
          <Link href="/manage/event/id1">{eventName}</Link>
        </h1>
        <div className="block lg:flex text-center items-center justify-start w-full text-lg text-gray-700 font-normal px-4 mb-8">
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">{dateTimeEventData}</span>
          </div>
        </div>
        <p className="text-start text-lg text-gray-700 font-normal mb-8">
          <ReactQuill
            value={eventDescription}
            readOnly={true}
            theme="bubble"
            modules={{
              toolbar: false,
            }}
          />
        </p>
        <div className="text-start text-lg text-gray-700 font-normal px-4 mb-8">
          <span className="text-gray-800 text-lg font-semibold pt-8">
            Tickets
          </span>
          <p>
            <span>{`Tickets for ${eventName} can be booked here`}</span>
          </p>
          <button
            className="btn btn-flat max-w-200px text-sm font-medium border rounded-md px-4 py-2"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Get Tickets
          </button>
        </div>
        {eventVideo && (
          <div className="relative overflow-hidden shadow-md mb-6">
            <div className="aspect-w-16 aspect-h-9 flex items-center justify-center">
              <iframe
                width="100%"
                height="450px"
                src={
                  eventVideo.includes("youtu.be/")
                    ? eventVideo.replace("youtu.be/", "www.youtube.com/embed/")
                    : eventVideo.replace("watch?v=", "embed/")
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventLeft;
