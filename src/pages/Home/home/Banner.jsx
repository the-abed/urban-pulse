import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co.com/G4xKFZ6F/high-angle-shot-bandra-worli-sealink-mumbai-enveloped-with-fog.jpg",
      title: "Welcome to Our City",
      subtitle: "Connecting communities through smarter infrastructure tracking.",
    },
    {
      image: "https://i.ibb.co.com/JF55bWDH/city-park-with-lake.jpg",
      title: "Green & Clean Living",
      subtitle: "Report issues in parks and public spaces to preserve nature.",
    },
    {
      image: "https://i.ibb.co.com/gZ1QTMFK/empty-square-lake-city-park-1.jpg",
      title: "Your Voice Matters",
      subtitle: "Join thousands of citizens making our squares safer every day.",
    },
    {
      image: "https://i.ibb.co.com/d4ztTyd8/pexels-mumtahina-tanni-1080117-3435378.jpg",
      title: "Urban Excellence",
      subtitle: "A modern platform for a modern, high-tech urban landscape.",
    },
    {
      image: "https://i.ibb.co.com/7xh1TgZt/pexels-shahriar-foisal-2158308996-35295079.jpg",
      title: "Priority for You",
      subtitle: "Premium support for critical infrastructure needs.",
    },
  ];

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full "
      >
        {slides.map((slide, index) => (
         <SwiperSlide key={index}>
  <div
    className="relative h-full w-full bg-cover bg-no-repeat flex items-center"
    style={{ 
      backgroundImage: `url(${slide.image})`,
      backgroundPosition: 'center center' // Default for most, but you can customize per slide
    }}
  >
    {/* Modern Gradient Overlay - Adjusted for Mobile */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"></div>

    {/* Content Box */}
    <div className="container mx-auto px-4 md:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Slide up on mobile instead of from the side
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // Reduced padding and width for mobile: p-6 vs p-12
        className="max-w-2xl bg-black/20 backdrop-blur-md p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl"
      >
        <motion.span 
          className="text-secondary font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-sm mb-2 md:mb-4 block"
        >
          UrbanPulse Portal
        </motion.span>
        
        {/* Responsive Text Sizes: text-3xl for mobile, 7xl for desktop */}
        <h1 className="text-3xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
          {slide.title.split(" ").map((word, i) => (
            <span key={i} className={i === slide.title.split(" ").length - 1 ? "text-primary" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>

        <p className="text-gray-200 text-sm md:text-xl mb-6 md:mb-8 leading-relaxed max-w-lg">
          {slide.subtitle}
        </p>

        {/* Smaller buttons on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link to="/reportIssue" className="w-full sm:w-auto">
            <button className="btn btn-primary btn-md md:btn-lg rounded-full px-6 md:px-8 w-full shadow-xl">
              Report an Issue
            </button>
          </Link>

          <Link to="/issues" className="w-full sm:w-auto">
            <button className="btn btn-outline btn-secondary btn-md md:btn-lg rounded-full px-6 md:px-8 w-full text-white">
              View Reports
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
</SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper pagination/navigation to match your theme */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(5px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #ea6540 !important; /* Updated to your Primary Orange */
          opacity: 1;
          width: 30px;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Banner;