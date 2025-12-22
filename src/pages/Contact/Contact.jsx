import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/mdabed.azim",
      color: "hover:text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/mohammad-abed-azim/",
      color: "hover:text-blue-700",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com/the-abed",
      color: "hover:text-gray-900",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Get in <span className="text-primary underline decoration-secondary">Touch</span>
          </motion.h1>
          <p className="text-gray-500 max-w-xl mx-auto italic">
            Have a question about a report or need assistance? Our team is here to help you improve our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden border border-base-200">
          
          {/* Left Side: Contact Info & Socials */}
          <div className="lg:col-span-5 bg-primary p-10 text-primary-content flex flex-col justify-between relative overflow-hidden">
            {/* Abstract background circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl group-hover:bg-secondary transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Email us at</p>
                    <p className="font-semibold">abedpersonal2024@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl group-hover:bg-secondary transition-colors">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Call us</p>
                    <p className="font-semibold">+880 1798741382</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl group-hover:bg-secondary transition-colors">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Our Office</p>
                    <p className="font-semibold">Chattogram, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="relative z-10 mt-12 lg:mt-0">
              <p className="text-sm uppercase tracking-widest font-bold mb-6 opacity-70">Follow Our Developer</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center text-2xl hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-2"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 p-10">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">First Name</span>
                </label>
                <input type="text" placeholder="Abed" className="input input-bordered w-full rounded-xl focus:border-primary" />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Last Name</span>
                </label>
                <input type="text" placeholder="Azim" className="input input-bordered w-full rounded-xl focus:border-primary" />
              </div>
              <div className="form-control w-full md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Email Address</span>
                </label>
                <input type="email" placeholder="example@gmail.com" className="input input-bordered w-full rounded-xl focus:border-primary" />
              </div>
              <div className="form-control w-full md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Subject</span>
                </label>
                <select className="select select-bordered w-full rounded-xl focus:border-primary">
                  <option disabled selected>Select an option</option>
                  <option>Issue Update Query</option>
                  <option>Premium Support</option>
                  <option>Feedback</option>
                  <option>Technical Error</option>
                </select>
              </div>
              <div className="form-control w-full md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32 rounded-xl focus:border-primary" placeholder="How can we help you?"></textarea>
              </div>
              
              <div className="md:col-span-2 mt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary w-full md:w-auto px-12 rounded-full shadow-lg shadow-primary/30"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;