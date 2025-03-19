"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhoneAlt, FaSuitcaseRolling, FaWhatsapp } from "react-icons/fa";

const packageOptions = [
    "Manali - 2N3D",
    "Shimla - 2N3D",
    "Manali - 3N4D",
    "Shimla & Manali - 4N5D",
    "Shimla, Manali & Kasol - 5N6D",
    "Complete Himachal Tour - 8N9D",
    "Grand Himachal with Amritsar - 8N9D",
];

interface FormData {
    name: string;
    email: string;
    mobile: string;
    travelPackage: string;
}

interface LeadFormProps {
    isVisible: boolean;
    onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isVisible, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        mobile: "",
        travelPackage: "",
    });
    const [status, setStatus] = useState<string>("");

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormReset = () => {
        setFormData({
            name: "",
            email: "",
            mobile: "",
            travelPackage: "",
        });
        setStatus("");
    }

    const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 3;
    const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        setStatus("Sending...");

        try {
            const res = await fetch("/api/sendMail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
        
            if (res.ok) {
            router.push('/thank-you');
            onClose();
            setFormData({
                name: "",
                email: "",
                mobile: "",
                travelPackage: "",
            });
        } else {
            setStatus("Failed to send message.");
        }
        } catch (error) {
        console.error(`❌ Error submitting. Please try again. ${error}`);
        setStatus("An error occurred. Please try again later.");
        }
    };

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.id === "popup-overlay") {
            onClose();
        }
    };

    const openWhatsApp = () => {
        const phoneNumber = "919997365898";
        const message = `Hi, I'm interested in booking a Himachal tour package. Please send me more information.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div id="popup-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4" onClick={handleOutsideClick}>
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-lg w-full max-w-sm mx-auto">
                {/* Form Header */}
                <div className="mb-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Travel Package Inquiry</h2>
                    <p className="text-sm text-gray-600">Get your free quote today</p>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-white border-2 border-red-600 p-1 rounded-full hover:text-red-600">
                    <HiOutlineX className="h-6 w-6" />
                </button>
                {status && <p className="text-center text-red-500 text-sm mb-4">{status}</p>}
                
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name}
                            onChange={handleChange} 
                            maxLength={30}
                            className={`pl-9 w-full py-2 px-3 rounded-lg border text-sm ${!isValidName(formData.name) && formData.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors`}
                            placeholder="Enter your full name" 
                            required
                        />
                    </div>
                    {formData.name && !isValidName(formData.name) && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid name with at least 3 characters.</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={formData.email}
                            onChange={handleChange} 
                            maxLength={40}
                            className={`pl-9 w-full py-2 px-3 rounded-lg border text-sm ${!isValidEmail(formData.email) && formData.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors`}
                            placeholder="Enter your email address" 
                        />
                    </div>
                    {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>
                    )}
                </div>

                {/* Mobile Field */}
                <div className="mb-3">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                        <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="tel" 
                            name="mobile"
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // Allow digits only
                                if (value.length <= 10) {
                                    handleChange(e);
                                }
                            }}
                            maxLength={10} 
                            className={`pl-9 w-full py-2 px-3 rounded-lg border text-sm ${!isValidMobile(formData.mobile) && formData.mobile ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors`}
                            placeholder="Enter your 10-digit mobile number" 
                            required
                        />
                    </div>
                    {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit mobile number</p>
                    )}
                </div>

                {/* Package Selection */}
                <div className="mb-5">
                    <label htmlFor="travelPackage" className="block text-sm font-medium text-gray-700 mb-1">Select Package *</label>
                    <div className="relative">
                        <FaSuitcaseRolling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select 
                            name="travelPackage" 
                            id="travelPackage"
                            value={formData.travelPackage}
                            onChange={handleChange}
                            className="pl-9 w-full py-2 px-3 rounded-lg border border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors appearance-none bg-white"
                            required
                        >
                            <option value="">Choose a travel package</option>
                            {packageOptions.map((pkg, index) => (
                                <option key={index} value={pkg}>{pkg}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-4">
                    <button
                        type="submit"
                        className="w-full py-4 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-green-500 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        Get Free Quote <FaPaperPlane size={14} />
                    </button>
                    <button 
                        type="button" 
                        onClick={handleFormReset} 
                        className="w-full py-2 px-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Clear All
                    </button>
                </div>

                {/* Contact Options */}
                <div className="pt-3 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-600 mb-3">Need help with your booking?</p>
                    
                    <div className="flex flex-col gap-2">
                        <a 
                            href="tel:+919997365898" 
                            className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm"
                        >
                            <FaPhoneAlt className="w-3 h-3" /> +91-9997365898
                        </a>
                        
                        <button 
                            type="button" 
                            onClick={openWhatsApp} 
                            className="flex items-center justify-center gap-2 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                        >
                            <FaWhatsapp size={14} /> Chat on WhatsApp
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LeadForm;