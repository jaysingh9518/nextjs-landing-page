"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

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

    return (
        <section id="contact" className="py-10">
            <div className="max-w-7xl w-full mx-auto px-6">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
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
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;