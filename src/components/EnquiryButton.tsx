"use client";

import React from 'react';

interface EnquiryButtonProps {
  onClick: () => void;
}

const EnquiryButton: React.FC<EnquiryButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      Open Enquiry Form
    </button>
  );
};

export default EnquiryButton;