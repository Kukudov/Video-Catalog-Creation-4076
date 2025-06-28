import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowUp } = FiIcons;

const AlphabetNavigator = ({ availableLetters, onLetterClick }) => {
  const allLetters = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }
    if (onLetterClick) {
      onLetterClick(letter);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-3"
      >
        {/* Navigator label */}
        <div className="mb-3 pb-2 border-b border-gray-200">
          <p className="text-xs text-gray-500 text-center font-medium">
            Navigator
          </p>
        </div>

        {/* Two column grid */}
        <div className="grid grid-cols-2 gap-2">
          {allLetters.map((letter) => {
            const isAvailable = availableLetters.includes(letter);
            return (
              <motion.button
                key={letter}
                onClick={() => scrollToSection(letter)}
                disabled={!isAvailable}
                whileHover={isAvailable ? { scale: 1.1 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isAvailable
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>

        {/* Scroll to Top Button */}
        <div className="mt-3 pt-2 border-t border-gray-200">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg py-2 px-3 text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm"
          >
            <SafeIcon icon={FiArrowUp} className="h-3 w-3" />
            <span>Top</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlphabetNavigator;