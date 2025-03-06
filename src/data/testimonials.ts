import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Neeraj',
        role: 'Satisfied Traveler',
        message: `I loved the taxi services, comfortable stays, and breathtaking sightseeing tours provided by ${siteDetails.siteName}. The supportive taxi drivers and friendly hotel staff made my journey truly memorable!`,
        avatar: '/images/user-300x300.png' ,
    },
    {
        name: 'Raj',
        role: 'Happy Customer',
        message: `Our trip to Kumbh from Delhi was seamlessly managed by ${siteDetails.siteName}. From comfortable transfers to smooth coordination, everything was well-planned. The clean cab, professional driver, and hassle-free journey made it a stress-free experience. Highly recommended!`,
        avatar: '/images/user-300x300.png',
    },
    {
        name: 'Promod',
        role: 'Delighted Guest',
        message: `Our Manali tour with ${siteDetails.siteName} was amazing! The breathtaking cottage surroundings and the helpful staff added to the wonderful experience.`,
        avatar: '/images/user-300x300.png',
    },
];
