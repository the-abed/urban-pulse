import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSearchParams, Link } from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable"; // 1. Change this import
import { FaCheckCircle, FaFileDownload, FaHome } from "react-icons/fa";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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
            ...res.data,
          });
        }
        console.log(...res.data);
      })
      .catch((err) => console.error("Payment Error:", err))
      .finally(() => setLoading(false));
  }, [sessionId, axiosSecure]);

 const generateInvoice = () => {
  if (!paymentInfo) return;
  const doc = new jsPDF();

  // Header 4242
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229);
  doc.text("INVOICE", 105, 20, { align: "center" });

  // Body Text
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 35);
  doc.text(`Transaction ID: ${paymentInfo.transactionId}`, 14, 42);
  doc.text(`Bill To: ${paymentInfo.reporterEmail}`, 14, 49);

  // Table
  autoTable(doc, {
    startY: 60,
    head: [["Description", "Issue Name", "Amount"]],
    body: [
      [
        "Priority Boost Service",
        paymentInfo.issueName || "Service Upgrade",
        `$${(paymentInfo.amount / 100).toFixed(2)}`
      ],
    ],
    headStyles: { fillColor: [79, 70, 229] },
  });

  const finalY = doc.lastAutoTable.finalY;
  doc.setFontSize(12);
  doc.text(`Total Amount Paid: $${(paymentInfo.amount / 100).toFixed(2)} || "100"`, 196, finalY + 15, { align: "right" });

  doc.save(`Invoice_${paymentInfo.trackingId}.pdf`);
};

  if (loading)
    return (
      <div className="p-20 text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body items-center text-center">
          <FaCheckCircle className="text-success text-6xl mb-4 animate-bounce" />
          <h2 className="card-title text-3xl font-bold text-success">
            Payment Successful!
          </h2>
          <p className="text-base-content/70">
            Your issue has been boosted successfully.
          </p>

          <div className="bg-base-200 w-full p-4 rounded-xl my-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold uppercase opacity-50">
                Transaction ID
              </span>
              <span className="font-mono">
                {paymentInfo?.transactionId?.slice(-10)}...
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold uppercase opacity-50">
                Tracking ID
              </span>
              <span className="font-mono">{paymentInfo?.trackingId}</span>
            </div>
          </div>

          <div className="card-actions w-full flex-col gap-3">
            <button
              onClick={generateInvoice}
              className="btn btn-primary w-full gap-2 shadow-lg"
            >
              <FaFileDownload /> Download Invoice (PDF)
            </button>
            <Link
              to="/issues"
              className="btn btn-outline w-full gap-2"
            >
              <FaHome /> Back to My Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
