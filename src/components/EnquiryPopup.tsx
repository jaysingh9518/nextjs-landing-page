"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { HiOutlineX } from "react-icons/hi";
import { FaPaperPlane, FaUser as RegUser, FaEnvelope as RegEMail, FaPhoneAlt as RegPhone, FaSuitcaseRolling as RegPackage, FaCalendarDay as RegDate, FaUserFriends as RegTraveller, FaStickyNote as RegMessage } from "react-icons/fa";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScuU1bHEe_5F12AyoV_wujkYwU3IwOMgbL7nV7fxBERKS7rQA/formResponse";
const ENTRY_IDS = {
    name: "entry.841693140",
    email: "entry.1032399951",
    phone: "entry.1253921388",
    package: "entry.206850376",
    date: "entry.344879030",
    travelers: "entry.200558430",
    message: "entry.1603664696",
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

const EnquiryPopup: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        package: "",
        date: "",
        travelers: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    
    useEffect(() => {
        if (isVisible) {
            setStatus("");
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 1000); // Stop shaking after 1 second
        }
    }, [isVisible]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, onClose]);

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear();
    };

    const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 3;
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
    const isValidPackage = (index: string) => packageOptions.findIndex(option => option.toLowerCase() === index.toLowerCase()) >= 0;
    const isValidDate = (date: string) => new Date(date) > new Date();
    const isValidTravelers = (travelers: string) => /^[1-9]\d*$/.test(travelers);
    const isValidMessage = (message: string) => message.trim().length <= 150;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

        if (!isValidMobile(formData.phone)) {
            setStatus('❌ Please enter a valid 10-digit mobile number.');
            return;
        }

        if (!isValidPackage(formData.package)) {
            setStatus('❌ Please select a valid package.');
            return;
        }

        if (!isValidDate(formData.date)) {
            setStatus('❌ Please enter a valid future date.');
            return;
        }

        if (!isValidTravelers(formData.travelers)) {
            setStatus('❌ Please enter a valid number of travelers.');
            return;
        }

        if (!isValidMessage(formData.message)) {
            setStatus('❌ Please enter a valid message with a maximum of 150 characters.');
            return;
        }

        const formDataToSubmit = new URLSearchParams();
        Object.entries(ENTRY_IDS).forEach(([key, entryId]) => {
            formDataToSubmit.append(entryId, key === "date" ? formatDate(formData[key]) : formData[key as keyof typeof formData]);
        });

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: "POST",
                body: formDataToSubmit.toString(),
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                mode: "no-cors",
            });
            // setStatus("✅ Enquiry submitted successfully!");
            setFormData({ name: "", email: "", phone: "", package: "", date: "", travelers: "", message: "" });
            router.push('/thank-you');
            onClose();
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            setStatus("❌ Error submitting enquiry. Please try again.");
        }
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === "popup-overlay") {
            onClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div id="popup-overlay" className={clsx("fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4", { "animate-shake": isShaking })} onClick={handleOutsideClick} >
            <div className="bg-white p-6 md:p-4 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
                    <HiOutlineX className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-1">Enquiry Form</h2>
                <p className="text-center text-sm font-semibold mb-4">Complete the form to submit your enquiry. <br />For assistance, call us at <a href="tel:+919997365898" className="text-blue-600 hover:underline">+91-9997365898</a>.</p>
                {status && <p className="text-center text-sm font-semibold mb-4">{status}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {formData.name && !isValidName(formData.name) && (
                        <p className="text-red-500 text-sm mb-1">Please enter a valid name with at least 3 characters.</p>
                    )}
                    {/* Name */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange} 
                                id="name" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                            />
                            <label htmlFor="name" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Full Name
                            </label>
                        </div>
                    </div>
                    
                    {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid email address</p>
                    )}
                    {/* Email */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegEMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange} 
                                id="email" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="email" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email Address
                            </label>
                        </div>
                    </div>
                    
                    {formData.phone && !isValidMobile(formData.phone) && (
                        <p className="text-red-500 text-sm mb-1">Enter a valid 10-digit mobile number</p>
                    )}
                    {/* Mobile */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                id="phone" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="phone" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Mobile
                            </label>
                        </div>
                    </div>
                    
                    {formData.package && !isValidPackage(formData.package) && (
                        <p className="text-red-500 text-sm mb-1">Please select a valid package</p>
                    )}
                    {/* Package */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <select 
                                name="package" 
                                value={formData.package}
                                onChange={handleChange}
                                id="package" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                                <option value="">Select Package</option>
                                {packageOptions.map((pkg, index) => (
                                    <option key={index} value={pkg}>{pkg}</option>
                                ))}
                            </select>
                            <label htmlFor="package" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Select Package
                            </label>
                        </div>
                    </div>
                    
                    {formData.date && !isValidDate(formData.date) && (
                        <p className="text-red-500 text-sm mb-1">Please select a valid travel date. Travel dates must be at least 1 days from today&apos;s date.</p>
                    )}
                    {/* Travel Date */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegDate className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                id="date" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="date" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Travel Date
                            </label>
                        </div>
                    </div>
                    
                    {formData.travelers && !isValidTravelers(formData.travelers) && (
                        <p className="text-red-500 text-sm mb-1">Please enter a valid travelers count</p>
                    )}
                    {/* Traveler */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegTraveller className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <input 
                                type="number" 
                                name="travelers"
                                value={formData.travelers}
                                onChange={handleChange}
                                id="travelers" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                            />
                            <label htmlFor="travelers" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Travelers Count
                            </label>
                        </div>
                    </div>
                    
                    {formData.message && formData.message.length > 150 && (
                        <p className="text-red-500 text-sm mb-1">Message should not exceed 150 characters</p>
                    )}
                    {/* Message */}
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="relative">
                            <RegMessage className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600" />
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                id="message" 
                                className="block pl-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                rows={1}
                            >
                            </textarea>
                            <label htmlFor="message" 
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-10 origin-[0] peer-focus:left-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Any Question or Message
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2">
                        Submit <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnquiryPopup;