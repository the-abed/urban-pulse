import React from 'react';
import { motion } from 'framer-motion';
import { FaCity, FaUsers, FaChartBar } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-20 text-primary-content">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6"
          >
            Empowering <span className="text-secondary italic">Cities</span> Through Tech
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We bridge the gap between citizens and municipal authorities to ensure every street, 
            light, and pipe is maintained for a better living experience.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-secondary pl-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Municipal services often suffer from delayed responses due to a lack of centralized tracking. 
              Our platform was born out of the need for **transparency** and **accountability** in public 
              infrastructure maintenance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By allowing citizens to act as the "eyes and ears" of the city, we help government staff 
              prioritize tasks, reduce response times, and allocate resources efficiently based on real data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card bg-base-200 p-6 text-center hover:shadow-xl transition-shadow">
               <FaCity className="text-4xl text-primary mx-auto mb-4" />
               <h4 className="font-bold">Better Living</h4>
            </div>
            <div className="card bg-base-200 p-6 text-center hover:shadow-xl transition-shadow">
               <FaUsers className="text-4xl text-secondary mx-auto mb-4" />
               <h4 className="font-bold">Active Community</h4>
            </div>
            <div className="card bg-base-200 p-6 text-center hover:shadow-xl transition-shadow sm:col-span-2">
               <FaChartBar className="text-4xl text-primary mx-auto mb-4" />
               <h4 className="font-bold">Data-Driven Decisions</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;