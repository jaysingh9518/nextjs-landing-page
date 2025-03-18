/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { packages } from "@/data/packages";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaArrowRight, FaChevronDown } from "react-icons/fa";


interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  guests: string;
  message: string;
}

interface ModalProps {
  isVisible: boolean;   // Boolean to control modal visibility
  onClose: () => void;  // Function to handle closing the modal
  packageName: string;  // String representing the package name
  pkg: Package;
  onInquire: (packageId: string) => void;
}
// Lead generation form popup
const LeadFormPopup: React.FC<ModalProps>  = ({ isVisible, onClose, packageName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: "2",
    message: ""
  });
  const [status, setStatus] = useState('');
  

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
  
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setStatus(`Thank you! We'll contact you shortly about your ${packageName} inquiry.`);
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelDate: "",
          guests: "2",
          message: "",
        });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white rounded-lg p-6 max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Get Special Offer for {packageName}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Your name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your phone number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700">Travel Date</label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Any special requests or questions"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-md shadow-md hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
            >
              Get Special Offer Now
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Or contact us directly:</p>
            <div className="flex justify-center mt-2 space-x-4">
              <a
                href="https://wa.me/919997365898"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <FaWhatsapp className="mr-1" />
                WhatsApp
              </a>
              <a
                href="tel:+919997365898"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaPhone className="mr-1 transform scale-x-[-1]" />
                Call
              </a>
            </div>
          </div>
        </motion.div>
    </div>
    
  );
};

