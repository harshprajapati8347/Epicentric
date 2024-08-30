import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { dateTimeConversion } from "../utils/dateTimeConversion";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import Payment from "./Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TicketModal({
  isOpen,
  closeModal,
  customTicketTypes,
  event,
}) {
  const { user } = useSelector((state) => state.user);
  const [stripeApikey, setStripeApiKey] = useState("");
  const navigate = useNavigate();

  async function getStripeApikey() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/payment/stripeapikey`
    );
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    getStripeApikey();
  }, []);

  const dateTimeEventData = dateTimeConversion(event.startTime, event.endTime);
  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [formStep, setFormStep] = useState(1);
  const [quantities, setQuantities] = useState([]);
  const [finalTicketInfo, setFinalTicketInfo] = useState({
    totalTickets: 0,
    totalCost: 0,
  });
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);

  const handleIncrement = (item, index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
    setAttendeeDetails((prev) => {
      // keep previous state and add new attendee details with additional key-value pairs
      const newAttendeeDetails = [...prev];
      newAttendeeDetails.push({
        name: item.name,
        price: item.price,
        description: item.description,
        quantity: 1,
        attendeeName: "",
        attendeeEmail: "",
        attendeePhoneCountryCode: "",
        attendeePhone: "",
        ticketTypeIndex: index,
        ticketId: uuidv4(),
      });
      // sort the array based on ticketTypeIndex
      newAttendeeDetails.sort((a, b) => a.ticketTypeIndex - b.ticketTypeIndex);
      return newAttendeeDetails;
    });
  };

  const handleDecrement = (item, index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) - 1,
    }));
    setAttendeeDetails((prev) => {
      const newAttendeeDetails = [...prev];
      const indexToRemove = newAttendeeDetails.findIndex(
        (attendee) => attendee.ticketTypeIndex === index
      );
      newAttendeeDetails.splice(indexToRemove, 1);
      return newAttendeeDetails;
    });
  };

  useEffect(() => {
    setFinalTicketInfo({
      totalTickets: Object.values(quantities).reduce(
        (acc, item) => acc + item,
        0
      ),
      totalCost: Object.values(quantities)
        .reduce(
          (acc, item, index) => acc + item * customTicketTypes[index].price,
          0
        )
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .replace(/\./g, ".")
        .replace(/,/g, ""),
    });
  }, [quantities]);

  useEffect(() => {
    localStorage.setItem("attendeeDetails", JSON.stringify(attendeeDetails));
    const orderData = {
      tickets: attendeeDetails,
      event: event,
      user: user,
      totalPrice: finalTicketInfo.totalCost,
    };
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
  }, [attendeeDetails, event, finalTicketInfo.totalCost, user]);

  const CloseButton = () => {
    return (
      <>
        {/* Close Modal Button */}
        <button
          type="button"
          className="bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3 hover:bg-gray-100 rounded-full"
          onClick={closeModal}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/12000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#000000"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </>
    );
  };

  const handleDownloadTickets = () => {
    const doc = new jsPDF();
    const header = [
      "Index",
      "Ticket ID",
      "Name",
      "Description",
      "Price",
      "Quantity",
      "Total",
    ];

    // Data to be displayed in the table
    const data = attendeeDetails.map((item, index) => [
      index + 1,
      item.ticketId,
      item.name,
      item.description,
      item.price,
      1,
      item.price,
    ]);

    // Put Margin on Top and Bottom of the PDF
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Set font style
    doc.setFont("helvetica");

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text(`Tickets for Event "${event.eventName}"`, 10, 15);

    // Add a table to the PDF
    doc.autoTable({
      startY: 20,
      head: [header],
      body: data,
    });

    // Save the PDF document
    doc.save("tickets.pdf");
  };

  const eventCapacityCalculation = customTicketTypes.map((item) => {
    return item.ticketCapacity - item.reserveTickets - item.ticketsBooked;
  });

  const sellingFast = Math.min(...eventCapacityCalculation);

  return (
    <>
      <Transition appear={true} show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex flex-1 w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  {formStep === 1 && (
                    <div>
                      <div className="flex justify-between items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium p-4 leading-6 text-gray-900"
                        >
                          Select Tickets
                        </Dialog.Title>
                        <div className="border-b border-gray-200"></div>
                        {/* Selling Fast */}
                        <div className="flex justify-center items-center p-4">
                          <Text className="text-red-500 font-semibold animate-pulse">
                            {`💥Selling Fast🔥${sellingFast}`}
                          </Text>
                        </div>
                        <CloseButton />
                      </div>
                      <HStack
                        backgroundColor={"#f1f1f1"}
                        padding={"15px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        height={"50px"}
                      >
                        <Text fontSize={"16px"} fontWeight={"600"}>
                          Ticket Type
                        </Text>
                        <Text>Quantity</Text>
                      </HStack>
                      {/* Ticket Type */}
                      <Box gap={"5"}>
                        {customTicketTypes.map((item, index) => {
                          return (
                            <>
                              <Box
                                height={"auto"}
                                paddingBlock={"10px"}
                                overflowY={"auto"}
                                key={index}
                              >
                                <HStack className="flex justify-between items-center">
                                  <VStack className="flex flex-col ml-4">
                                    <Text className="text-gray-800 font-medium">
                                      {item.name}
                                    </Text>
                                    <Text className="text-gray-600 font-medium">
                                      ${item.price}
                                    </Text>
                                  </VStack>
                                  <HStack className="flex items-center justify-center">
                                    <Button
                                      className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full mr-2"
                                      onClick={() =>
                                        handleIncrement(item, index)
                                      }
                                    >
                                      <PlusIcon className="w-5 h-5" />
                                    </Button>
                                    <Text>{quantities[index] || 0}</Text>
                                    <Button
                                      className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full mx-2"
                                      onClick={() =>
                                        handleDecrement(item, index)
                                      }
                                    >
                                      <MinusIcon className="w-5 h-5" />
                                    </Button>
                                  </HStack>
                                </HStack>
                                <VStack
                                  paddingInline={"15px"}
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-start"}
                                  height={"auto"} // Set height to "auto" to allow it to expand based on content
                                >
                                  <Text>Description:</Text>
                                  <Text
                                    fontSize={"14px"}
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(
                                        item.description
                                      ),
                                    }}
                                  ></Text>
                                </VStack>
                              </Box>
                              <Box
                                backgroundColor={"#f1f1f1"}
                                paddingBlock={"10px"}
                              ></Box>
                            </>
                          );
                        })}

                        {/* Proceed Button  */}
                        <Box
                          paddingBlock={"10px"}
                          paddingInline={"15px"}
                          height={"auto"}
                        >
                          {quantities.length !== 0 && (
                            <>
                              <HStack
                                className="flex justify-between items-center"
                                paddingBlock={"10px"}
                              >
                                <Text className="text-gray-800 font-medium">
                                  Quantity: {finalTicketInfo.totalTickets || 0}
                                </Text>
                                <Text className="text-gray-600 font-medium">
                                  Total: {finalTicketInfo.totalCost || 0}
                                </Text>
                              </HStack>
                            </>
                          )}
                          <Button
                            className="w-full h-12 bg-yellow-500 rounded-md text-white"
                            onClick={() => {
                              attendeeDetails.length !== 0
                                ? setFormStep((prev) => prev + 1)
                                : toast.error(
                                    "Please select atleast one ticket"
                                  );
                            }}
                          >
                            Proceed
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  )}
                  {formStep === 2 && (
                    <div>
                      <div className="flex justify-between items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium p-4 leading-6 text-gray-900"
                        >
                          Attendee Details
                        </Dialog.Title>
                        {/* Divider Line  */}
                        <div className="border-b border-gray-200"></div>
                        {/* Selling Fast */}
                        <div className="flex justify-center items-center p-4">
                          <Text className="text-red-500 font-semibold animate-pulse">
                            {`💥Selling Fast🔥${sellingFast}`}
                          </Text>
                        </div>
                        <CloseButton />
                      </div>
                      {/* eventName and event Date */}
                      <HStack padding={"15px"} justifyContent={"space-between"}>
                        <Text fontSize={"16px"} fontWeight={"600"}>
                          {event.eventName}
                        </Text>
                        <Text>{dateTimeEventData}</Text>
                      </HStack>
                      <div className="border-b border-gray-200"></div>
                      {attendeeDetails?.map((item, index) => {
                        return (
                          <>
                            {item.quantity >= 1 && (
                              <Box
                                gap={"5"}
                                padding={"20"}
                                backgroundColor={"#f1f1f1"}
                                key={index}
                              >
                                <HStack
                                  padding={"15px"}
                                  alignItems={"center"}
                                  height={"50px"}
                                >
                                  <Text fontSize={"16px"} fontWeight={"600"}>
                                    Ticket ID: {item.ticketId}
                                  </Text>
                                  <Text>|</Text>
                                  <Text fontSize={"16px"} fontWeight={"600"}>
                                    Ticket type: {item.name}
                                  </Text>
                                  <Text>|</Text>
                                  <Text>Quantity: {item.quantity}</Text>
                                </HStack>
                                <VStack
                                  padding={"15px"}
                                  paddingBlock={"20px"}
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-start"}
                                  height={"auto"}
                                  backgroundColor={"#fff"}
                                  borderTop={"2px solid #3498db"}
                                >
                                  <VStack
                                    alignItems={"flex-start"}
                                    className="flex justify-between items-center"
                                    width={"100%"}
                                  >
                                    <Text paddingInline={"10px"}>Name:</Text>
                                    <input
                                      type="text"
                                      className="w-full flex mx-2 px-2 h-9 rounded-md border border-gray-300"
                                      placeholder="Enter your name"
                                      onChange={(e) => {
                                        setAttendeeDetails((prev) => {
                                          const newAttendeeDetails = [...prev];
                                          newAttendeeDetails[index] = {
                                            ...newAttendeeDetails[index],
                                            attendeeName: e.target.value,
                                          };
                                          return newAttendeeDetails;
                                        });
                                      }}
                                      value={item.attendeeName}
                                    />
                                    <Text paddingInline={"10px"}>Email:</Text>
                                    <input
                                      type="email"
                                      className="w-full flex mx-2 px-2 h-9 rounded-md border border-gray-300"
                                      placeholder="Enter your email"
                                      onChange={(e) => {
                                        setAttendeeDetails((prev) => {
                                          const newAttendeeDetails = [...prev];
                                          newAttendeeDetails[index] = {
                                            ...newAttendeeDetails[index],
                                            attendeeEmail: e.target.value,
                                          };
                                          return newAttendeeDetails;
                                        });
                                      }}
                                      value={item.attendeeEmail}
                                    />
                                    <Text paddingInline={"10px"}>Phone:</Text>
                                    <HStack
                                      className="flex items-center"
                                      width={"100%"}
                                      marginInline={"8px"}
                                    >
                                      <select
                                        className="w-fit flex px-2 h-9 rounded-md border border-gray-300"
                                        placeholder="Country Code"
                                        onChange={(e) => {
                                          setAttendeeDetails((prev) => {
                                            const newAttendeeDetails = [
                                              ...prev,
                                            ];
                                            newAttendeeDetails[index] = {
                                              ...newAttendeeDetails[index],
                                              attendeePhoneCountryCode:
                                                e.target.value,
                                            };
                                            return newAttendeeDetails;
                                          });
                                        }}
                                        value={item.attendeePhoneCountryCode}
                                      >
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+61">+61</option>
                                        <option value="+44">+44</option>
                                      </select>
                                      <input
                                        type="tel"
                                        className="w-full flex px-2 h-9 rounded-md border border-gray-300"
                                        placeholder="Enter your phone number"
                                        onChange={(e) => {
                                          setAttendeeDetails((prev) => {
                                            const newAttendeeDetails = [
                                              ...prev,
                                            ];
                                            newAttendeeDetails[index] = {
                                              ...newAttendeeDetails[index],
                                              attendeePhone: e.target.value,
                                            };
                                            return newAttendeeDetails;
                                          });
                                        }}
                                        value={item.attendeePhone}
                                      />
                                    </HStack>
                                  </VStack>
                                </VStack>
                              </Box>
                            )}
                          </>
                        );
                      })}
                      <Box
                        paddingBlock={"10px"}
                        paddingInline={"15px"}
                        height={"auto"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={"25"}
                      >
                        {/* Previous */}
                        <Button
                          className="w-full h-12 bg-gray-500 rounded-md text-white"
                          onClick={() => setFormStep((prev) => prev - 1)}
                        >
                          Previous step
                        </Button>

                        <Button
                          className="w-full h-12 bg-yellow-500 rounded-md text-white"
                          onClick={() => {
                            let isFormValid = true;
                            attendeeDetails.forEach((item) => {
                              if (
                                !item.attendeeName ||
                                !item.attendeeEmail ||
                                !item.attendeePhone
                              ) {
                                isFormValid = false;
                              }
                            });
                            isFormValid
                              ? setFormStep((prev) => prev + 1)
                              : toast.error(
                                  "Please fill all the attendee details"
                                );
                          }}
                        >
                          Proceed to Checkout
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Step 3 is Order Summary */}
                  {formStep === 3 && (
                    <div>
                      <div className="flex justify-between items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium p-4 leading-6 text-gray-900"
                        >
                          Order Summary
                        </Dialog.Title>
                        <CloseButton />
                      </div>
                      {/* Divider Line  */}
                      <div className="border-b border-gray-200"></div>
                      {/* Selling Fast */}
                      <div className="flex justify-center items-center p-4">
                        <Text className="text-red-500 font-semibold animate-pulse">
                          {`💥Selling Fast🔥${sellingFast}`}
                        </Text>
                      </div>
                      <div className="border-b border-gray-200"></div>
                      {/* eventName and event Date */}
                      <HStack padding={"15px"} justifyContent={"space-between"}>
                        <Text fontSize={"16px"} fontWeight={"600"}>
                          {event.eventName}
                        </Text>
                        <Text>{dateTimeEventData}</Text>
                      </HStack>
                      <div className="border-b border-gray-200"></div>
                      {attendeeDetails?.map((item, index) => {
                        return (
                          <>
                            {item.quantity >= 1 && (
                              <Box
                                gap={"5"}
                                padding={"20"}
                                backgroundColor={"#f1f1f1"}
                                key={index}
                              >
                                <HStack
                                  padding={"15px"}
                                  alignItems={"center"}
                                  height={"50px"}
                                >
                                  <Text fontSize={"16px"} fontWeight={"600"}>
                                    Ticket type: {item.name}
                                  </Text>
                                  <Text>|</Text>
                                  <Text fontSize={"16px"}>
                                    Ticket ID: {item.ticketId}
                                  </Text>
                                  <Text>|</Text>
                                  <Text>Quantity: {item.quantity}</Text>
                                </HStack>
                                <HStack
                                  padding={"15px"}
                                  paddingBlock={"20px"}
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-start"}
                                  height={"auto"}
                                  backgroundColor={"#fff"}
                                  borderTop={"2px solid #3498db"}
                                  flex={"1"}
                                >
                                  <VStack flex={"0.7"} alignItems={"start"}>
                                    <HStack>
                                      <Text paddingInline={"10px"}>Name:</Text>
                                      <Text>{item.attendeeName}</Text>
                                    </HStack>
                                    <HStack>
                                      <Text paddingInline={"10px"}>Email:</Text>
                                      <Text>{item.attendeeEmail}</Text>
                                    </HStack>
                                    <HStack>
                                      <Text paddingInline={"10px"}>Phone:</Text>
                                      <Text>{item.attendeePhone}</Text>
                                    </HStack>
                                  </VStack>
                                  <VStack flex={"0.3"}>
                                    <Box
                                      backgroundColor={"#3498db"}
                                      padding={"8"}
                                      borderRadius={"5px"}
                                    >
                                      <Text
                                        color={"#fff"}
                                        fontSize={"18px"}
                                        fontWeight={"500"}
                                      >
                                        ${item.price}
                                      </Text>
                                    </Box>
                                  </VStack>
                                </HStack>
                              </Box>
                            )}
                          </>
                        );
                      })}
                      <Box
                        padding={"20"}
                        backgroundColor={"#f1f1f1"}
                        marginTop={"20px"}
                        height={"auto"}
                      >
                        <HStack
                          justifyContent={"space-evenly"}
                          alignItems={"center"}
                          gap={"30"}
                        >
                          <Text>Sub Total</Text>
                          <Text>${finalTicketInfo.totalCost}</Text>
                        </HStack>
                        <HStack
                          justifyContent={"space-evenly"}
                          alignItems={"center"}
                          gap={"30"}
                          color={"#3498db"}
                          fontSize={"14px"}
                        >
                          <Text>Fees and Taxes</Text>
                          <Text>$0.00</Text>
                        </HStack>
                        <HStack
                          justifyContent={"space-evenly"}
                          alignItems={"center"}
                          gap={"30"}
                        >
                          <Text fontSize={"18px"} fontWeight={"700"}>
                            Order Total
                          </Text>
                          <Text>${finalTicketInfo.totalCost}</Text>
                        </HStack>
                      </Box>

                      <Box
                        padding={"20"}
                        backgroundColor={"#f1f1f1"}
                        marginTop={"20px"}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          id="terms"
                          name="terms"
                          // value={acceptPrivacyPolicy}
                          // if value is not set then toast "Please accept the Terms of Service and have read the Privacy Policy."
                          value={acceptPrivacyPolicy}
                          onChange={(e) => {
                            setAcceptPrivacyPolicy(e.target.checked);
                          }}
                        />
                        <label htmlFor="terms">
                          I accept the Terms of Service and have read the
                          Privacy Policy.
                        </label>
                      </Box>
                      <Box
                        paddingBlock={"10px"}
                        paddingInline={"15px"}
                        height={"auto"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={"25"}
                      >
                        <Button
                          className="w-full h-12 bg-gray-500 rounded-md text-white"
                          onClick={() => setFormStep((prev) => prev - 1)}
                        >
                          Previous step
                        </Button>
                        <Button
                          className="w-full h-12 bg-green-700 rounded-md text-white"
                          onClick={() => {
                            acceptPrivacyPolicy
                              ? setFormStep((prev) => prev + 1)
                              : toast.error(
                                  "Please accept the Terms of Service and have read the Privacy Policy."
                                );
                          }}
                        >
                          Proceed To Payment Page
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Payment Method + Payment Page */}
                  {formStep === 4 && stripeApikey && (
                    <div>
                      <div className="flex justify-between items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium p-4 leading-6 text-gray-900"
                        >
                          Payment Page
                        </Dialog.Title>

                        {/* Divider Line  */}
                        <div className="border-b border-gray-200"></div>
                        {/* Selling Fast */}
                        <div className="flex justify-center items-center p-4">
                          <Text className="text-red-500 font-semibold animate-pulse">
                            {`💥Selling Fast🔥${sellingFast}`}
                          </Text>
                        </div>
                        <div className="border-b border-gray-200"></div>
                        <CloseButton />
                      </div>
                      <Elements stripe={loadStripe(stripeApikey)}>
                        <Payment
                          formStep={formStep}
                          setFormStep={setFormStep}
                        />
                      </Elements>
                      <Box
                        paddingBlock={"10px"}
                        paddingInline={"15px"}
                        height={"auto"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={"25"}
                      >
                        <Button
                          className="w-full h-12 bg-gray-500 rounded-md text-white"
                          onClick={() => setFormStep((prev) => prev - 1)}
                        >
                          Previous step
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Payment Successful - Order Summary */}
                  {formStep === 5 && (
                    <>
                      <div>
                        <div className="flex justify-between items-center">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium p-4 leading-6 text-gray-900"
                          >
                            Order Summary
                          </Dialog.Title>
                          <CloseButton />
                        </div>
                        {/* Divider Line  */}
                        <div className="border-b border-gray-200"></div>
                      </div>

                      <div className="p-6 h-screen overflow-auto">
                        <div className="flex justify-center items-center">
                          <div className="p-4 w-full max-w-lg">
                            <div className="rounded-lg border bg-white shadow-sm">
                              <div className="flex flex-col items-center space-y-3 p-6 border-b border-gray-200">
                                <CheckIcon className="w-16 h-16 text-green-500" />
                                <h3 className="text-2xl font-semibold">
                                  Payment Successful
                                </h3>
                              </div>
                              <div className="p-6 border-b border-gray-200">
                                <div className="mb-4 border p-4 rounded-md shadow-sm">
                                  <h3 className="font-semibold text-lg">
                                    Event Details
                                  </h3>
                                  <p className="text-gray-600">
                                    Event Name:{" "}
                                    <span className="font-semibold">
                                      {event.eventName}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Date &amp; Time:{" "}
                                    <span className="font-semibold">
                                      {dateTimeEventData}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    Venue:
                                    <span className="font-semibold">
                                      {event.location === "online"
                                        ? "Online"
                                        : `${event.eventLocation.address1} ${event.eventLocation.city}, ${event.eventLocation.state}, ${event.eventLocation.country} ${event.eventLocation.zipCode}`}
                                    </span>
                                  </p>
                                </div>
                                <div className="mb-4 border p-4 rounded-md shadow-sm">
                                  <h3 className="font-semibold text-lg">
                                    Ticket Details
                                  </h3>
                                  {attendeeDetails?.map(
                                    (item, index) =>
                                      item.quantity >= 1 && (
                                        <div
                                          key={index}
                                          className="mb-2 border p-4 rounded-md shadow-sm"
                                        >
                                          <p className="text-gray-600">
                                            Ticket ID:{" "}
                                            <span className="font-semibold">
                                              {item.ticketId}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Ticket Type:{" "}
                                            <span className="font-semibold">
                                              {item.name}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Quantity:{" "}
                                            <span className="font-semibold">
                                              {item.quantity}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Ticket Price:{" "}
                                            <span className="font-semibold">
                                              ${item.price}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Attendee Name:{" "}
                                            <span className="font-semibold">
                                              {item.attendeeName}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Attendee Email:{" "}
                                            <span className="font-semibold">
                                              {item.attendeeEmail}
                                            </span>
                                          </p>
                                          <p className="text-gray-600">
                                            Attendee Phone:{" "}
                                            <span className="font-semibold">
                                              {item.attendeePhoneCountryCode}
                                              {item.attendeePhone}
                                            </span>
                                          </p>
                                        </div>
                                      )
                                  )}
                                  <hr className="my-4" />
                                  <p className="text-gray-600">
                                    Total Price:{" "}
                                    <span className="font-semibold">
                                      ${finalTicketInfo.totalCost}
                                    </span>
                                  </p>
                                </div>
                                {/* Tickets Download */}
                                <div className="text-center mt-6">
                                  <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={handleDownloadTickets}
                                  >
                                    Download Tickets
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* Book Another Tickets or Go Home */}
                            <div className="flex justify-between items-center py-4 gap-4 border-t border-gray-200">
                              <Button
                                className="w-full h-12 bg-green-700 rounded-md text-white"
                                onClick={() => navigate("/")}
                              >
                                Go Home
                              </Button>
                              <Button
                                className="w-full h-12 bg-yellow-500 rounded-md text-white"
                                onClick={() => navigate("/manage/my-tickets")}
                              >
                                View My Tickets
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
