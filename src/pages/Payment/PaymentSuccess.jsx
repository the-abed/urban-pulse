import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  


  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data?.success) {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        }
      })
      .catch((err) => {
        console.error(
          "Payment Error:",
          err.response?.data?.message || err.message
        );
      });
  }, [sessionId, axiosSecure]);



  return (
    <div>
      <h2 className="text-3xl">Payment Success</h2>
      <p>Transaction ID: {paymentInfo?.transactionId}</p>
      <p>Tracking ID: {paymentInfo?.trackingId}</p>

    </div>
  );
};

export default PaymentSuccess;
