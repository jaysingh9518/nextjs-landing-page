"use client";

import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import clsx from 'clsx';
import { HiOutlineX } from 'react-icons/hi';
import { FaPaperPlane } from "react-icons/fa";

const EnquiryPopup: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 1000); // Stop shaking after 1 second
        }
    }, [isVisible]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            to_name: 'Make My Travls',
            from_name: formData.name,
            message: formData.message,
            reply_to: formData.email
        };

        emailjs.send('service_w4rr5wc', 'template_orv2w0q', templateParams, '8ERZGAUYgdZVt9mTD')
            .then((result) => {
                console.log('Email successfully sent!', result.text);
                alert('Enquiry submitted successfully!');
                onClose();
            }, (error) => {
                console.log('Failed to send email.', error.text);
            });

        // Send confirmation email to the submitter
        const confirmationParams = {
            to_name: formData.name,
            from_name: 'Make My Travls',
            message: 'Thank you for your enquiry. We will get back to you shortly.',
            reply_to: 'info@makemytravls.com'
        };

        emailjs.send('service_w4rr5wc', 'template_7q9gpw4', confirmationParams, '8ERZGAUYgdZVt9mTD')
            .then((result) => {
                console.log('Confirmation email successfully sent!', result.text);
            }, (error) => {
                console.log('Failed to send confirmation email.', error.text);
            });
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === 'popup-overlay') {
            onClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div
            id="popup-overlay"
            className={clsx("fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", { "animate-shake": isShaking })}
            onClick={handleOutsideClick}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <HiOutlineX className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">Enquiry Form</h2>
                <p className="text-center text-gray-500 mb-4">Please fill out the form below and we will get back to you shortly.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
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