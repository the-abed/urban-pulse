import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      {/* Animated Illustration Container */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative mb-8"
      >
        <h1 className="text-[12rem] md:text-[15rem] font-black text-primary/10 leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-8xl md:text-9xl">🚧</span>
        </div>
      </motion.div>

      {/* Funny Message */}
      <div className="max-w-md">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Whoops! You're off the map.
        </h2>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          This page is like a pothole in our database—it shouldn't be here, 
          but somehow you found it! Even our best engineers couldn't track this one down.
        </p>

        {/* Back to Home Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg rounded-full px-10 shadow-xl gap-2 text-lg"
          >
            <Home size={20} />
            Take Me Home
          </motion.button>
        </Link>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default ErrorPage;