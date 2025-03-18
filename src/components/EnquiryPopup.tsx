"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhoneAlt, FaSuitcaseRolling, FaWhatsapp } from "react-icons/fa";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScuU1bHEe_5F12AyoV_wujkYwU3IwOMgbL7nV7fxBERKS7rQA/formResponse";
const ENTRY_IDS = {
    name: "entry.841693140",
    email: "entry.1032399951",
    phone: "entry.1253921388",
    package: "entry.206850376",
    // Non-essential fields removed
};

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
    phone: string;
    package: string;
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
        phone: "",
        package: "",
    });
    const [status, setStatus] = useState<string>("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.name || !formData.phone || !formData.package) {
            setStatus('❌ Please fill all required fields');
            return;
        }
        
        // Phone validation
        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            setStatus('❌ Please enter a valid 10-digit mobile number');
            return;
        }

        const formDataToSubmit = new URLSearchParams();
        Object.entries(ENTRY_IDS).forEach(([key, entryId]) => {
            formDataToSubmit.append(entryId, formData[key as keyof FormData]);
        });

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: "POST",
                body: formDataToSubmit.toString(),
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                mode: "no-cors",
            });
            router.push('/thank-you');
            onClose();
        } catch (error) {
            setStatus(`❌ Error submitting. Please try again. ${error}`);
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
                    {/* Name */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaUser className="text-gray-500 mr-3" />
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange} 
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Your Name *" 
                            required
                        />
                    </div>
                    
                    {/* Phone */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaPhoneAlt className="text-gray-500 mr-3" />
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Phone Number *" 
                            required
                        />
                    </div>
                    
                    {/* Email */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaEnvelope className="text-gray-500 mr-3" />
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                            placeholder="Email Address" 
                        />
                    </div>
                    
                    {/* Package */}
                    <div className="flex items-center border-b-2 border-gray-300 py-2">
                        <FaSuitcaseRolling className="text-gray-500 mr-3" />
                        <select 
                            name="package" 
                            value={formData.package}
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
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300">
                        Get Free Quote <FaPaperPlane />
                    </button>
                    
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs text-center text-gray-500">
                            Need help? Call us at <a href="tel:+919997365898" className="text-blue-600 hover:underline">+91-9997365898</a>
                        </p>
                        
                        <button 
                            type="button" 
                            onClick={openWhatsApp} 
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm transition duration-300"
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