interface PackageCardProps {
  pkg: {
    title: string;
    image?: string;
    nights: number;
    days: number;
    minPax: number;
    normalPrice: number;
    discountPrice: number;
    inclusions: string[];
    description: string;
  };
  onInquire: (packageTitle: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onInquire }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all border border-gray-100 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Package Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-1 rounded-br-lg font-bold">
          SPECIAL OFFER
        </div>
        <Image 
          src={pkg.image || "/placeholder-package.jpg"} 
          alt={pkg.title} 
          width={100}
          height={100} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Package Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{pkg.title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">{pkg.nights} Nights / {pkg.days} Days</span>
          <span className="text-sm text-gray-600">Min Pax: {pkg.minPax}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
        
        {/* Price Section */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-4">
          <div>
            <span className="text-sm text-gray-500">Price per person</span>
            <div className="flex items-center">
              <span className="line-through text-gray-500 text-sm mr-2">₹{pkg.normalPrice}</span>
              <span className="text-xl font-bold text-red-600">₹{pkg.discountPrice}</span>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-bold">
            Save {Math.round(((pkg.normalPrice - pkg.discountPrice) / pkg.normalPrice) * 100)}%
          </div>
        </div>
        
        {/* Main CTA */}
        <button
          onClick={() => onInquire(pkg.title)}
          className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-md shadow-md hover:from-red-600 hover:to-orange-600 transition-all mb-3"
        >
          Get Special Offer
        </button>
        
        {/* Toggle to show more details */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 py-2"
        >
          <span className="mr-1">{expanded ? "View Less" : "View More"}</span>
          <FaChevronDown className={`transition-transform ${expanded ? "transform rotate-180" : ""}`} />
        </button>
        
        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-bold text-gray-800 mb-2">Package Inclusions:</h4>
            <ul className="space-y-1 mb-4">
              {pkg.inclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex justify-between items-center">
              <a
                href="https://wa.me/919997365898"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <FaWhatsapp className="mr-1" />
                WhatsApp
              </a>
              <a
                href="mailto:info@makemytravls.com"
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <FaEnvelope className="mr-1" />
                Email
              </a>
              <a
                href="tel:+919997365898"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaPhone className="mr-1 transform scale-x-[-1]" />
                Call
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface CountdownTimerProps {
  initialHours?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialHours = 48 }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
      const storedTime = localStorage.getItem('countdownTime');
      if (storedTime) {
          const savedTime = JSON.parse(storedTime);
          const now = new Date().getTime();
          const elapsed = Math.floor((now - savedTime.timestamp) / 1000);
          const remainingSeconds = Math.max(savedTime.totalSeconds - elapsed, 0);

          setTime({
              hours: Math.floor(remainingSeconds / 3600),
              minutes: Math.floor((remainingSeconds % 3600) / 60),
              seconds: remainingSeconds % 60
          });
      } else {
          const totalSeconds = initialHours * 3600;
          localStorage.setItem('countdownTime', JSON.stringify({
              totalSeconds,
              timestamp: new Date().getTime()
          }));
          setTime({ hours: initialHours, minutes: 0, seconds: 0 });
      }

      const timer = setInterval(() => {
          setTime((prevTime) => {
              const { hours, minutes, seconds } = prevTime;
              const totalSeconds = hours * 3600 + minutes * 60 + seconds;

              if (totalSeconds <= 0) {
                  clearInterval(timer);
                  localStorage.removeItem('countdownTime');
                  return { hours: 0, minutes: 0, seconds: 0 };
              }

              const newTotalSeconds = totalSeconds - 1;
              return {
                  hours: Math.floor(newTotalSeconds / 3600),
                  minutes: Math.floor((newTotalSeconds % 3600) / 60),
                  seconds: newTotalSeconds % 60
              };
          });
      }, 1000);

      return () => clearInterval(timer);
  }, []);

  return (
      <div className="flex space-x-2">
          <div className="bg-white bg-opacity-20 rounded-md px-3 py-1">
              <span className="font-mono text-xl">{String(time.hours).padStart(2, '0')}</span>
              <span className="text-xs block">Hours</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-md px-3 py-1">
              <span className="font-mono text-xl">{String(time.minutes).padStart(2, '0')}</span>
              <span className="text-xs block">Mins</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-md px-3 py-1">
              <span className="font-mono text-xl">{String(time.seconds).padStart(2, '0')}</span>
              <span className="text-xs block">Secs</span>
          </div>
      </div>
  );
};


// Main component
const Packages = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    timerRef.current = setInterval(() => {
        handleNextClick();
    }, 5000);

    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current); // Clear only if it exists
        }
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, [currentIndex]);

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

  const handleInquire = (packageName : string) => {
    setSelectedPackage(packageName);
    setFormVisible(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <section id ="packages" className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Exclusive Travel Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium travel experiences at unbeatable prices. 
            Limited-time offers available now!
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-lg text-white text-center mb-8 max-w-md mx-auto">
          <p className="text-sm uppercase tracking-wider mb-1">Limited Time Offer</p>
          <p className="font-bold text-xl">Get 20% Off All Packages</p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <CountdownTimer />
          </div>
        </div>
        
        {/* Package Slider */}
        <div className="relative">
          <button
            className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:text-red-500 focus:outline-none"
            onClick={handlePrevClick}
          >
            <FaArrowLeft size={20} />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {packages.slice(currentIndex, currentIndex + slidesToShow).map((pkg) => (
              <PackageCard 
                key={pkg.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any 
                pkg={pkg} 
                onInquire={handleInquire} 
              />
            ))}
          </div>
          
          <button
            className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:text-red-500 focus:outline-none"
            onClick={handleNextClick}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {packages.slice(0, packages.length - slidesToShow + 1).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-red-500 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Can&apos;t find what you&apos;re looking for? Contact us for a custom package!</p>
          <a
            href="tel:+919997365898"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 transition-all"
          >
            <FaPhone className="mr-2 transform scale-x-[-1]" />
            Call for Custom Package
          </a>
        </div>
      </div>
      
      {/* Lead Generation Form */}

      {/* Form Popup */}
      
      <LeadFormPopup 
        isVisible={formVisible}
        onClose={() => setFormVisible(false)}
        packageName={selectedPackage}
      />
    </section>
  );
};

export default Packages;