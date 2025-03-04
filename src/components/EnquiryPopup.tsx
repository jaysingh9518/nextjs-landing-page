"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { HiOutlineX } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

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
    "Golden Triangle - Delhi, Agra, Jaipur",
    "Kerala Backwaters & Munnar Escape",
    "Goa Beach Holiday & Water Adventures",
    "Leh-Ladakh High-Altitude Adventure",
    "Andaman Islands - Beach & Marine Bliss",
    "Rajasthan’s Royal Heritage Tour",
    "Himalayan Retreat - Manali & Shimla",
    "Varanasi & The Sacred Ganges Tour",
    "Meghalaya & Northeast Wonders Tour",
    "Mysore & Coorg Coffee Trail Experience",
];

const EnquiryPopup: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        package: "",
        date: "",
        travelers: "",
        message: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    
    useEffect(() => {
        if (isVisible) {
            setStatus("");
            setErrors({});
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

    const validate = () => {
            const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim() || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters long.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
        if (!formData.package) newErrors.package = "Please select a package.";
        if (!formData.date || new Date(formData.date) <= new Date()) newErrors.date = "Date must be in the future.";
        if (!/^[1-9]\d*$/.test(formData.travelers)) newErrors.travelers = "Number of travelers must be a valid number.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

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
            setStatus("✅ Enquiry submitted successfully!");
            setFormData({ name: "", email: "", phone: "", package: "", date: "", travelers: "", message: "" });
            setTimeout(() => onClose(), 4000);
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
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
                    <HiOutlineX className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">Enquiry Form</h2>
                {status && <p className="text-center text-sm font-semibold mb-4">{status}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    
                    <select name="package" value={formData.package} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Package</option>
                        {packageOptions.map((pkg, index) => (
                            <option key={index} value={pkg}>{pkg}</option>
                        ))}
                    </select>
                    {errors.package && <p className="text-red-500 text-sm">{errors.package}</p>}
                    
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded text-gray-400" onFocus={(e) => e.target.classList.remove("text-gray-400")} onBlur={(e) => { if (!e.target.value) e.target.classList.add("text-gray-400"); }} />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                    <input type="number" name="travelers" value={formData.travelers} onChange={handleChange} placeholder="Number of travelers" className="w-full p-2 border rounded" />
                    {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers}</p>}
                    
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional Requirements" className="w-full p-2 border rounded" rows={3}></textarea>
                    
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2">
                        Submit <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnquiryPopup;