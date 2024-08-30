import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createevent, eventCreateReset } from "../../redux/actions/eventAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import eventCategories from "../../utils/utils";
import Reoccurence from "./Reoccurence";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
} from "@chakra-ui/react";

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { success, error, event } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      dispatch(eventCreateReset());
      navigate(`/manage/edit-event/${event.data._id}`);
    }
  }, [dispatch, error, navigate, success]);

  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("venue");
  const [eventCategory, setEventCategory] = useState("");
  const [customEventCategory, setCustomEventCategory] = useState("");
  const [eventVideoLink, setEventVideoLink] = useState("");
  const [eventVideo, setEventVideo] = useState("");
  const [bannerEventVideoLink, setBannerEventVideoLink] = useState("");
  const [onlineEventUrl, setOnlineEventUrl] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImages, setEventImages] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const [isReoccuring, setIsReoccuring] = useState(false);
  const [reoccuringValue, setReoccuringValue] = useState("Daily");
  const [reoccStart, setReoccStart] = useState("");
  const [reoccEnd, setReoccEnd] = useState("");
  //
  const [customTicketTypes, setCustomTicketTypes] = useState([
    {
      type: "",
      name: "",
      price: 0,
      description: "",
      ticketCapacity: 0,
      reserveTickets: 0,
      ticketsBooked: 0,
    },
  ]);
  const [seatingArrangementImages, setSeatingArrangementImages] = useState();

  const [reoccuringTimeTable, setReoccuringTimeTable] = useState({
    startDate: null,
    endDate: null,
    startMonth: null,
    endMonth: null,
    startYear: null,
    endYear: null,
  });

  const [socialProfiles, setSocialProfiles] = useState({
    instagram: "",
    twitter: "",
    youtube: "",
    facebook: "",
  });

  const handleCustomTicketTypeChange = (e, index, field) => {
    const updatedCustomTicketTypes = [...customTicketTypes];
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
    setCustomTicketTypes([
      ...customTicketTypes,
      {
        type: "",
        name: "",
        price: 0,
        description: "",
        ticketCapacity: 0,
        reserveTickets: 0,
        ticketsBooked: 0,
      },
    ]);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setEventImages(filesArray);
  };

  const handleSeatingArrangementChange = (e) => {
    const files = e.target?.files;
    const filesArray = Array.from(files);
    setSeatingArrangementImages(filesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName) {
      return toast.error("Event Name is required");
    }
    if (!location) {
      return toast.error("Location is required");
    }
    if (location === "venue") {
      if (!address1) {
        return toast.error("Address 1 is required");
      }
      if (!city) {
        return toast.error("City is required");
      }
      if (!zipCode) {
        return toast.error("Zip Code is required");
      }
      if (!state) {
        return toast.error("State is required");
      }
      if (!country) {
        return toast.error("Country is required");
      }
    }
    if (!eventCategory) {
      return toast.error("Event Category is required");
    }
    if (!eventDescription) {
      return toast.error("Event Description is required");
    }
    if (!seatingArrangementImages) {
      return toast.error("Seating Arrangement Image is required");
    }
    if (!eventImages) {
      return toast.error("Event Image is required");
    }
    if (customEventCategory) {
      setEventCategory(customEventCategory);
    }

    // customTicketTypes validation
    // If All Fields Value are Empty || 0 || Null || Undefined then Remove that Object from customTicketTypes Array
    if (customTicketTypes.length === 0) {
      return toast.error("Please add atleast one ticket type");
    }
    if (customTicketTypes.length > 0) {
      const updatedCustomTicketTypes = customTicketTypes.filter(
        (ticket) =>
          ticket.name ||
          ticket.price ||
          ticket.description ||
          ticket.ticketCapacity ||
          ticket.reserveTickets
      );
      setCustomTicketTypes(updatedCustomTicketTypes);
      if (updatedCustomTicketTypes.length === 0) {
        return toast.error("Please add atleast one ticket type");
      }
    }

    const newForm = {
      eventName,
      startTime,
      endTime,
      isReoccuring,
      reoccuringValue,
      reoccuringTimeTable,
      reoccStart,
      reoccEnd,
      customTicketTypes: [...customTicketTypes],
      location,
      eventLocation: {
        address1,
        address2,
        city,
        state,
        country,
        zipCode,
      },
      // mapLocation: {
      //   latitude,
      //   longitude,
      // },
      eventCategory,
      customEventCategory,
      eventVideoLink,
      eventVideo,
      bannerEventVideoLink,
      onlineEventUrl,
      socialProfiles,
      eventDescription,
      seatingArrangementImages,
      eventImages,
      createdBy: user._id,
      ticketsBooked: 0,
    };
    console.log(newForm, user, "newForm");
    dispatch(createevent(newForm));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      {/* Disable Form is Blocked User - user.blockUserFromCreatingEvent */}
      {user.blockUserFromCreatingEvent && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
          role="alert"
        >
          <strong className="font-bold">Blocked! </strong>
          <span className="block sm:inline">
            You are blocked from creating events, please contact support for
            more details.
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ opacity: user.blockUserFromCreatingEvent ? 0.5 : 1 }}
      >
        <div className="mb-5">
          <label
            htmlFor="eventName"
            className="mb-3 block text-2xl font-large text-[#07074D]"
          >
            PUBLISH YOUR EVENT
          </label>
        </div>
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
            ref={inputRef}
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
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
                checked={!isReoccuring}
                onChange={() => setIsReoccuring(false)}
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
                checked={isReoccuring}
                onChange={() => setIsReoccuring(true)}
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
        {isReoccuring ? (
          <>
            <div className="mb-5">
              <label
                htmlFor="reoccuring event"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Occurrence of the event
              </label>
              <select
                ref={inputRef}
                name="reoccuring event"
                id="reoccuring event"
                value={reoccuringValue}
                onChange={(e) => setReoccuringValue(e.target.value)}
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
                    ref={inputRef}
                    value={reoccStart}
                    onChange={(e) => setReoccStart(e.target.value)}
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
                    ref={inputRef}
                    value={reoccEnd}
                    onChange={(e) => setReoccEnd(e.target.value)}
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
                occType={reoccuringValue}
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
                    ref={inputRef}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
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
                    ref={inputRef}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="venue">Venue</option>
                <option value="online">Online</option>
                <option value="recorded">Recorded</option>
              </select>
            </div>
          </div>
        </div>
        {location === "online" && (
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
              ref={inputRef}
              value={onlineEventUrl}
              onChange={(e) => setOnlineEventUrl(e.target.value)}
            />
          </div>
        )}
        {location === "recorded" && (
          <div className="mb-5">
            <label
              htmlFor="recordedEventUrl"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Recorded Event URL
            </label>
            <input
              type="text"
              name="recordedEventUrl"
              id="recordedEventUrl"
              placeholder="https://www.youtube.com/watch?v=ZCZg9cJiX3k"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
              ref={inputRef}
              value={eventVideoLink}
              onChange={(e) => setEventVideoLink(e.target.value)}
            />
          </div>
        )}
        {location === "venue" && (
          <>
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Event Location (Address)
            </label>
            <div className="mb-5 pl-4 border-l-4">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Address 1
                </label>
                <input
                  type="address"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  ref={inputRef}
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
                  value={address2}
                  ref={inputRef}
                  onChange={(e) => setAddress2(e.target.value)}
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
                      value={country}
                      ref={inputRef}
                      onChange={(e) => setCountry(e.target.value)}
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
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="" className="block border pb-2">
                        choose your state
                      </option>
                      {country &&
                        State &&
                        State.getStatesOfCountry(country).map((item, index) => (
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {City &&
                        City.getCitiesOfCountry(country).map((item, index) => (
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
                      type="text"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
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
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      ref={inputRef}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Longitude
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      ref={inputRef}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </>
        )}
        <div className="mb-5">
          <label
            htmlFor="eventCategory"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Event Category
          </label>
          <select
            name="eventCategory"
            id="eventCategory"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
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
        {eventCategory === "other" && (
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
              placeholder="Educational, Fashion Show etc."
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
              ref={inputRef}
              value={customEventCategory}
              onChange={(e) => setCustomEventCategory(e.target.value)}
            />
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="customTicketTypes"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Add Custom Ticket Types
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
              ref={inputRef}
              onChange={handleSeatingArrangementChange}
              multiple
            />
          </div>
          <div className="border-l-4 pl-4">
            {customTicketTypes.map((ticket, index) => (
              <div key={index} className="mb-3">
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  marginInlineEnd={4}
                >
                  <label
                    htmlFor="index"
                    className="mb-3 block text-lg font-medium text text-[#07074D] underline"
                  >
                    Ticket {index + 1}
                  </label>
                  <button
                    className="text-sm font-medium text-[#6A64F1] hover:underline cursor-pointer"
                    onClick={() => {
                      const updatedCustomTicketTypes = customTicketTypes.filter(
                        (ticket, i) => i !== index
                      );
                      if (updatedCustomTicketTypes.length === 0) {
                        return toast.error(
                          "Please add atleast one ticket type"
                        );
                      } else {
                        toast.success("Ticket Type Removed Successfully");
                      }
                      setCustomTicketTypes(updatedCustomTicketTypes);
                    }}
                  >
                    Remove
                  </button>
                </HStack>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
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
                          placeholder="Reserve Tickets"
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
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="eventCategory"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Ticket Description
                  </label>
                  <textarea
                    name="ticketDescription"
                    id="ticketDescription"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={ticket.description}
                    onChange={(e) =>
                      handleCustomTicketTypeChange(e, index, "description")
                    }
                  />
                </div>
              </div>
            ))}
            <button
              className="text-sm font-medium text-[#6A64F1] hover:underline cursor-pointer"
              onClick={addCustomTicketType}
              type="button"
            >
              + Add Ticket Type
            </button>
          </div>
        </div>
        <div className="mb-5 border-l-4 pl-4">
          <Accordion allowToggle>
            <AccordionItem>
              <h2 className="font-medium">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Available Payment Methods
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Stripe</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Add Youtube Video */}
        <div className="mb-5">
          <label
            htmlFor="youtubeVideo"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Youtube Video Link (Optional)
          </label>
          <input
            type="text"
            name="youtubeVideo"
            id="youtubeVideo"
            placeholder="https://www.youtube.com/watch?v=ZCZg9cJiX3k"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ref={inputRef}
            value={eventVideo}
            onChange={(e) => setEventVideo(e.target.value)}
          />
        </div>
        {/* Add Video Link Add Input and extract Thumbnail from it */}
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
            ref={inputRef}
            value={bannerEventVideoLink}
            onChange={(e) => setBannerEventVideoLink(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="multiple_files"
          >
            Upload Event Thumbnail (Multiple Photos Allowed)
          </label>
          <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
            type="file"
            ref={inputRef}
            onChange={handleFileInputChange}
            multiple
          />
        </div>
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
              socialProfiles={socialProfiles}
              setSocialProfiles={setSocialProfiles}
            />
            <SocialMediaInput
              name="instagram"
              label="Instagram"
              socialProfiles={socialProfiles}
              setSocialProfiles={setSocialProfiles}
            />
            <SocialMediaInput
              name="facebook"
              label="Facebook"
              socialProfiles={socialProfiles}
              setSocialProfiles={setSocialProfiles}
            />
            <SocialMediaInput
              name="twitter"
              label="Twitter"
              socialProfiles={socialProfiles}
              setSocialProfiles={setSocialProfiles}
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
            ref={inputRef}
            theme="snow"
            style={{
              height: "200px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              borderRadius: "0.375rem",
            }}
            value={eventDescription}
            onChange={(e) => setEventDescription(e)}
            name="eventDescription"
          />
        </div>
        <div className="mb-5">
          <button
            type="submit"
            className="hover:shadow-form rounded-md bg-[#9ccc47] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

const SocialMediaInput = ({
  name,
  label,
  socialProfiles,
  setSocialProfiles,
}) => {
  const isChecked = socialProfiles[name];

  const handleChange = (e) => {
    setSocialProfiles({
      ...socialProfiles,
      [name]: e.target.checked,
    });
  };

  return (
    <div className="flex items-center mb-5 h-10">
      <input
        type="checkbox"
        name={name}
        id={name}
        className="h-5 w-5 rounded border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className="ml-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>

      {isChecked && (
        <input
          type="text"
          name={name}
          id={name}
          placeholder={`https://www.${name}.com/your-profile`}
          className="ml-3 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
          value={socialProfiles[name] === true ? "" : socialProfiles[name]}
          onChange={(e) =>
            setSocialProfiles({
              ...socialProfiles,
              [name]: e.target.value,
            })
          }
        />
      )}
    </div>
  );
};

export default CreateEventForm;
