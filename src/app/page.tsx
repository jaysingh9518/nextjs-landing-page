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
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsPopupVisible(true);
    }, 10000); // Show popup after 10 seconds
    return () => clearTimeout(timer);
  }, []);

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

        <Section
          id="faq"
          title="Frequently Asked Questions"
          description="Get answers to your questions about our services."
        >
          <FAQ />
        </Section>

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