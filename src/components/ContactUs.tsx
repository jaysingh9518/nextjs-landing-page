"use client";

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser as RegUser, FaEnvelope as RegEMail, FaPhoneAlt as RegPhone, FaStickyNote as RegMessage, FaWhatsapp } from "react-icons/fa";

const ContactUs: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleFormReset = () => {
        setFormData({
            name: "",
            email: "",
            mobile: "",
            message: "",
        });
        setStatus("");
    }

    const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 3;
    const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidMessage = (message: string) => message.trim().length <= 150;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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

        if (!isValidMessage(formData.message)) {
            setStatus('❌ Please enter a message with a maximum of 150 characters.');
            return;
        }

        setStatus('Sending...');

        try {
            const res = await fetch("/api/sendMail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
        
            if (res.ok) {
            router.push('/thank-you');
            setFormData({
                name: "",
                email: "",
                mobile: "",
                message: "",
            });
        } else {
            setStatus("Failed to send message.");
        }
        } catch (error) {
        console.error(`❌ Error submitting. Please try again. ${error}`);
        setStatus("An error occurred. Please try again later.");
        }
    };

    const openWhatsApp = () => {
        const phoneNumber = "919997365898";
        const message = `Hi, I'm interested in booking a Himachal tour package. Please send me more information.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="flex flex-col-reverse md:flex-row max-w-7xl w-full mx-auto px-6 gap-10 items-center">
            {/* Image Section with Animation */}
            <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                // viewport={{ once: true }} 
            >
                <Image src="/images/contactcta.png" alt="Contact Cta" width={500} height={500} className="w-full h-auto" />
            </motion.div>
            <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                // viewport={{ once: true }}
            >
                
                <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-sm mx-auto">
    {/* Form Header */}
    <div className="mb-5 text-center">
        <h2 className="text-xl font-bold text-gray-800">Get In Touch</h2>
        <p className="text-sm text-gray-600">We&apos;d love to hear from you</p>
    </div>
    
    {/* Status Message */}
    {status && (
        <div className={`mb-4 p-2 rounded-lg text-center ${status.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <p className="text-sm font-medium">{status}</p>
        </div>
    )}

    {/* Full Name Field */}
    <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <div className="relative">
            <RegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                name="name" 
                id="name"
                value={formData.name}
                onChange={handleChange} 
                maxLength={30}
                className={`pl-9 w-full py-2 px-3 rounded-lg border text-sm ${!isValidName(formData.name) && formData.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors`}
                placeholder="Enter your full name" 
            />
        </div>
        {formData.name && !isValidName(formData.name) && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid name with at least 3 characters.</p>
        )}
    </div>

    {/* Email Field */}
    <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <div className="relative">
            <RegEMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
    <div className="mb-4">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <div className="relative">
            <RegPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
            />
        </div>
        {formData.mobile && !isValidMobile(formData.mobile) && (
            <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit mobile number</p>
        )}
    </div>

    {/* Message Field */}
    <div className="mb-5">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
        <div className="relative">
            <RegMessage className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea 
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={150}
                rows={3}
                className={`pl-9 w-full py-2 px-3 rounded-lg border text-sm ${formData.message && formData.message.length > 150 ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors resize-none`}
                placeholder="Type your question or message here..."
                spellCheck="false"
                data-ms-editor="true"
            ></textarea>
        </div>
        <div className="flex justify-between mt-1">
            <p className="text-red-500 text-xs">
                {formData.message && formData.message.length > 150 && "Message should not exceed 150 characters"}
            </p>
            <p className="text-gray-500 text-xs">{formData.message ? formData.message.length : 0}/150</p>
        </div>
    </div>

    {/* Action Buttons */}
    <div className="grid grid-cols-2 gap-3 mb-4">
        <button 
            type="button" 
            onClick={handleFormReset} 
            className="py-2 px-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Clear
        </button>
        
        <motion.button
            type="submit"
            className="py-2 px-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            Submit <FaPaperPlane className="ml-2" size={14} />
        </motion.button>
    </div>

    {/* Contact Options */}
    <div className="pt-3 border-t border-gray-200">
        <p className="text-center text-xs text-gray-600 mb-3">Other ways to reach us:</p>
        
        <div className="flex flex-col gap-2">
            <a 
                href="tel:+919997365898" 
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm"
            >
                <RegPhone className="w-4 h-4" /> +91-9997365898
            </a>
            
            <button 
                type="button" 
                onClick={openWhatsApp} 
                className="flex items-center justify-center gap-2 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
            >
                <FaWhatsapp size={14} /> WhatsApp Chat
            </button>
        </div>
    </div>
</form>
            </motion.div>
        </div>
    );
};

export default ContactUs;