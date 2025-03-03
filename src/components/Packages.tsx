"use client";

import { packages } from "@/data/packages";
import styles from "./Packages.module.css";
import EnquiryButton from "./EnquiryButton";
import EnquiryPopup from "./EnquiryPopup";
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Packages = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnquiryClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + packages.length) % packages.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.packagesContainer}>
      <button className={styles.arrowButton} onClick={handlePrevClick}>
        <FaArrowLeft size={24} />
      </button>
      <AnimatePresence>
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            className={styles.packageCard}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <h2 className={styles.packageTitle}>{pkg.title}</h2>
            <p className={styles.packageDescription}>{pkg.description}</p>
            <p className={styles.packageDetails}>
              {pkg.nights} Nights / {pkg.days} Days
            </p>
            <p className={styles.packageDetails}>Min Pax: {pkg.minPax}</p>
            <p className={styles.priceContainer}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.strike}>₹{pkg.normalPrice}</span>
              <span className={styles.discountedPrice}> ₹{pkg.discountPrice}</span>
              <span className={styles.perPerson}> Per Person</span>
            </p>
            <ul className={styles.packageInclusions}>
              {pkg.inclusions.map((inclusion, index) => (
                <li key={index}>{inclusion}</li>
              ))}
            </ul>
            <div className={styles.packageButtons}>
              <EnquiryButton onClick={handleEnquiryClick} text="Enquire Now" />
              <div className={styles.contactContainer}>
                <a
                  href="https://wa.me/919997365898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaWhatsapp className={styles.whatsappIcon} size={20} />
                  WhatsApp
                </a>
                <a
                  href="mailto:info@makemytravls.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaEnvelope className={styles.emailIcon} size={20} />
                  Email
                </a>
                <a href="tel:+919997365898" className={styles.contactLink}>
                  <FaPhone className={styles.callIcon} size={20} />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button className={styles.arrowButton} onClick={handleNextClick}>
        <FaArrowRight size={24} />
      </button>
      <EnquiryPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default Packages;