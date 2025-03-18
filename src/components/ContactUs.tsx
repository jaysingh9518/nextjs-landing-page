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
                
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                    
                    {status && (
                        <p className={`text-center mb-2 font-semibold ${status.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                    )}

                    {formData.name && !isValidName(formData.name) && (
                        <p className="text-red-500 text-sm mb-1">Please enter a valid name with at least 3 characters.</p>
                    )}
                    {/* Full Name */}
                    <div className="relative z-0 w-full mb-6">
                        <div className="relative">
                            <RegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange} 
                                id="namec"
                                maxLength={30}
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="namec" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Full Name
                            </label>
                        </div>
                    </div>

                    {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid email address</p>
                    )}
                    
                    {/* Email */}
                    <div className="relative z-0 w-full mb-6">
                        <div className="relative">
                            <RegEMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange} 
                                id="emailc"
                                maxLength={40}
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="emailc" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email Address
                            </label>
                        </div>
                    </div>

                    {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid 10-digit mobile number</p>
                    )}
                    
                    {/* Mobile */}
                    <div className="relative z-0 w-full mb-6">
                        <div className="relative">
                            <RegPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input 
                                type="tel" 
                                name="mobile"
                                value={formData.mobile}
                                id="phonec"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // Allow digits only
                                    if (value.length <= 10) {
                                        handleChange(e);
                                    }
                                }}
                                maxLength={10} 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                            />
                            <label htmlFor="phonec" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Mobile
                            </label>
                        </div>
                    </div>
                    
                    {formData.message && formData.message.length > 150 && (
                        <p className="text-red-500 text-sm mb-1">Message should not exceed 150 characters</p>
                    )}
                    {/* Message */}
                    <div className="relative z-0 w-full mb-6">
                        <div className="relative">
                            <RegMessage className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                id="messagec" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                                maxLength={150}
                                rows={2}
                            >
                            </textarea>
                            <label htmlFor="messagec" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Any Question or Message
                            </label>
                        </div>
                    </div>
                    {/* Clear Button */}
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
                    {/* Submit Button */}
                    <div className="text-center">
                        <motion.button
                            type="submit"
                            className="
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
                            "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit &nbsp; <FaPaperPlane size={18} />
                        </motion.button>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-2">
                        <p className="text-xl text-center text-gray-500">
                            Need help? Call us at <a href="tel:+919997365898" className="text-blue-600 hover:underline">+91-9997365898</a>
                        </p>
                        
                        <button 
                            type="button" 
                            onClick={openWhatsApp} 
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-xl transition duration-300"
                        >
                            <FaWhatsapp className="text-lg" /> Chat on WhatsApp
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ContactUs;