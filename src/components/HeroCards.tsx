/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cardsData } from "@/data/cards";

declare global {
  interface Window {
    trackLeadForm?: () => void;
  }
}

const HeroCards = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    travelDate: "",
    guests: "2",
  });
  const cards = cardsData.cards;
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 3;
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
  const isValidTravelDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isValidGuests = (guests: string) => /^[1-9]\d*$/.test(guests);

  const handleFormReset = () => {
    setFormData({
        name: "",
        email: "",
        mobile: "",
        travelDate: "",
        guests: "2",
    });
    setStatus("");
}

  // Lead form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isValidName(formData.name)) {
      setStatus('❌ Please enter a valid name with at least 3 characters.');
      return;
    }
  
    if (!isValidEmail(formData.email)) {
      setStatus('❌ Please enter a valid email address.');
      return;
    }
  
    if (!isValidMobile(formData.mobile)) {
      setStatus('❌ Please enter a valid 10-digit mobile number.');
      return;
    }
  
    if (!isValidTravelDate(formData.travelDate)) {
      setStatus('❌ Please enter a valid future date (DD-MM-YYYY).');
      return;
    }
  
    if (!isValidGuests(formData.guests)) {
      setStatus('❌ Please enter a valid number of guests (1-99).');
      return;
    }
  
    setStatus("Sending...");
  
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setStatus("Thank you! We'll contact you shortly with exclusive travel offers.");
        setShowLeadForm(false);
        router.push('/thank-you');
        
        // Fire Google Ads conversion tracking event
        if (typeof window !== "undefined" && typeof window.trackLeadForm === "function") {
          window.trackLeadForm();
          console.log("Google Ads Conversion Event Triggered");
        } else {
          console.error("Google Ads tracking function not found");
        }
  
        setFormData({
          name: "",
          email: "",
          mobile: "",
          travelDate: "",
          guests: "2",
        });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };  
  
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const handleCardClick = (index: number) => {
    stopAutoplay();
    if (index === currentIndex) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
      startAutoplay();
    }, 500);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-end min-h-screen w-full text-white bg-cover bg-center transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${cards[currentIndex].background})` }}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0"></div>
      
      {/* Hero content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row w-full max-w-7xl mx-auto px-4 gap-6 mt-20 mb-5">
        {/* Left column - Hero Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <AnimatePresence mode="wait">
            {!isAnimating && (
              <motion.div
                key={cards[currentIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {cards[currentIndex].title}
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-xl">
                  {cards[currentIndex].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => setShowLeadForm(true)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  >
                    Get Custom Package
                  </button>
                  <a 
                    href="#packages" 
                    className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/40 text-white font-semibold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  >
                    View All Packages
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Social proof */}
          <div className="flex flex-col items-center md:items-start mt-8">
            <div className="flex -space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                  <Image
                    src={`/images/avatar${num}.jpg`}
                    alt="Customer"
                    width={32}
                    height={32}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <p className="text-sm">
              <span className="font-bold">500+ travelers</span> booked in the last 24 hours
            </p>
          </div>
        </div>
        
        {/* Right column - Lead Capture Form */}
        <div className="w-full h-100vh mt-4 md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-md backdrop-blur-md bg-black/40 p-6 rounded-2xl border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-1">Get Exclusive Offers</h2>
            <p className="text-gray-200 mb-4">Limited-time deals for your dream vacation</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                {formData.name && !isValidName(formData.name) && (
                  <p className="text-red-500 text-sm mb-1">Please enter a valid name with at least 3 characters.</p>
                )}
                <label htmlFor="name" className="sr-only">Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    maxLength={30}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="relative">
                {formData.email && !isValidEmail(formData.email) && (
                  <p className="text-red-500 text-sm mb-1">Please enter a valid email address.</p>
                )}
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    maxLength={40}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="relative">
                {formData.mobile && !isValidMobile(formData.mobile) && (
                  <p className="text-red-500 text-sm mb-1">Please enter a valid phone number.</p>
                )}
                <label htmlFor="mobile" className="sr-only">Mobile</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="Your Mobile"
                    required
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Allow digits only
                      if (value.length <= 10) {
                        handleInputChange(e);
                      }
                    }}
                    maxLength={10}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  {formData.travelDate && !isValidTravelDate(formData.travelDate) && (
                    <p className="text-red-500 text-sm mb-1">Please enter a valid travel date.</p>
                  )}
                  <label htmlFor="travelDate" className="sr-only">Travel Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      required
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  {formData.guests && !isValidGuests(formData.guests) && (
                    <p className="text-red-500 text-sm mb-1">Please enter a valid number of guests.</p>
                  )}
                  <label htmlFor="guests" className="sr-only">Guests</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </span>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      placeholder="Number of Guests"
                      required
                      maxLength={100}
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row gap-4">
                <button 
                  type="button" 
                  onClick={handleFormReset} 
                  className="
                    w-full py-3 
                    bg-gradient-to-r from-gray-500 to-gray-700
                    hover:from-gray-600 hover:to-gray-800 
                    text-white font-semibold 
                    rounded-xl shadow-md 
                    flex items-center justify-center
                    hover:scale-105 
                    transition-all duration-300
                  "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  Clear All
                </button>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:scale-105 
                            transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Get Custom Quote
                </button>
              </div>

              {status && <p className="mt-2 text-sm">{status}</p>}
            </form>
            
            {/* Trust badges */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm">Trusted</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="ml-1 text-sm">Secure</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-1 text-sm">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Destination Cards */}
      {/* <div className="relative z-10 flex overflow-x-auto pb-6 md:pb-12 px-4 md:px-0 gap-4 w-full max-w-7xl mx-auto mb-8 no-scrollbar">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`flex-shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 w-36 md:w-48 ${
              index === currentIndex ? "ring-4 ring-blue-500" : ""
            }`}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0.7,
              scale: index === currentIndex ? 1.05 : 1
            }}
          >
            <div className="relative h-20 md:h-28 w-full">
              <Image
                src={card.background}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 md:p-3 bg-black/60 backdrop-blur-sm">
              <h3 className="text-xs md:text-sm font-medium text-center truncate">
                {card.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div> */}
      
      {/* Navigation dots */}
      <div className="relative z-10 flex justify-center gap-2 mb-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-blue-500 w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Full-screen lead form */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl max-w-md w-full border border-white/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Get Your Custom Package</h2>
                <button 
                  onClick={() => setShowLeadForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {status && <p className="text-red-500 font-medium">{status}</p>}
                
                <div>
                  {formData.name && !isValidName(formData.name) && <p className="text-red-500 text-sm">Please enter a valid name.</p>}
                  <label htmlFor="popup-name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      placeholder="Your Name"
                      required
                      maxLength={30}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  {formData.email && !isValidEmail(formData.email) && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
                  <label htmlFor="popup-email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="popup-email"
                      name="email"
                      placeholder="Your Email"
                      required
                      maxLength={30}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  {formData.mobile && !isValidMobile(formData.mobile) && <p className="text-red-500 text-sm">Please enter a valid mobile number.</p>}
                  <label htmlFor="popup-mobile" className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      id="popup-mobile"
                      name="mobile"
                      placeholder="Your Mobile"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {formData.travelDate && !isValidTravelDate(formData.travelDate) && <p className="text-red-500 text-sm">Please enter a valid date.</p>}
                    <label htmlFor="popup-travelDate" className="block text-sm font-medium text-gray-300 mb-1">Travel Date</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </span>
                      <input
                        type="date"
                        id="popup-travelDate"
                        name="travelDate"
                        required
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/30 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    {formData.guests && !isValidGuests(formData.guests) && <p className="text-red-500 text-sm">Please enter a valid number of guests.</p>}
                    <label htmlFor="popup-guests" className="block text-sm font-medium text-gray-300 mb-1">Guests</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </span>
                      <input
                        type="number"
                        id="popup-guests"
                        name="guests"
                        required
                        maxLength={100}
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/30 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse md:flex-row gap-4 mt-4">
                  <button 
                    type="button" 
                    onClick={handleFormReset} 
                    className="
                      w-full py-3 
                      bg-gradient-to-r from-purple-500 to-pink-500
                      text-white font-semibold 
                      rounded-xl shadow-md 
                      hover:from-pink-500 hover:to-purple-500 
                      hover:scale-105 
                      transition-all duration-300
                      flex items-center justify-center
                    "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Clear All
                  </button>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 
                            transition-all duration-300 ease-in-out flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Get Exclusive Deals Now!
                  </button>
                </div>
                
                {status && <p className="mt-2 text-sm text-gray-300">{status}</p>}
              </form>
               {/* Trust badges */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm">Trusted</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="ml-1 text-sm">Secure</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-1 text-sm">24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroCards;