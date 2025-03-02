"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cardsData } from '@/data/cards';
import styles from './HeroCards.module.css';

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
    }, 4000); // Auto change every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleCardClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <motion.div 
      className={styles.heroContainer} 
      style={{ backgroundImage: `url(${cards[currentIndex].background})` }}
      animate={{ opacity: [0.8, 1], scale: [1.02, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.textContainer}>
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div 
              key={cards[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={styles.title}>{cards[currentIndex].title}</h1>
              <p className={styles.description}>{cards[currentIndex].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`${styles.card} ${index === currentIndex ? styles.activeCard : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={card.background} alt={card.title} width={100} height={100} className={styles.cardImage} />
            <h2 className={styles.cardTitle}>{card.title}</h2>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroCards;
