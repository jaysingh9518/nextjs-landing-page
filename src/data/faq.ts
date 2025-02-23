import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is booking with ${siteDetails.siteName} secure?`,
        answer: 'Absolutely. We use industry-standard encryption to protect your data and ensure your transactions are safe.',
    },
    {
        question: `Can I manage my bookings on multiple devices?`,
        answer: 'Yes! Your Make My Travls account syncs seamlessly across all your devices - smartphone, tablet, and computer.',
    },
    {
        question: 'Can I book flights and hotels through Make My Travls?',
        answer: `Yes! ${siteDetails.siteName} offers a comprehensive booking platform for flights, hotels, and more.`
    },
    {
        question: 'Do I need any travel expertise to use the platform?',
        answer: 'Not at all! Our user-friendly interface and expert recommendations make planning your trip easy and enjoyable, regardless of your travel experience.',
    },
    {
        question: 'What if I need help with my booking?',
        answer: 'Our dedicated support team is available 24/7 via chat or email. Plus, we offer extensive in-app guides and a comprehensive help center to assist you.'
    }
];