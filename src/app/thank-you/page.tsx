"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import '../../i18n';
import Container from '@/components/Container';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          router.push('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-2xl rounded-2xl max-w-md w-full border-t-4 border-green-500">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-4">
            Your message has been successfully submitted. We appreciate your interest and will get back to you soon.
          </p>
          <p className="text-gray-500 mb-6">
            Redirecting to home in <span className="font-bold text-blue-600">{countdown}</span> seconds...
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ThankYou;
