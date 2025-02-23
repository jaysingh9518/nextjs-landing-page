"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    const destinations = [
        {
            name: 'Goa',
            imageSrc: '/images/goa.webp',
            startingCost: '₹15,000'
        },
        {
            name: 'Kerala',
            imageSrc: '/images/kerala.webp',
            startingCost: '₹20,000'
        },
        {
            name: 'Manali',
            imageSrc: '/images/manali.webp',
            startingCost: '₹18,000'
        }
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const scroll = () => {
                scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                }
            };
            const interval = setInterval(scroll, 3000); // Change slide every 3 seconds
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]">
            </div>

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">{heroDetails.heading}</h1>
                <p className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
            </div>

            <div className="mt-16 w-full overflow-hidden">
                <div className="flex w-full" ref={scrollContainerRef}>
                    {destinations.map((destination) => (
                        <div key={destination.name} className="flex-shrink-0 w-full text-center">
                            <Image
                                src={destination.imageSrc}
                                alt={destination.name}
                                width={600}
                                height={400}
                                className="mx-auto rounded-lg"
                            />
                            <h3 className="mt-4 text-2xl font-semibold">{destination.name}</h3>
                            <p className="mt-2 text-lg text-gray-600">Starting from {destination.startingCost} per person</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;