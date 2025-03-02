import { IPackage } from "@/types";

export const packages: IPackage[] = [
    {
        title: 'Basic Package',
        description: 'Enjoy a budget-friendly travel experience with our Basic Package, offering essential travel services and support.',
        nights: 3,
        days: 4,
        minPax: 1,
        normalPrice: 29000,
        discountPrice: 19000,
        inclusions: [
            'Hotel accommodation',
            'Sharing Basis Airport transfers',
            'Daily breakfast',
            'City tours',
        ],
    },
    {
        title: 'Premium Package',
        description: 'Upgrade your travel experience with our Premium Package, featuring exclusive deals and priority support.',
        nights: 5,
        days: 6,
        minPax: 2,
        normalPrice: 99000,
        discountPrice: 79000,
        inclusions: [
            '4-star hotel accommodation',
            'Private airport transfers',
            'All meals included',
            'Exclusive city tours',
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
            '5-star hotel accommodation',
            'Jet transfers',
            'City tours with Club access',
            'All meals',
        ],
    },
];