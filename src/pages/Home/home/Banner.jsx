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
        className="h-full w-full rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Modern Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              {/* Content Box */}
              <div className="container mx-auto px-6 md:px-12 relative z-10 ">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl"
                >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                  >
                    UrbanPulse Portal
                  </motion.span>
                  
                  <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i} className={i === slide.title.split(" ").length - 1 ? "text-primary" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h1>

                  <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/reportIssue">
                    
                    <button className="btn btn-primary btn-lg rounded-full px-8 shadow-xl hover:scale-105 transition-transform">
                      Report an Issue
                    </button>
                    </Link>

                    <Link to="/issues">

                    <button className="btn btn-outline btn-secondary btn-lg rounded-full px-8 text-white hover:bg-secondary">
                      View All Reports
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
      <style jsx global>{`
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
          background: #4F46E5 !important; /* Your Primary Color */
          opacity: 1;
          width: 30px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Banner;