import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation"; // Keep using redirect
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("Hello world");
  console.log(data._id, "Data identifi");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Something went wrong");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Order is only created if payment is successful
      const response = await createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });

      if ("error" in response) {
        const responseData = response as any;
        setMessage(responseData.error.data?.message || "Order creation failed");
        setIsLoading(false);
      } else {
        // If order creation is successful, redirect to course access
        setIsLoading(false);
        socketId.emit("notification", {
          title: "New Order ",
          messaeg: `You have a new order from ${data.course.name}`,
          userId: user._id,
        });
        redirect(`/course-access/${data._id}`);
      }
    }
  };

  // Handle error from createOrder mutation
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 h-[35px]`}>
          {isLoading ? "Paying..." : "Pay Now"}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
