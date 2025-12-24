import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaUserShield, FaTools, FaCheckDouble } from 'react-icons/fa';

const steps = [
  {
    title: "Report Issue",
    desc: "Snap a photo and pin the location of the infrastructure problem.",
    icon: <FaEdit />,
    gradient: "from-orange-400 to-primary",
    glow: "group-hover:shadow-primary/40"
  },
  {
    title: "Admin Review",
    desc: "Our team verifies the report and assigns it to the right department.",
    icon: <FaUserShield />,
    gradient: "from-teal-400 to-secondary",
    glow: "group-hover:shadow-secondary/40"
  },
  {
    title: "Staff Action",
    desc: "Dedicated staff members head to the site to begin repairs.",
    icon: <FaTools />,
    gradient: "from-orange-400 to-primary",
    glow: "group-hover:shadow-primary/40"
  },
  {
    title: "Resolved",
    desc: "Once fixed, the status is updated and the case is closed.",
    icon: <FaCheckDouble />,
    gradient: "from-teal-400 to-secondary",
    glow: "group-hover:shadow-secondary/40"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-base-100 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            How It <span className="text-primary italic">Works</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-base-content/60 max-w-xl mx-auto font-medium">
            A seamless process connecting citizens directly to city solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-base-300 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group z-10"
            >
              {/* Icon Circle */}
              <div className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-base-100 border-2 border-base-300 flex items-center justify-center font-bold text-xs text-base-content group-hover:border-primary group-hover:text-primary transition-colors z-20">
                  0{index + 1}
                </div>
                
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} text-white text-4xl flex items-center justify-center mb-8 shadow-xl ${step.glow} group-hover:rotate-12 transition-all duration-500`}>
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              
              <p className="text-base-content/60 text-sm leading-relaxed font-medium px-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;