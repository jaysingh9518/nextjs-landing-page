import { IPackage } from "@/types";

export const packages: IPackage[] = [
    {
        title: 'Basic Package',
        description: 'Enjoy a budget-friendly travel experience with our Basic Package, offering essential travel services and support.',
        nights: 3,
        days: 4,
        minPax: 1,
        normalPrice: 29,
        discountPrice: 19,
        inclusions: [
            'Access to standard travel deals',
            'Personalized travel itineraries',
            'Basic customer support',
            'Monthly travel newsletter',
        ],
    },
    {
        title: 'Premium Package',
        description: 'Upgrade your travel experience with our Premium Package, featuring exclusive deals and priority support.',
        nights: 5,
        days: 6,
        minPax: 2,
        normalPrice: 99,
        discountPrice: 79,
        inclusions: [
            'Access to premium travel deals',
            'Priority customer support',
            'Exclusive travel content',
            'Advanced travel planning tools',
        ],
    },
    {
        title: 'VIP Package',
        description: 'Indulge in luxury with our VIP Package, offering all-inclusive travel services and personalized support.',
        nights: 7,
        days: 8,
        minPax: 2,
        normalPrice: 'Custom',
        discountPrice: 'Custom',
        inclusions: [
            'All-inclusive travel packages',
            '24/7 dedicated support',
            'Personal travel concierge',
            'Custom travel solutions',
        ],
    },
];