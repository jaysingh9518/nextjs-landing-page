import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 rounded-md">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Discover Breathtaking Destinations
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            From exotic getaways to thrilling adventures, we offer curated travel experiences designed just for you. Start exploring today!
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="https://www.makemytravls.com" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 12l6-6m0 0l6 6m-6-6v12" />
              </svg>
              Visit Our Official Website
            </a>

            <a 
              href="https://www.makemytravls.com/packages" 
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Explore Destination Packages
            </a>
          </div>

          <p className="text-white/80 mt-8">
            Have a dream destination in mind? <a href="https://https://makemytravls.com/contact" className="underline font-medium hover:text-white">Contact our travel experts</a> for personalized assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
