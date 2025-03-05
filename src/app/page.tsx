"use client"

import { useState, useEffect } from "react";
import '../i18n';
import HeroCards from "@/components/HeroCards";
import Testimonials from "@/components/Testimonials";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import ContactUs from "@/components/ContactUs";
import EnquiryPopup from "@/components/EnquiryPopup";

const HomePage: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    // Store the current timestamp in localStorage when the popup is closed
    localStorage.setItem("enquiryPopupOpened", new Date().getTime().toString());
  };

  useEffect(() => {
    const popupLastOpened = localStorage.getItem("enquiryPopupOpened");
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Only show the popup if it's not already visible and hasn't been opened today
    if (!isPopupVisible && (!popupLastOpened || now - parseInt(popupLastOpened) > oneDay)) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 10000); // Show popup after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]); // Fixed dependency array

  return (
    <>
      <HeroCards />
      <Container>

        <Section
          id="packages"
          title="Packages"
          description="Simple, transparent pricing. No surprises."
        >
          <Packages />
        </Section>

        <Section
          id="benefits"
          title="Benefits"
          description="Here's why you should choose us."
        >
          <Benefits />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />
        
        <Stats />

        <Section
          id="contact"
          title="Contact Us"
          description="Fill out the form below for any travel enquiries."
        >
          <ContactUs />
        </Section>
      </Container>
      <EnquiryPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
    </>
  );
};

export default HomePage;