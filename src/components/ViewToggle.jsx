import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList } = FiIcons;

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('grid')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          currentView === 'grid'
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <SafeIcon icon={FiGrid} className="h-4 w-4" />
        <span className="text-sm font-medium">Grid</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <SafeIcon icon={FiList} className="h-4 w-4" />
        <span className="text-sm font-medium">List</span>
      </motion.button>
    </div>
  );
};

export default ViewToggle;