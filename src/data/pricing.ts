import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Basic',
        price: 29,
        features: [
            'Access to standard travel deals',
            'Personalized travel itineraries',
            'Basic customer support',
            'Monthly travel newsletter',
        ],
    },
    {
        name: 'Premium',
        price: 99,
        features: [
            'Access to premium travel deals',
            'Priority customer support',
            'Exclusive travel content',
            'Advanced travel planning tools',
            'Monthly travel newsletter',
        ],
    },
    {
        name: 'VIP',
        price: 'Custom',
        features: [
            'All-inclusive travel packages',
            '24/7 dedicated support',
            'Personal travel concierge',
            'Custom travel solutions',
            'Exclusive VIP events',
            'On-demand travel assistance',
        ],
    },
]