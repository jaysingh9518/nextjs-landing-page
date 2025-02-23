import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'John Smith',
        role: 'Travel Enthusiast',
        message: `${siteDetails.siteName} made my dream vacation a reality. The personalized itineraries and exclusive deals were beyond my expectations.`,
        avatar: '/images/testimonial-1.webp',
    },
    {
        name: 'Jane Doe',
        role: 'Adventure Seeker',
        message: `Thanks to ${siteDetails.siteName}, I discovered hidden gems and unique experiences that I would have never found on my own. Their service is top-notch!`,
        avatar: '/images/testimonial-2.webp',
    },
    {
        name: 'Emily Johnson',
        role: 'Frequent Traveler',
        message: `${siteDetails.siteName} is my go-to travel agency. Their 24/7 support and expert recommendations make every trip stress-free and enjoyable.`,
        avatar: '/images/testimonial-3.webp',
    },
];