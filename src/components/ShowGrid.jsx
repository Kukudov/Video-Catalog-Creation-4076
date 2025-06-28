import React from 'react';
import { motion } from 'framer-motion';
import ShowCard from './ShowCard';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch } = FiIcons;

const ShowGrid = ({ shows, loading, onUpdate }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiSearch} className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No shows found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {shows.map((show, index) => (
        <ShowCard 
          key={`${show.title}-${show.season}-${show.episode}`} 
          show={show} 
          index={index} 
          onUpdate={onUpdate}
        />
      ))}
    </motion.div>
  );
};

export default ShowGrid;