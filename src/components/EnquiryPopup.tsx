"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { HiOutlineX } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const EnquiryPopup: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
    isVisible,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (isVisible) {
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidMobile(formData.mobile)) {
            setStatus("❌ Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            setStatus("❌ Please enter a valid email address.");
            return;
        }

        const googleFormURL =
            "https://docs.google.com/forms/u/0/d/e/1FAIpQLScAcj6UrrB0vuHytmE3s7QgP5Nn4q5C0jY6S5tgvlkEASMJYg/formResponse";

        const formDataToSubmit = new URLSearchParams();
        formDataToSubmit.append("entry.783375438", formData.name);
        formDataToSubmit.append("entry.1989905515", formData.email);
        formDataToSubmit.append("entry.1387448141", formData.mobile);
        formDataToSubmit.append("entry.74788637", formData.message);

        try {
            await fetch(googleFormURL, {
                method: "POST",
                body: formDataToSubmit.toString(),
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                mode: "no-cors",
            });

            setStatus("✅ Message sent successfully!");
            setFormData({ name: "", email: "", mobile: "", message: "" });

            setTimeout(() => onClose(), 6000);

            setTimeout(() => setStatus(""), 5000);
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus("❌ An error occurred. Please try again.");
        }
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === "popup-overlay") {
            onClose();
        }
    };

    const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isVisible) return null;

    return (
        <div
            id="popup-overlay"
            className={clsx(
                "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
                { "animate-shake": isShaking }
            )}
            onClick={handleOutsideClick}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <HiOutlineX className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Enquiry Form
                </h2>
                <p className="text-center text-gray-500 mb-4">
                    Please fill out the form below and we will get back to you
                    shortly.
                </p>
                {status && (
                    <p
                        className={`${
                            status.startsWith("❌")
                                ? "text-red-500"
                                : "text-green-500"
                        } flex justify-center items-center text-center`}
                    >
                        {status}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500">
                            Enter a valid email address
                        </p>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500">
                            Enter a valid 10-digit mobile number
                        </p>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="mobile"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mobile
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-secondary hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Submit &nbsp; <FaPaperPlane size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnquiryPopup;
