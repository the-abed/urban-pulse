import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaUserShield, FaTools, FaCheckDouble } from 'react-icons/fa';

const steps = [
  {
    title: "Report Issue",
    desc: "Snap a photo and pin the location of the infrastructure problem.",
    icon: <FaEdit />,
    color: "bg-primary"
  },
  {
    title: "Admin Review",
    desc: "Our team verifies the report and assigns it to the right department.",
    icon: <FaUserShield />,
    color: "bg-secondary"
  },
  {
    title: "Staff Action",
    desc: "Dedicated staff members head to the site to begin repairs.",
    icon: <FaTools />,
    color: "bg-primary"
  },
  {
    title: "Resolved",
    desc: "Once fixed, the status is updated and the case is closed.",
    icon: <FaCheckDouble />,
    color: "bg-secondary"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It <span className="text-primary">Works</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-full ${step.color} text-white text-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;