import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay , EffectCoverflow,} from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      name: "Jhankar Mahbub",
      role: "Citizen",
      image: "https://i.ibb.co.com/Q3Z8gH2D/467444869-10160351769061891-3964624160658220491-n.jpg/150?u=anika",
      comment: "The speed at which the city authorities fixed the broken street light after my report was amazing. This portal actually works!",
      rating: 5,
    },
    {
      name: "Abdur Rahman",
      role: "Urban Planner",
      image: "https://i.ibb.co.com/mVmrZL0d/538573755-781690674402376-3574612315952197080-n.jpg/150?u=tanvir",
      comment: "UrbanPulse provides the data transparency we've needed for years. Tracking infrastructure issues is now a breeze.",
      rating: 5,
    },
    {
      name: "Khadija",
      role: "Urban Planner",
      image: "https://i.pravatar.cc/150?u=tanvir",
      comment: "UrbanPulse provides the data transparency we've needed for years. Tracking infrastructure issues is now a breeze.",
      rating: 5,
    },
    {
      name: "Sara Islam",
      role: "Daily Commuter",
      image: "https://i.pravatar.cc/150?u=sara",
      comment: "I boosted my report about a dangerous pothole, and it was resolved within 48 hours. Worth every penny for safety.",
      rating: 4,
    },
    {
      name: "Rifat Sattar",
      role: "Daily Commuter",
      image: "https://i.ibb.co.com/MjCgzXB/487988885-2036952423383317-2489509935158072188-n.jpg/150?u=sara",
      comment: "I boosted my report about a dangerous pothole, and it was resolved within 48 hours. Worth every penny for safety.",
      rating: 4,
    },
  ];

 return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm"
          >
            Community Voices
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2">
            What Citizens Are Saying
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          loop={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          // RESPONSIVE SLIDES PER VIEW
          slidesPerView={'auto'} 
          coverflowEffect={{
            rotate: 0,         // Reduced rotation for a cleaner look
            stretch: 0,        // Removed stretch to prevent card distortion
            depth: 100,        // Lower depth for mobile friendliness
            modifier: 2.5,     // Increases the gap between the center and side slides
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="pb-16 testimonial-swiper pt-10"
        >
          {reviews.map((rev, index) => (
            <SwiperSlide 
              key={index} 
              // CRITICAL: Control the card width here
              className="max-w-[320px] md:max-w-[450px] h-full"
            >
              <motion.div 
                className="h-full bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                      />
                    ))}
                  </div>
                  
                  <Quote className="text-primary/10 mb-3" size={32} />
                  
                  {/* line-clamp prevents cards from growing too tall if text is long */}
                  <p className="text-gray-600 italic leading-relaxed text-sm md:text-base mb-6 line-clamp-4 md:line-clamp-none">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-5 mt-auto">
                  <img 
                    src={rev.image} 
                    alt={rev.name} 
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-primary/5"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
    /* Adjusting the 3D perspective for smoother mobile viewing */
    .testimonial-swiper {
        perspective: 1000px;
        overflow: visible !important;
    }
    .testimonial-swiper .swiper-pagination-bullet-active {
        width: 30px !important;
        background: #ea6540 !important; /* Matches your Warm Orange theme */
        border-radius: 10px !important;
    }
    /* Ensure the slides don't overlap too much on small screens */
    @media (max-width: 768px) {
        .swiper-slide {
            opacity: 0.4;
            transition: opacity 0.3s;
        }
        .swiper-slide-active {
            opacity: 1;
        }
    }
`}} />
    </section>
  );
};

export default Testimonials;