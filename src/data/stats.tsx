import { FaGlobeAmericas, FaStar, FaSuitcaseRolling } from "react-icons/fa";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "100+",
        icon: <FaGlobeAmericas size={34} style={{ color: "#3b82f6" }} />, // Tailwind class text-blue-500
        description: "Destinations worldwide, offering diverse travel experiences."
    },
    {
        title: "4.8",
        icon: <FaStar size={34} style={{ color: "#facc15" }} />, // Tailwind class text-yellow-500
        description: "Average customer rating, reflecting our commitment to quality service."
    },
    {
        title: "50+",
        icon: <FaSuitcaseRolling size={34} style={{ color: "#16a34a" }} />, // Tailwind class text-green-600
        description: "Travel packages, tailored to meet your unique preferences and budget."
    }
];