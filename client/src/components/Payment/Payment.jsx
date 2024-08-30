import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { booking } from "../../redux/actions/bookingAction";

const Payment = ({ setFormStep }) => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  const [cardName, setCardName] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    tickets: orderData?.tickets,
    totalPrice: orderData?.totalPrice,
    event: orderData?.event,
    user: orderData?.user,
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
    description: "Payment for Tickets",
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardName,
          },
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      }
      if (result.paymentIntent.status === "succeeded") {
        console.log("successfull payment");
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "card",
        };
        order.event.ticketsBooked += order.tickets.length;
        dispatch(
          booking(
            order.tickets,
            order.event,
            order.user,
            order.totalPrice,
            result.paymentIntent.id
          )
        );
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log("order.event.ticketsBooked", order.event.ticketsBooked);
        const { data } = await axios.put(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events/booking-update/${
            order.event._id
          }`,
          { totalTicketsBooked: order.event.ticketsBooked },
          config
        );
        if (data.success) {
          console.log("Tickets Booked Updated in event");
          console.log("New Updated Event data", data.data);
        } else {
          console.log("Error in updating ticketsBooked in event");
        }
        toast.success("Payment Successfull & Booking Confirmed!");
        setFormStep((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* select buttons */}
            <div>
              {/* pay with card */}
              {/* {select === 1 ? ( */}
              <div className="w-full flex border-b">
                <form className="w-full" onSubmit={paymentHandler}>
                  <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                      <label className="block pb-2">Name On Card</label>
                      <input
                        required
                        placeholder="Name On Card"
                        className={`${styles.input} !w-[95%] text-[#444]`}
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className="block pb-2">Expiry</label>
                      <CardExpiryElement
                        className={`${styles.input}`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                      <label className="block pb-2">Card Number</label>
                      <CardNumberElement
                        className={`${styles.input} !h-[35px] !w-[95%]`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className="block pb-2">CVV</label>
                      <CardCvcElement
                        className={`${styles.input} !h-[35px]`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                  />
                </form>
              </div>
              {/* ) : null} */}
            </div>

            <br />
            {/* paypal payment */}
          </div>
        </div>
        {/* <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div> */}
      </div>
    </div>
  );
};

// const CartData = ({ orderData }) => {
//   const shipping = orderData?.shipping?.toFixed(2);
//   return (
//     <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
//         <h5 className="text-[18px] font-[600]">₹{orderData?.subTotalPrice}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
//         <h5 className="text-[18px] font-[600]">₹{shipping}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between border-b pb-3">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
//         <h5 className="text-[18px] font-[600]">
//           {orderData?.discountPrice ? "₹" + orderData.discountPrice : "-"}
//         </h5>
//       </div>
//       <h5 className="text-[18px] font-[600] text-end pt-3">
//         ₹{orderData?.totalPrice}
//       </h5>
//       <br />
//     </div>
//   );
// };

export default Payment;
