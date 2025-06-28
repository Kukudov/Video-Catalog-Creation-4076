import React from 'react';
import { motion } from 'framer-motion';

const AlphabeticalSeparator = ({ letter, count }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg mb-6 mt-8 first:mt-0"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <span className="text-3xl font-bold text-white">
                {letter}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-semibold">
                {letter === '#' ? 'Numbers' : `Letter ${letter}`}
              </h2>
              <p className="text-gray-300 text-sm">
                {count} {count === 1 ? 'show' : 'shows'}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-primary-200 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 bg-white/10 rounded-full h-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-1 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AlphabeticalSeparator;