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
    icon: <FaBolt />,
    // Using a gradient version of your theme colors
    gradient: "from-orange-400 to-primary", 
    shadow: "shadow-orange-200",
  },
  {
    title: "Priority Boosting",
    description: "Need urgent attention? Use our secure Stripe-powered boost feature to move your issue to the top.",
    icon: <FaRocket />,
    gradient: "from-secondary to-teal-600",
    shadow: "shadow-teal-200",
  },
  {
    title: "Secure Verification",
    description: "Advanced Firebase authentication ensures that every report comes from a verified community member.",
    icon: <FaShieldAlt />,
    gradient: "from-blue-500 to-info",
    shadow: "shadow-blue-200",
  },
  {
    title: "Real-time Analytics",
    description: "Visualize community progress through elegant charts and data-driven dashboards for citizens and staff.",
    icon: <FaChartLine />,
    gradient: "from-emerald-500 to-success",
    shadow: "shadow-emerald-200",
  },
  {
    title: "Staff Management",
    description: "Dedicated workflows for staff to accept, manage, and resolve issues efficiently with status updates.",
    icon: <FaUserFriends />,
    gradient: "from-indigo-500 to-accent",
    shadow: "shadow-indigo-200",
  },
  {
    title: "Mobile Optimized",
    description: "Access the portal on the go. Our responsive design ensures a seamless experience on any device.",
    icon: <FaMobileAlt />,
    gradient: "from-rose-400 to-error",
    shadow: "shadow-rose-200",
  },
];

const Features = () => {
  return (
    <section className="py-18 relative ">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-xs">
              Platform Power
            </span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tight"
          >
            Empowering Your <span className="text-primary italic">Urban</span> Journey.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-base-content/70 leading-relaxed"
          >
            Bridging the gap between citizens and authorities through transparency, 
            efficiency, and modern technology.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative p-8 rounded-[2.5rem] bg-base-100 border border-base-300 shadow-xl shadow-base-300/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              {/* Icon Container with Gradient */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-lg ${feature.shadow} group-hover:rotate-6 transition-all duration-300`}>
                {feature.icon}
              </div>

              <h4 className="text-2xl font-bold text-base-content mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              
              <p className="text-base-content/60 leading-relaxed font-medium">
                {feature.description}
              </p>

              {/* Decorative Accent */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;