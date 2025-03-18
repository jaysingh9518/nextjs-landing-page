"use client";

import { packages } from "@/data/packages";
import Image from "next/image";
import EnquiryButton from "./EnquiryButton";
import EnquiryPopup from "./EnquiryPopup";
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Packages = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllInclusions, setShowAllInclusions] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleEnquiryClick = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packages.length - slidesToShow : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= packages.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 overflow-hidden w-full">
      <button
        className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black hover:text-red-500 bg-white p-2 rounded-full shadow-lg z-10"
        onClick={handlePrevClick}
      >
        <FaArrowLeft size={24} />
      </button>

      <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        <AnimatePresence initial={false} mode="wait">
          {packages
            .concat(packages) // Ensures smooth looping by duplicating the list
            .slice(currentIndex, currentIndex + slidesToShow)
            .map((pkg) => (
              <motion.div
              key={pkg.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg w-full text-center transition-all transform hover:scale-102 hover:shadow-xl"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={pkg.image || "/api/placeholder/400/320"} 
                  alt={pkg.title} 
                  width={100}
                  height={100} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 font-bold rounded-bl-lg">
                  SAVE NOW
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex justify-center gap-3">
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                      {pkg.nights} Nights
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                      {pkg.days} Days
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                      Min: {pkg.minPax}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {showFullTitle ? pkg.title : <span className="line-clamp-1">{pkg.title}</span>}
                </h2>
                {pkg.title.length > 30 && (
                  <button
                    className="text-blue-500 text-xs mb-2"
                    onClick={() => setShowFullTitle(!showFullTitle)}
                  >
                    {showFullTitle ? "Show Less" : "Show More"}
                  </button>
                )}

                {/* Description */}
                <p className={`text-gray-600 text-sm ${showFullDesc ? "" : "line-clamp-2"} mb-2`}>
                  {pkg.description}
                </p>
                {pkg.description.length > 100 && (
                  <button
                    className="text-blue-500 text-xs mb-3"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? "Show Less" : "Show More"}
                  </button>
                )}

                {/* Price */}
                <div className="flex justify-center items-center gap-2 mb-3">
                  <span className="line-through text-gray-400">₹{pkg.normalPrice}</span>
                  <span className="text-red-600 text-xl font-bold">₹{pkg.discountPrice}</span>
                  <span className="text-gray-500 text-xs">Per Person</span>
                </div>

                {/* Inclusions */}
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <h3 className="font-semibold text-gray-700 text-sm mb-2">Inclusions</h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {(showAllInclusions ? pkg.inclusions : pkg.inclusions.slice(0, 2)).map((inclusion, index) => (
                      <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">
                        {inclusion}
                      </span>
                    ))}
                    {pkg.inclusions.length > 2 && !showAllInclusions && (
                      <span 
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full cursor-pointer"
                        onClick={() => setShowAllInclusions(true)}
                      >
                        +{pkg.inclusions.length - 2} more
                      </span>
                    )}
                  </div>
                  {pkg.inclusions.length > 2 && showAllInclusions && (
                    <button
                      className="text-blue-500 text-xs mt-2"
                      onClick={() => setShowAllInclusions(false)}
                    >
                      Show Less
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <EnquiryButton 
                  onClick={handleEnquiryClick} 
                  text="Enquire Now"
                />
                
                <div className="flex justify-center items-center gap-1 mt-4">
                  <a
                    href="https://wa.me/919997365898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-300"
                  >
                    <FaWhatsapp size={15} />
                    <span className="font-regular">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@makemytravls.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-300"
                  >
                    <FaEnvelope size={15} />
                    <span className="font-regular">Email</span>
                  </a>
                  <a
                    href="tel:+919997365898"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300"
                  >
                    <FaPhone className="transform rotate-90" size={15} />
                    <span className="font-regular">Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <button
        className="absolute top-1/2 right-1 transform -translate-y-1/2 text-black hover:text-red-500 bg-white p-2 rounded-full shadow-lg z-10"
        onClick={handleNextClick}
      >
        <FaArrowRight size={24} />
      </button>

      <div className="flex gap-2 mt-4">
        {packages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-red-500 w-4 h-4" : "bg-gray-400"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <EnquiryPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default Packages;