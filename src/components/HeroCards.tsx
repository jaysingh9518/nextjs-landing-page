"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cardsData } from "@/data/cards";

const HeroCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cards = cardsData.cards;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleCardClick = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-end p-5 h-screen w-full text-white bg-cover bg-center transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${cards[currentIndex].background})` }}
      animate={{ opacity: [0.8, 1], scale: [1.02, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-5 backdrop-blur-md p-6 rounded-2xl bg-black/50 max-w-4xl">
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div
              key={cards[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{cards[currentIndex].title}</h1>
              <p className="text-lg md:text-xl">{cards[currentIndex].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="md:mb-3 mb-16">
        <a href="#packages" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
          Explore Packages Now
        </a>
      </div>
      
      <div className="hidden gap-3 justify-center flex-wrap p-3 mb-2 md:flex">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`cursor-pointer border p-3 rounded-lg backdrop-blur-md bg-white/10 transition-all duration-300 flex flex-col items-center max-w-[120px] md:max-w-[150px] hover:scale-110 ${
              index === currentIndex ? "border-blue-400" : "border-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={card.background}
              alt={card.title}
              width={80}
              height={80}
              className="rounded-full object-cover mb-2 w-[60px] md:w-[80px] h-[60px] md:h-[80px]"
            />
            <h2 className="text-sm md:text-base font-semibold text-center">{card.title}</h2>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroCards;
