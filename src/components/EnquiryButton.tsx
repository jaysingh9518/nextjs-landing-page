"use client";

import React from 'react';

interface EnquiryButtonProps {
  onClick: () => void;
  text: string;
}

const EnquiryButton: React.FC<EnquiryButtonProps> = ({ onClick, text }) => {
  return (
    <button
    onClick={onClick}
    className="
        bg-gradient-to-r from-red-500 to-rose-600 
        text-white font-bold 
        py-2 px-6 
        rounded-lg shadow-lg 
        hover:from-rose-600 hover:to-red-500 
        hover:scale-105 
        active:shadow-none active:translate-y-1 
        transition-all
    "
>
    {text}
</button>

  );
};

export default EnquiryButton;