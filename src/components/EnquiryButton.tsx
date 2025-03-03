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
      className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:transition-transform hover:scale-105 active:shadow-none active:translate-y-1 transition-all"
    >
      {text}
    </button>
  );
};

export default EnquiryButton;