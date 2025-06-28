import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiTv, FiEdit2, FiSave, FiX, FiTrash2, FiCheck } = FiIcons;

const ShowCard = ({ show, index, onUpdate, onDelete, onToggleCompletion }) => {
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
      'Adventure': 'bg-teal-100 text-teal-800',
      'Musical': 'bg-rose-100 text-rose-800',
      'Reality': 'bg-cyan-100 text-cyan-800'
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

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${show.title}"?`)) {
      onDelete(show.title);
    }
  };

  const handleToggleComplete = () => {
    onToggleCompletion(show.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        show.completed ? 'ring-2 ring-green-200' : ''
      }`}
    >
      {/* Card Header */}
      <div className={`relative p-4 ${
        show.completed 
          ? 'bg-gradient-to-br from-green-500 to-green-600' 
          : 'bg-gradient-to-br from-primary-500 to-primary-600'
      }`}>
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(show.category)}`}>
            {show.category}
          </span>
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <motion.button
              onClick={handleToggleComplete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 rounded border-2 border-white flex items-center justify-center transition-all duration-200 ${
                show.completed 
                  ? 'bg-white text-green-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
            >
              {show.completed && (
                <SafeIcon icon={FiCheck} className="h-4 w-4" />
              )}
            </motion.button>
          </div>
          <div className="text-white flex-1">
            <h3 className={`font-semibold text-lg leading-tight ${
              show.completed ? 'line-through opacity-90' : ''
            }`}>
              {show.title}
            </h3>
            {show.completed && (
              <p className="text-xs text-white/80 mt-1">Completed</p>
            )}
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
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
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