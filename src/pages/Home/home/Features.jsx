import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaChartLine, 
  FaUserFriends, 
  FaMobileAlt, 
  FaBolt 
} from 'react-icons/fa';

const features = [
  {
    title: "Instant Reporting",
    description: "Report community issues in seconds with our optimized submission flow and real-time tracking.",
    icon: <FaBolt className="text-yellow-500" />,
    bgColor: "bg-yellow-50",
  },
  {
    title: "Priority Boosting",
    description: "Need urgent attention? Use our secure Stripe-powered boost feature to move your issue to the top.",
    icon: <FaRocket className="text-purple-500" />,
    bgColor: "bg-purple-50",
  },
  {
    title: "Secure Verification",
    description: "Advanced Firebase authentication ensures that every report comes from a verified community member.",
    icon: <FaShieldAlt className="text-blue-500" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Real-time Analytics",
    description: "Visualize community progress through elegant charts and data-driven dashboards for citizens and staff.",
    icon: <FaChartLine className="text-green-500" />,
    bgColor: "bg-green-50",
  },
  {
    title: "Staff Management",
    description: "Dedicated workflows for staff to accept, manage, and resolve issues efficiently with status updates.",
    icon: <FaUserFriends className="text-indigo-500" />,
    bgColor: "bg-indigo-50",
  },
  {
    title: "Mobile Optimized",
    description: "Access the portal on the go. Our responsive design ensures a seamless experience on any device.",
    icon: <FaMobileAlt className="text-pink-500" />,
    bgColor: "bg-pink-50",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-base-200 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-3"
          >
            Platform Features
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Everything you need to <span className="text-indigo-600">improve</span> your city.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Our platform bridges the gap between citizens and authorities through transparency, 
            efficiency, and modern technology.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;