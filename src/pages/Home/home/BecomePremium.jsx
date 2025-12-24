// ✅ Correct Way: Split into two imports
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from here
import { Elements } from "@stripe/react-stripe-js"; // Import Elements from here
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const BecomePremium = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-14">
      <div className=" w-full grid md:grid-cols-2 gap-10">
        {/* Benefit Card */}
        <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="badge badge-secondary font-bold px-4 py-3 mb-4">CITY PROTECTOR</span>
            <h2 className="text-4xl font-black mb-6">Premium Benefits</h2>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">✅ Priority Issue Resolution</li>
              <li className="flex items-center gap-2">✅ Golden Profile Badge</li>
              <li className="flex items-center gap-2">✅ Exclusive Community Reports</li>
              <li className="flex items-center gap-2">✅ Direct Support Access</li>
            </ul>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        {/* Payment Card */}
        <Elements stripe={stripePromise}>
          <CheckoutForm price={19.99} />
        </Elements>
      </div>
    </div>
  );
};

export default BecomePremium;