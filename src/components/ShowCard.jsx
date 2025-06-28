import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiCalendar, FiTv, FiEdit2, FiSave, FiX } = FiIcons;

const ShowCard = ({ show, index, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShow, setEditedShow] = useState({
    season: show.season,
    episode: show.episode
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Action': 'bg-red-100 text-red-800',
      'Comedy': 'bg-yellow-100 text-yellow-800',
      'Drama': 'bg-blue-100 text-blue-800',
      'Sci-Fi': 'bg-purple-100 text-purple-800',
      'Fantasy': 'bg-pink-100 text-pink-800',
      'Horror': 'bg-gray-100 text-gray-800',
      'Crime': 'bg-orange-100 text-orange-800',
      'Animation': 'bg-green-100 text-green-800',
      'Thriller': 'bg-indigo-100 text-indigo-800',
      'Adventure': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleSave = () => {
    if (editedShow.season > 0 && editedShow.episode > 0) {
      onUpdate(show.title, editedShow.season, editedShow.episode);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedShow({
      season: show.season,
      episode: show.episode
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setEditedShow(prev => ({
        ...prev,
        [field]: numValue
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Card Header */}
      <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-4">
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(show.category)}`}>
            {show.category}
          </span>
        </div>
        
        <div className="flex items-center space-x-3 mt-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <SafeIcon icon={FiPlay} className="h-6 w-6 text-white" />
          </div>
          <div className="text-white flex-1">
            <h3 className="font-semibold text-lg leading-tight">{show.title}</h3>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {isEditing ? (
              <>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiTv} className="h-4 w-4" />
                  <span>S</span>
                  <input
                    type="number"
                    value={editedShow.season}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                    className="w-12 px-1 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    min="1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                  <span>E</span>
                  <input
                    type="number"
                    value={editedShow.episode}
                    onChange={(e) => handleInputChange('episode', e.target.value)}
                    className="w-12 px-1 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    min="1"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiTv} className="h-4 w-4" />
                  <span>S{show.season.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                  <span>E{show.episode.toString().padStart(2, '0')}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiSave} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiX} className="h-4 w-4" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiEdit2} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiPlay} className="h-4 w-4" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Episode Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Season {show.season}, Episode {show.episode}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowCard;