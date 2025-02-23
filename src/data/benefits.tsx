import { FiMapPin, FiCalendar, FiCompass, FiHeart, FiGlobe, FiCamera, FiStar, FiSun, FiUsers } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Personalized Itineraries",
        description: "Experience travel like never before with itineraries tailored to your preferences and interests.",
        bullets: [
            {
                title: "Custom Travel Plans",
                description: "Get travel plans that match your unique style and needs.",
                icon: <FiMapPin size={26} />
            },
            {
                title: "Flexible Scheduling",
                description: "Enjoy the freedom to adjust your plans on the go.",
                icon: <FiCalendar size={26} />
            },
            {
                title: "Expert Recommendations",
                description: "Benefit from insider tips and local knowledge.",
                icon: <FiCompass size={26} />
            }
        ],
        imageSrc: "/images/travel-itinerary.webp"
    },
    {
        title: "Exclusive Deals",
        description: "Unlock special offers and discounts on flights, hotels, and activities.",
        bullets: [
            {
                title: "Flight Discounts",
                description: "Save on airfare with our exclusive deals.",
                icon: <FiGlobe size={26} />
            },
            {
                title: "Hotel Savings",
                description: "Enjoy discounted rates at top-rated hotels.",
                icon: <FiHeart size={26} />
            },
            {
                title: "Activity Packages",
                description: "Get the best prices on popular attractions and tours.",
                icon: <FiCamera size={26} />
            }
        ],
        imageSrc: "/images/travel-deals.webp"
    },
    {
        title: "24/7 Support",
        description: "Travel with peace of mind knowing our support team is available around the clock.",
        bullets: [
            {
                title: "Round-the-Clock Assistance",
                description: "Get help anytime, anywhere during your trip.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Emergency Services",
                description: "Access emergency support whenever you need it.",
                icon: <FiStar size={26} />
            },
            {
                title: "Travel Insurance",
                description: "Stay protected with comprehensive travel insurance options.",
                icon: <FiSun size={26} />
            }
        ],
        imageSrc: "/images/travel-support.webp"
    },
]