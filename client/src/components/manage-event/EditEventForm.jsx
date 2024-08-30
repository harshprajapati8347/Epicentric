import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Country, State, City } from "country-state-city";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { geteventById, updateEvent } from "../../redux/actions/eventAction";
import { toast } from "react-toastify";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import eventCategories from "../../utils/utils";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Reoccurence from "./Reoccurence";

const SocialMediaInput = ({
  name,
  label,
  socialProfiles,
  setSocialProfiles,
}) => {
  if (!socialProfiles) return;
  const isChecked = socialProfiles;

  return (
    <div className="flex items-center mb-5 h-10">
      <input
        type="checkbox"
        name={name}
        id={name}
        className="h-5 w-5 rounded border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
        checked={isChecked}
        onChange={setSocialProfiles}
      />
      <label
        htmlFor={name}
        className="ml-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={`https://www.${name}.com/your-profile`}
        className="ml-3 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
        value={socialProfiles ? socialProfiles : ""}
        onChange={setSocialProfiles}
      />
    </div>
  );
};

const EditEventForm = () => {
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [event, setEvent] = useState({
    createdBy: "",
    eventName: "",
    startTime: "",
    endTime: "",
    isReoccuring: false,
    reoccuringValue: "",
    reoccuringTimeTable: {
      startDate: null,
      endDate: null,
      startMonth: null,
      endMonth: null,
      startYear: null,
      endYear: null,
    },
    reoccStart: "",
    reoccEnd: "",
    customTicketTypes: [],
    location: "",
    eventLocation: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    // mapLocation: {
    //   latitude: "",
    //   longitude: "",
    // },
    eventCategory: "",
    customEventCategory: "",
    eventVideoLink: "",
    eventVideo: "",
    bannerEventVideoLink: "",
    onlineEventUrl: "",
    socialProfiles: {},
    eventDescription: "",
    seatingArrangementImages: [],
    eventImages: [],
  });

  const [customEventCategory, setEventCategory] = useState("");
  const [customTicketTypes, setCustomTicketTypes] = useState([]);

  const [newTicketType, setNewTicketType] = useState({
    type: "",
    name: "",
    price: 0,
    description: "",
  });

  const [reoccuringTimeTable, setReoccuringTimeTable] = useState({
    startDate: null,
    endDate: null,
    startMonth: null,
    endMonth: null,
    startYear: null,
    endYear: null,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(geteventById(id));
    };
    fetchEvents();
  }, [dispatch, id]);

  useEffect(() => {
    if (events.isLoading === false && events.event) {
      setEvent(events?.event);
      setCustomTicketTypes(events?.event?.customTicketTypes);
    }
  }, [events.event]);

  const handleCustomTicketTypeChange = (e, index, field) => {
    const updatedCustomTicketTypes = JSON.parse(
      JSON.stringify(customTicketTypes)
    );
    updatedCustomTicketTypes[index][field] = e.target.value;

    if (field === "price") {
      if (e.target.value === "" || e.target.value === "0") {
        updatedCustomTicketTypes[index]["type"] = "free";
      } else {
        updatedCustomTicketTypes[index]["type"] = "paid";
      }
    }
    setCustomTicketTypes(updatedCustomTicketTypes);
  };

  const addCustomTicketType = () => {
    setCustomTicketTypes([...customTicketTypes, newTicketType]);
    setNewTicketType({
      type: "",
      name: "",
      price: 0,
      description: "",
      ticketCapacity: 0,
      reserveTickets: 0,
      ticketsBooked: 0,
    });
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setEvent((prev) => ({ ...prev, eventImages: filesArray }));
  };

  const handleSeatingArrangementChange = (e) => {
    const files = e.target?.files;
    const filesArray = Array.from(files);
    setEvent((prev) => ({
      ...prev,
      seatingArrangementImages: [
        ...prev.seatingArrangementImages,
        ...filesArray,
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event?.eventName) {
      return toast.error("Event Name is required");
    }
    if (!event?.location) {
      return toast.error("Location is required");
    }
    if (event?.location === "venue") {
      if (!event?.eventLocation?.address1) {
        return toast.error("Address 1 is required");
      }
      if (!event?.eventLocation?.zipCode) {
        return toast.error("Zip Code is required");
      }
      if (!event?.eventLocation?.country) {
        return toast.error("Country is required");
      }
      if (!event?.eventLocation?.state) {
        return toast.error("State is required");
      }
      if (!event?.eventLocation?.city) {
        return toast.error("City is required");
      }
    }
    if (!event?.eventCategory) {
      return toast.error("Event Category is required");
    }
    if (!event?.eventDescription) {
      return toast.error("Event Description is required");
    }
    if (!event?.seatingArrangementImages) {
      return toast.error("Seating Arrangement is required");
    }
    if (!event?.eventImages) {
      return toast.error("Event Images is required");
    }
    if (event?.customEventCategory) {
      setEventCategory(customEventCategory);
    }

    const newForm = {
      createdBy: event?.createdBy,
      eventName: event?.eventName,
      startTime: event?.startTime,
      endTime: event?.endTime,
      isReoccuring: event?.isReoccuring,
      reoccuringValue: event?.reoccuringValue,
      reoccuringTimeTable: {
        startDate: event?.reoccuringTimeTable?.startDate,
        endDate: event?.reoccuringTimeTable?.endDate,
        startMonth: event?.reoccuringTimeTable?.startMonth,
        endMonth: event?.reoccuringTimeTable?.endMonth,
        startYear: event?.reoccuringTimeTable?.startYear,
        endYear: event?.reoccuringTimeTable?.endYear,
      },
      reoccStar: event?.reoccStart,
      reoccEnd: event?.reoccEnd,
      customTicketTypes: customTicketTypes,
      location: event?.location,
      eventLocation: {
        address1: event?.eventLocation?.address1,
        address2: event?.eventLocation?.address2,
        city: event?.eventLocation?.city,
        state: event?.eventLocation?.state,
        country: event?.eventLocation?.country,
        zipCode: event?.eventLocation?.zipCode,
      },
      // mapLocation: {
      //   latitude: event?.mapLocation?.latitude,
      //   longitude: event?.mapLocation?.longitude,
      // },
      eventCategory: event?.eventCategory,
      customEventCategory: event?.customEventCategory,
      eventVideoLink: event?.eventVideoLink,
      eventVideo: event?.eventVideo,
      bannerEventVideoLink: event?.bannerEventVideoLink,
      onlineEventUrl: event?.onlineEventUrl,
      socialProfiles: event?.socialProfiles,
      eventDescription: event?.eventDescription,
      seatingArrangementImages: event?.seatingArrangementImages,
      eventImages: event?.eventImages,
      ticketsBooked: event?.ticketsBooked,
    };
    // console.log(newForm, id, "Event updated");
    // Approve
    dispatch(updateEvent(newForm, id));
    navigate("/manage/user-events");
  };

  console.log("event", event);

  return (
    <>
      {events.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 my-8 mx-96">
          <form onSubmit={handleSubmit}>
            {/* Heading - Publish Event Button */}
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-bold text-[#07074D]">
                Edit Event Details
              </h1>
              <button
                type="submit"
                className="bg-[#6A64F1] text-white px-8 py-3 rounded-md"
              >
                Publish Event
              </button>
            </div>
            {/* Event Name */}
            <div className="mb-5">
              <label
                htmlFor="eventName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="Event Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={event?.eventName}
                onChange={(e) =>
                  setEvent((prev) => ({ ...prev, eventName: e.target.value }))
                }
              />
            </div>
            {/* Single or Occurence */}
            <div className="mb-5">
              <label
                htmlFor="eventName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Event Type
              </label>
              <div className="flex items-center justify-start gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="event-type"
                    id="single-event"
                    className="focus:ring-[#6A64F1] h-4 w-4 text-[#6A64F1] border-gray-300 cursor-pointer"
                    checked={!event?.isReoccuring}
                    onChange={() =>
                      setEvent((prev) => ({ ...prev, isReoccuring: false }))
                    }
                  />
                  <label
                    htmlFor="single-event"
                    className="ml-3 block text-sm font-medium text-[#07074D] cursor-pointer"
                  >
                    Single Event
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="event-type"
                    id="reoccuring-event"
                    className="focus:ring-[#6A64F1] h-4 w-4 text-[#6A64F1] border-gray-300 cursor-pointer"
                    checked={event?.isReoccuring}
                    onChange={() =>
                      setEvent((prev) => ({ ...prev, isReoccuring: true }))
                    }
                  />
                  <label
                    htmlFor="reoccuring-event"
                    className="ml-3 block text-sm font-medium text-[#07074D] cursor-pointer"
                  >
                    Recurring Event
                  </label>
                </div>
              </div>
            </div>
            {/* Occuring Event */}
            {event?.isReoccuring ? (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="reoccuring event"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Occurrence of the event
                  </label>
                  <select
                    name="reoccuring event"
                    id="reoccuring event"
                    value={event?.reoccuringValue}
                    onChange={(e) =>
                      setEvent((prev) => ({
                        ...prev,
                        reoccuringValue: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="">Please Select</option>
                    <option value="Daily">Daily</option>
                    {/* <option value="Weekly">Weekly</option> */}
                    {/* <option value="Fortnightly">Fortnightly</option> */}
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    {/* <option value="Custom">Custom</option> */}
                  </select>
                </div>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="start"
                        id="start"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                        value={event?.reoccStart}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            reoccStart: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="end"
                        id="end"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                        value={
                          event?.reoccEnd === ""
                            ? event?.reoccStart
                            : event?.reoccEnd
                        }
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            reoccEnd: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Start To End
                  </label>
                  <Reoccurence
                    reoccuringTimeTable={reoccuringTimeTable}
                    setReoccuringTimeTable={setReoccuringTimeTable}
                    occType={event?.reoccuringValue}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        id="startTime"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        value={
                          event?.startTime?.split(":")[0] +
                          ":" +
                          event?.startTime?.split(":")[1]
                        }
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            startTime: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        End Date
                      </label>
                      <input
                        type="datetime-local"
                        name="endTime"
                        id="endTime"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        value={
                          event?.endTime?.split(":")[0] +
                          ":" +
                          event?.endTime?.split(":")[1]
                        }
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            endTime: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Single Event */}

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="location"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Where will your event take place?
                  </label>
                  <select
                    name="location"
                    id="location"
                    value={event?.location}
                    onChange={(e) =>
                      setEvent((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="venue">Venue</option>
                    <option value="online">Online</option>
                    <option value="recorded">Recorded</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                {event?.location === "online" && (
                  <div className="mb-5">
                    <label
                      htmlFor="onlineEventUrl"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Online Event URL
                    </label>
                    <input
                      type="text"
                      name="onlineEventUrl"
                      id="onlineEventUrl"
                      placeholder="https://us05web.zoom.us/j/84406?pwd=7mSQ8iNJ"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                      value={event?.onlineEventUrl}
                      onChange={(e) =>
                        setEvent((prev) => ({
                          ...prev,
                          onlineEventUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                {event?.location === "recorded" && (
                  <div className="mb-5">
                    <label
                      htmlFor="onlineEventUrl"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Recorded Event URL
                    </label>
                    <input
                      type="text"
                      name="onlineEventUrl"
                      id="onlineEventUrl"
                      placeholder="https://us05web.zoom.us/j/84406?pwd=7mSQ8iNJ"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                      value={event?.eventVideoLink}
                      onChange={(e) =>
                        setEvent((prev) => ({
                          ...prev,
                          eventVideoLink: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            {event?.location === "venue" && (
              <>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Address 1
                  </label>
                  <input
                    type="address"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                    value={event?.eventLocation?.address1}
                    onChange={(e) =>
                      setEvent((prev) => ({
                        ...prev,
                        eventLocation: {
                          ...prev.eventLocation,
                          address1: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Address 2
                  </label>
                  <input
                    type="address"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                    value={event?.eventLocation?.address2}
                    onChange={(e) =>
                      setEvent((prev) => ({
                        ...prev,
                        eventLocation: {
                          ...prev.eventLocation,
                          address2: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Country
                      </label>
                      <select
                        name=""
                        id=""
                        value={event?.eventLocation?.country}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            eventLocation: {
                              ...prev.eventLocation,
                              country: e.target.value,
                            },
                          }))
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="" className="block border pb-2">
                          choose your country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item, index) => (
                            <option
                              key={index}
                              className="block pb-2"
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Choose your State
                      </label>
                      <select
                        name=""
                        id=""
                        value={event?.eventLocation?.state}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            eventLocation: {
                              ...prev.eventLocation,
                              state: e.target.value,
                            },
                          }))
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="" className="block border pb-2">
                          choose your state
                        </option>
                        {event?.eventLocation?.country &&
                          State &&
                          State.getStatesOfCountry(
                            event?.eventLocation?.country
                          ).map((item, index) => (
                            <option
                              className="block pb-2"
                              key={index}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Choose your City
                      </label>
                      <select
                        name=""
                        id=""
                        value={event?.eventLocation?.city}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            eventLocation: {
                              ...prev.eventLocation,
                              city: e.target.value,
                            },
                          }))
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="" className="block border pb-2">
                          choose your city
                        </option>
                        {City &&
                          City.getCitiesOfCountry(
                            event?.eventLocation?.country
                          ).map((item, index) => (
                            <option
                              className="block pb-2"
                              key={index}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Zip Code
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                        value={event?.eventLocation?.zipCode}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            eventLocation: {
                              ...prev.eventLocation,
                              zipCode: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                  {/* <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Latiude
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                        value={event?.mapLocation?.latitude}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            mapLocation: {
                              ...prev.mapLocation,
                              latitude: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div> */}
                  {/* <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Longitude
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                        value={event?.mapLocation?.longitude}
                        onChange={(e) =>
                          setEvent((prev) => ({
                            ...prev,
                            mapLocation: {
                              ...prev.mapLocation,
                              longitude: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div> */}
                </div>
              </>
            )}
            <div className="mb-5">
              <label
                htmlFor="eventLocation"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Event Category
              </label>
              <select
                name="eventCategory"
                id="eventCategory"
                value={event?.eventCategory}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    eventCategory: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Please Select</option>
                {eventCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>
            {/* EventCategory === Other */}
            {event?.eventCategory === "other" && (
              <div className="mb-5">
                <label
                  htmlFor="customEventCategory"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Create Event Category
                </label>
                <input
                  type="text"
                  name="customEventCategory"
                  id="customEventCategory"
                  placeholder="Enter custom event category"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                  value={event?.customEventCategory}
                  onChange={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      customEventCategory: e.target.value,
                    }))
                  }
                />
              </div>
            )}
            <div className="mb-5">
              <label
                htmlFor="customTicketTypes"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Custom Ticket Types
              </label>
              <div className="mb-5 border-l-4 pl-4">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="multiple_files"
                >
                  Upload Image of Event Location (Venue) - Seating Arrangement
                </label>
                <input
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                  type="file"
                  onChange={handleSeatingArrangementChange}
                  multiple
                />
                {event?.seatingArrangementImages?.length > 0 && (
                  <div className="flex items-center gap-3 mt-3">
                    {event?.seatingArrangementImages.map((image, index) => (
                      <div key={index}>
                        <img
                          src={`/server/uploads/${image}`}
                          alt="seating arrangement"
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="gap">
                {customTicketTypes?.map((ticket, index) => {
                  return (
                    <div key={index} className="border-l-4 pl-4 mb-3">
                      <label
                        htmlFor="index"
                        className="mb-3 block text-lg font-medium text text-[#07074D] underline"
                      >
                        Ticket {index + 1}
                      </label>
                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                              htmlFor="ticketName"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Ticket Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              placeholder="Ticket Name"
                              value={ticket.name}
                              onChange={(e) =>
                                handleCustomTicketTypeChange(e, index, "name")
                              }
                            />
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                              Price
                            </label>
                            <input
                              type="number"
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              placeholder="Price"
                              value={ticket.price}
                              onChange={(e) =>
                                handleCustomTicketTypeChange(e, index, "price")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div key={index} className="mb-3">
                        <div className="-mx-3 flex flex-wrap">
                          <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                              <label className="mb-3 block text-base font-medium text-[#07074D]">
                                Ticket Capacity
                              </label>
                              <input
                                type="number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                placeholder="Ticket Capacity"
                                value={ticket.ticketCapacity}
                                onChange={(e) =>
                                  handleCustomTicketTypeChange(
                                    e,
                                    index,
                                    "ticketCapacity"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                              <label className="mb-3 block text-base font-medium text-[#07074D]">
                                Reserve Tickets
                              </label>
                              <input
                                type="number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                placeholder="Ticket Quantity"
                                value={ticket.reserveTickets}
                                onChange={(e) =>
                                  handleCustomTicketTypeChange(
                                    e,
                                    index,
                                    "reserveTickets"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="customEventCategory"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Ticket Description
                          </label>
                          <textarea
                            name="ticketDescription"
                            id="ticketDescription"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            placeholder="Ticket Description"
                            value={ticket.description}
                            onChange={(e) =>
                              handleCustomTicketTypeChange(
                                e,
                                index,
                                "description"
                              )
                            }
                          />
                        </div>
                        {/* TODO: */}
                        {/* <button
                          className="text-sm font-medium text-[#6A64F1] hover:underline cursor-pointer"
                          onClick={() => removeCustomTicketType(index)}
                        >
                          Remove
                        </button> */}
                      </div>
                    </div>
                  );
                })}
                <button
                  className="text-sm font-medium text-[#6A64F1] hover:underline cursor-pointer"
                  onClick={addCustomTicketType}
                >
                  Add Custom Ticket Type
                </button>
              </div>
            </div>
            <div className="mb-5 border-l-4 pl-4">
              <Accordion allowToggle>
                <AccordionItem>
                  <h2 className="font-medium">
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Select your preferred way to receive payments.
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}></AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Add Youtube Video */}
            <div className="mb-5">
              <label
                htmlFor="youtubeVideo"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Youtube Video Link
              </label>
              <input
                type="text"
                name="youtubeVideo"
                id="youtubeVideo"
                placeholder="https://www.youtube.com/watch?v=ZCZg9cJiX3k"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={event?.eventVideo}
                onChange={(e) =>
                  setEvent((prev) => ({ ...prev, eventVideo: e.target.value }))
                }
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="bannerEventVideoLink"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Event Video URL (Optional)
              </label>
              <input
                type="text"
                name="bannerEventVideoLink"
                id="bannerEventVideoLink"
                placeholder="https://screenrec.com/share/xasI3aBslas"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
                value={event?.bannerEventVideoLink}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    bannerEventVideoLink: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
                htmlFor="multiple_files"
              >
                Upload Event Thumbnail (Multiple Photos Allowed)
              </label>
              <input type="file" onChange={handleFileInputChange} multiple />
            </div>
            {event?.eventImages?.length > 0 && (
              <div className="mb-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                  htmlFor="multiple_files"
                >
                  Event Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {event?.eventImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src="../../assets/argentina.png"
                        alt="event"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <button
                        className="text-sm font-medium text-[#6A64F1] hover:underline cursor-pointer"
                        // onClick={() => removeImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* TODO:Social Profiles */}
            <div className="mb-5">
              <label
                htmlFor="socialProfiles"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Add Profile Links of your Social Media Apps
              </label>
              <div className="mb-5 border-l-4 pl-4">
                <SocialMediaInput
                  name="youtube"
                  label="Youtube"
                  socialProfiles={event?.socialProfiles?.youtube}
                  setSocialProfiles={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      socialProfiles: {
                        ...prev.socialProfiles,
                        youtube: e.target.value,
                      },
                    }))
                  }
                />
                <SocialMediaInput
                  name="facebook"
                  label="Facebook"
                  socialProfiles={event?.socialProfiles?.facebook}
                  setSocialProfiles={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      socialProfiles: {
                        ...prev.socialProfiles,
                        facebook: e.target.value,
                      },
                    }))
                  }
                />
                <SocialMediaInput
                  name="instagram"
                  label="Instagram"
                  socialProfiles={event?.socialProfiles?.instagram}
                  setSocialProfiles={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      socialProfiles: {
                        ...prev.socialProfiles,
                        instagram: e.target.value,
                      },
                    }))
                  }
                />
                <SocialMediaInput
                  name="twitter"
                  label="Twitter"
                  socialProfiles={event?.socialProfiles?.twitter}
                  setSocialProfiles={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      socialProfiles: {
                        ...prev.socialProfiles,
                        twitter: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Event Description
              </label>
              <ReactQuill
                type="textarea"
                theme="snow"
                style={{
                  height: "400px",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0.375rem",
                }}
                value={event?.eventDescription}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    eventDescription: e,
                  }))
                }
                name="eventDescription"
              />
            </div>

            {/* TODO:Ticket Payment MenthodSelection  */}

            <div className="mb-5">
              {/* Paid and Free */}
              <label
                htmlFor="ticketSelection"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Ticket Selection
              </label>
              <div className="border-gray-300 border rounded-sm p-4">
                <div className="flex gap-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="ticketSelection"
                      id="free"
                      className="focus:ring-[#6A64F1] h-4 w-4 text-[#6A64F1] border-gray-300 cursor-pointer"
                      checked={!event?.isPaid}
                      onChange={() =>
                        setEvent((prev) => ({ ...prev, isPaid: false }))
                      }
                    />
                    <label
                      htmlFor="free"
                      className="ml-3 block text-sm font-medium text-[#07074D] cursor-pointer"
                    >
                      Free
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="ticketSelection"
                      id="paid"
                      className="focus:ring-[#6A64F1] h-4 w-4 text-[#6A64F1] border-gray-300 cursor-pointer"
                      checked={event?.isPaid}
                      onChange={() =>
                        setEvent((prev) => ({ ...prev, isPaid: true }))
                      }
                    />
                    <label
                      htmlFor="paid"
                      className="ml-3 block text-sm font-medium text-[#07074D] cursor-pointer"
                    >
                      Paid
                    </label>
                  </div>
                </div>
                <div className="flex flex-col py-4 m-2 gap-4">
                  <div className="flex">
                    <IoShieldCheckmarkSharp className="text-[#386e21] text-2xl" />
                    <span>
                      Top rankings & better visibility on search engines
                    </span>
                  </div>
                  <div className="flex">
                    <IoShieldCheckmarkSharp className="text-[#386e21] text-2xl" />
                    <span>Instant & Direct payments to your account</span>
                  </div>
                  <div className="flex">
                    <IoShieldCheckmarkSharp className="text-[#386e21] text-2xl" />
                    <span>Booking reminders for incomplete transactions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="bg-[#6A64F1] text-white px-8 py-3 m-2 rounded-md"
              >
                Publish Event
              </button>
              <button
                type="submit"
                className="bg-[#6A64F1] text-white px-8 py-3 m-2 rounded-md"
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditEventForm;
