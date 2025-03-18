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
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
                    <HiOutlineX className="h-6 w-6" />
                </button>
                
                <h2 className="text-2xl font-semibold text-center mb-2">Get Your Free Quote</h2>
                <p className="text-center text-sm mb-4">Fill this form to receive best offers for your Himachal trip!</p>
                
                {status && <p className="text-center text-red-500 text-sm mb-4">{status}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {formData.name && !isValidName(formData.name) && (
                        <p className="text-red-500 text-sm mb-1">Please enter a valid name with at least 3 characters.</p>
                    )}
                    {/* Name */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaUser className="text-gray-500 mr-3" />
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={30} 
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Your Name *" 
                            required
                        />
                    </div>
                    
                    {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid email address</p>
                    )}
                    {/* Email */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaEnvelope className="text-gray-500 mr-3" />
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            maxLength={40}
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Email Address" 
                        />
                    </div>
                    
                    {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid 10-digit mobile number</p>
                    )}
                    {/* Mobile */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaPhoneAlt className="text-gray-500 mr-3" />
                        <input 
                            type="tel" 
                            name="mobile"
                            value={formData.mobile}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // Allow digits only
                                if (value.length <= 10) {
                                    handleChange(e);
                                }
                            }}
                            maxLength={10}  // Optional for additional safety
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Phone Number *" 
                            required
                        />
                    </div>

                    {/* Package */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaSuitcaseRolling className="text-gray-500 mr-3" />
                        <select 
                            name="travelPackage" 
                            value={formData.travelPackage}
                            onChange={handleChange}
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            required
                        >
                            <option value="">Select Package *</option>
                            {packageOptions.map((pkg, index) => (
                                <option key={index} value={pkg}>{pkg}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleFormReset} 
                        className="
                            w-full py-3 
                            bg-gradient-to-r from-red-500 to-rose-600
                            text-white font-semibold 
                            rounded-xl shadow-md 
                            hover:from-rose-600 hover:to-red-500 
                            hover:scale-105 
                            active:scale-95
                            transition-all duration-300
                        "
                    >
                        Clear All
                    </button>
                    <button type="submit" className="
                                w-full inline-flex items-center justify-center
                                py-3 px-6
                                mt-3 
                                rounded-xl shadow-lg
                                text-white font-semibold
                                bg-gradient-to-r from-green-500 to-emerald-600
                                hover:from-emerald-600 hover:to-green-500
                                hover:shadow-xl
                                hover:scale-105 
                                active:scale-95
                                transition-all duration-300
                            ">
                        Get Free Quote <FaPaperPlane />
                    </button>
                    
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg text-center text-gray-500">
                            Need help? Call us at <a href="tel:+919997365898" className="text-blue-600 hover:underline">+91-9997365898</a>
                        </p>
                        
                        <button 
                            type="button" 
                            onClick={openWhatsApp} 
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-lg transition duration-300"
                        >
                            <FaWhatsapp className="text-lg" /> Chat on WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadForm;