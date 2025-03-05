import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    mobile: string;
    address: string;
    socials: ISocials;
} = {
    subheading: "From breathtaking destinations to exclusive travel deals, Make My Travls puts the world at your fingertips.",
    quickLinks: [
        {
            text: "Benefits",
            url: "#benefits"
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
            text: "FAQ",
            url: "#faq"
        },
        {
            text: "Contact Us",
            url: "#contact"
        }
    ],
    email: 'info@makemytravls.com',
    telephone: '+91 5624338313',
    mobile: '+91 9997365898',
    address: 'Khasra No. 513, House No. 31/PN/397, Prem Nagar, Rajpur Chungi, Shamshabad Road, Agra, Uttar Pradesh – 282001',
    socials: {
        twitter: 'https://twitter.com/makemytravls',
        facebook: 'https://facebook.com/makemytravls',
        linkedin: 'https://www.linkedin.com/company/makemytravls',
        instagram: 'https://www.instagram.com/makemyTravls',
        youtube: 'https://www.youtube.com/@makemytravls',
    }
}