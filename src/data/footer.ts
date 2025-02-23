import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Your gateway to unforgettable travel experiences.",
    quickLinks: [
        {
            text: "Benifits",
            url: "#benifits"
        },
        {
            text: "Package",
            url: "#package"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        },
        {
            text: "Contact Us",
            url: "#contact"
        }
    ],
    email: 'info@makemytravls.com',
    telephone: '+91 9997365898',
    socials: {
        twitter: 'https://twitter.com/makemytravls',
        facebook: 'https://facebook.com/makemytravls',
        linkedin: 'https://www.linkedin.com/company/makemytravls',
        instagram: 'https://www.instagram.com/makemyTravls',
    }
}