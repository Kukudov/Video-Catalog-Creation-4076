import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AlphabeticalSeparator from './AlphabeticalSeparator';
import { groupShowsByLetter, getOrderedGroups } from '../utils/showGrouping';

const { FiCalendar, FiTv, FiEdit2, FiSave, FiX, FiSearch, FiTrash2, FiCheck } = FiIcons;

const ShowListView = ({ shows, loading, onUpdate, onDelete, onToggleCompletion }) => {
  const [editingShow, setEditingShow] = useState(null);
  const [editedData, setEditedData] = useState({});

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

  const handleEdit = (show) => {
    setEditingShow(show.title);
    setEditedData({
      season: show.season,
      episode: show.episode
    });
  };

  const handleSave = (title) => {
    if (editedData.season > 0 && editedData.episode > 0) {
      onUpdate(title, editedData.season, editedData.episode);
      setEditingShow(null);
      setEditedData({});
    }
  };

  const handleCancel = () => {
    setEditingShow(null);
    setEditedData({});
  };

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setEditedData(prev => ({
        ...prev,
        [field]: numValue
      }));
    }
  };

  const handleDelete = (title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(title);
    }
  };

  const handleToggleComplete = (title) => {
    onToggleCompletion(title);
  };

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

  // Group shows alphabetically
  const groupedShows = groupShowsByLetter(shows);
  const orderedGroups = getOrderedGroups(groupedShows);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {orderedGroups.map(({ letter, shows: groupShows, count }) => (
        <div key={letter} id={`section-${letter}`}>
          <AlphabeticalSeparator letter={letter} count={count} />
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-white font-semibold text-sm">
                <div className="col-span-1">Done</div>
                <div className="col-span-4">Show Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Season</div>
                <div className="col-span-1">Episode</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Content */}
            <div className="divide-y divide-gray-100">
              {groupShows.map((show, index) => (
                <motion.div
                  key={`${show.title}-${show.season}-${show.episode}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                    show.completed ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Completion Checkbox */}
                    <div className="col-span-1">
                      <motion.button
                        onClick={() => handleToggleComplete(show.title)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          show.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {show.completed && (
                          <SafeIcon icon={FiCheck} className="h-3 w-3" />
                        )}
                      </motion.button>
                    </div>

                    {/* Title */}
                    <div className="col-span-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          show.completed ? 'bg-green-100' : 'bg-primary-100'
                        }`}>
                          <SafeIcon icon={FiTv} className={`h-4 w-4 ${
                            show.completed ? 'text-green-600' : 'text-primary-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold text-gray-900 text-sm leading-tight ${
                            show.completed ? 'line-through opacity-70' : ''
                          }`}>
                            {show.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Season {show.season}, Episode {show.episode}
                            {show.completed && (
                              <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                Completed
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(show.category)}`}>
                        {show.category}
                      </span>
                    </div>

                    {/* Season */}
                    <div className="col-span-2">
                      {editingShow === show.title ? (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiTv} className="h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            value={editedData.season}
                            onChange={(e) => handleInputChange('season', e.target.value)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                            min="1"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <SafeIcon icon={FiTv} className="h-4 w-4" />
                          <span>S{show.season.toString().padStart(2, '0')}</span>
                        </div>
                      )}
                    </div>

                    {/* Episode */}
                    <div className="col-span-1">
                      {editingShow === show.title ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={editedData.episode}
                            onChange={(e) => handleInputChange('episode', e.target.value)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                            min="1"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>E{show.episode.toString().padStart(2, '0')}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        {editingShow === show.title ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSave(show.title)}
                              className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition-colors duration-200"
                            >
                              <SafeIcon icon={FiSave} className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleCancel}
                              className="bg-gray-500 hover:bg-gray-600 text-white p-1.5 rounded-lg transition-colors duration-200"
                            >
                              <SafeIcon icon={FiX} className="h-3 w-3" />
                            </motion.button>
                          </>
                        ) : (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(show)}
                              className="bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-lg transition-colors duration-200"
                            >
                              <SafeIcon icon={FiEdit2} className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(show.title)}
                              className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors duration-200"
                            >
                              <SafeIcon icon={FiTrash2} className="h-3 w-3" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ShowListView;