"use client";

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser as RegUser, FaEnvelope as RegEMail, FaPhoneAlt as RegPhone, FaStickyNote as RegMessage } from "react-icons/fa";

const ContactUs: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 3;
    const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

        if (!isValidMobile(formData.mobile)) {
            setStatus('❌ Please enter a valid 10-digit mobile number.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setStatus('❌ Please enter a valid email address.');
            return;
        }

        const googleFormURL =
            'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc23VUzjdJH0CwENMUrHXpi58mDU77bJiuRWiN1KAVaaWf3uA/formResponse';

        const formDataToSubmit = new URLSearchParams();
        formDataToSubmit.append('entry.854873885', formData.name);
        formDataToSubmit.append('entry.689941301', formData.email);
        formDataToSubmit.append('entry.1560959977', formData.mobile);
        formDataToSubmit.append('entry.663185575', formData.message);

        try {
            await fetch(googleFormURL, {
                method: 'POST',
                body: formDataToSubmit.toString(),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                mode: 'no-cors',
            });

            // setStatus('✅ Message sent successfully!');
            setFormData({ name: '', email: '', mobile: '', message: '' });
            // Redirect to the Thank You page
            router.push('/thank-you');
            // setTimeout(() => setStatus(''), 5000);

        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('❌ An error occurred. Please try again.');
        }
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
                {status && (
                    <p className={`text-center font-semibold ${status.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                )}
                
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                    
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
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
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
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
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
                                onChange={handleChange}
                                id="phonec" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
                            />
                            <label htmlFor="phonec" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Mobile
                            </label>
                        </div>
                    </div>
                    
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
                                rows={2}
                            >
                            </textarea>
                            <label htmlFor="messagec" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Any Question or Message
                            </label>
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="text-center">
                        <motion.button
                            type="submit"
                            className="inline-flex justify-center items-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit &nbsp; <FaPaperPlane size={16} />
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactUs;