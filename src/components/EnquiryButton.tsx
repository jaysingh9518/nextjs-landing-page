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
      className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors"
    >
      {text}
    </button>
  );
};

export default EnquiryButton;