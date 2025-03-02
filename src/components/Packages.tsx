"use client";

import { packages } from "@/data/packages";
import styles from "./Packages.module.css";
import EnquiryButton from "./EnquiryButton";
import EnquiryPopup from "./EnquiryPopup";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";

const Packages = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleEnquiryClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className={styles.packagesContainer}>
      {packages.map((pkg) => (
        <div key={pkg.title} className={styles.packageCard}>
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
        </div>
      ))}
      <EnquiryPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default Packages;
