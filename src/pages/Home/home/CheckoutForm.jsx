import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [price, axiosSecure]);

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    // Start loading state (highly recommended to prevent double-clicking)
    setIsSubmitting(true); 
    const toastId = toast.loading("Processing payment...");

    // 1. Confirm the Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'unknown@example.com',
                name: user?.displayName || 'Anonymous'
            },
        },
    });

    // 2. Handle Stripe Errors
    if (confirmError) {
        toast.error(confirmError.message, { id: toastId });
        setIsSubmitting(false);
        return;
    }

    // 3. Handle Success
    if (paymentIntent.status === "succeeded") {
        try {
            // Update Database
            const res = await axiosSecure.patch(`/users/premium/${user?.email}`);
            
            if (res.data.modifiedCount > 0) {
                // ✅ SUCCESS TOAST
                toast.success("Transaction Complete! You are now a Premium Citizen.", { 
                    id: toastId,
                    duration: 5000 
                });

                // ✅ CLEAR STRIPE FORM
                card.clear(); 

                // Optional: Clear other local form states if you have them
                // reset(); 
            }
        } catch (err) {
            console.error("Database update failed:", err);
            toast.error("Payment received, but failed to update status. Please contact support.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    }
};

  return (
    
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
      <h3 className="text-2xl font-black mb-6">Upgrade to Premium</h3>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="p-4 border rounded-xl mb-6 bg-gray-50">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button 
        type="submit" 
        disabled={!stripe || !clientSecret}
        className="btn btn-primary w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20"
      >
        Pay ${price} Now
      </button>
    </form>
  );
};

export default CheckoutForm;