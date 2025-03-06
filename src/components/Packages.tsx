"use client";

import { packages } from "@/data/packages";
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
    <div className="relative flex flex-col items-center justify-center p-5 overflow-hidden w-full">
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
                className="bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-30 rounded-lg p-5 w-full text-center custom-box-shadow transition-transform transform hover:scale-105"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                {/* Title */}
                <h2 className="text-xl font-bold mb-3">
                  {showFullTitle ? pkg.title : <span className="truncate">{pkg.title}</span>}
                </h2>
                {pkg.title.length > 30 && (
                  <button
                    className="text-blue-500 text-sm underline"
                    onClick={() => setShowFullTitle(!showFullTitle)}
                  >
                    {showFullTitle ? "View Less" : "View More"}
                  </button>
                )}

                {/* Description */}
                <p className={`text-base ${showFullDesc ? "" : "line-clamp-2"}`}>
                  {pkg.description}
                </p>
                {pkg.description.length > 100 && (
                  <button
                    className="text-blue-500 text-sm underline mb-3"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? "View Less" : "View More"}
                  </button>
                )}
                <p className="text-sm font-bold mb-1">
                  {pkg.nights} Nights / {pkg.days} Days
                </p>
                <p className="text-sm font-bold mb-1">Min Pax: {pkg.minPax}</p>
                <p className="flex items-center justify-center gap-2 text-base mt-2">
                  <span className="font-bold">Price:</span>
                  <span className="line-through text-red-600">₹{pkg.normalPrice}</span>
                  <span className="text-green-600 text-lg font-bold">₹{pkg.discountPrice}</span>
                  <span className="text-gray-600 text-sm">Per Person</span>
                </p>
                {/* Inclusions */}
                <ul className="list-none p-2 bg-white bg-opacity-20 rounded-lg flex flex-wrap gap-2 justify-center mt-3">
                  <li className="font-bold w-full text-center">Inclusions:</li>
                  {(showAllInclusions ? pkg.inclusions : pkg.inclusions.slice(0, 2)).map((inclusion, index) => (
                    <li key={index} className="text-sm bg-gray-200 p-2 rounded-full">{inclusion}</li>
                  ))}
                  {pkg.inclusions.length > 2 && !showAllInclusions && (
                    <li className="text-sm bg-gray-200 p-2 rounded-full">
                      + {pkg.inclusions.length - 2} more
                    </li>
                  )}
                </ul>
                {pkg.inclusions.length > 2 && (
                  <button
                    className="text-blue-500 text-sm underline"
                    onClick={() => setShowAllInclusions(!showAllInclusions)}
                  >
                    {showAllInclusions ? "View Less" : "View More"}
                  </button>
                )}
                <div className="flex flex-col gap-3 mt-4">
                  <EnquiryButton onClick={handleEnquiryClick} text="Enquire Now" />
                  <div className="flex justify-center items-center mt-2 gap-1">
                    <a
                      href="https://wa.me/919997365898"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-full shadow-md text-lg font-bold hover:scale-105 transition-transform"
                    >
                      <FaWhatsapp className="text-green-500" size={20} />
                      WhatsApp
                    </a>
                    <a
                      href="mailto:info@makemytravls.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-full shadow-md text-lg font-bold hover:scale-105 transition-transform"
                    >
                      <FaEnvelope className="text-red-500" size={20} />
                      Email
                    </a>
                    <a
                      href="tel:+919997365898"
                      className="flex items-center gap-2 p-2 rounded-full shadow-md text-lg font-bold hover:scale-105 transition-transform"
                    >
                      <FaPhone className="text-blue-500 transform scale-x-[-1]" size={20} />
                      Call
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
