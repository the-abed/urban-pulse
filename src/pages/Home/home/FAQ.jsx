import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I report an urban issue?",
    answer: "Simply log in as a Citizen, click on the 'Report Issue' button in the banner or navigation, fill in the details including location and a photo, and submit. Our staff will review it shortly."
  },
  {
    question: "What does 'Boosting' an issue do?",
    answer: "Boosting uses Stripe to pay a small fee that highlights your issue to staff members. Boosted issues appear at the top of the staff dashboard and are marked with a fire icon for priority resolution."
  },
  {
    question: "How can I track the status of my report?",
    answer: "You can visit your Profile page to see a list of all your submitted reports. Each report will show a status badge: Pending, In Progress, or Resolved."
  },
  {
    question: "Who handles the reported issues?",
    answer: "Reports are handled by our dedicated Staff members. They update the status as they work on the problem. Admins oversee the entire platform and manage user roles."
  },
  {
    question: "Is my personal data secure?",
    answer: "Yes. We use Firebase Authentication for secure login and encrypted database storage for your information. We never share your email with third parties."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`mb-4 overflow-hidden border transition-all duration-300 rounded-2xl ${
      isOpen ? "bg-white/10 border-primary/30 shadow-lg shadow-primary/5" : "bg-base-200/50 border-white/10"
    } backdrop-blur-md`}>
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center transition-colors hover:text-primary"
        onClick={onClick}
      >
        <span className="text-sm md:text-lg font-bold flex items-center gap-3">
          <HelpCircle size={20} className={isOpen ? "text-primary" : "text-gray-400"} />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mb-6 px-4 bg-base-100 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-xs"
          >
            Support Center
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black mt-2"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;