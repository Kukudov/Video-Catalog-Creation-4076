import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTv, FiCheck, FiCalendar, FiTrendingUp } = FiIcons;

const Stats = ({ shows, filteredShows }) => {
  const totalShows = shows.length;
  const filteredCount = filteredShows.length;
  const completedShows = shows.filter(show => show.completed).length;
  const categories = [...new Set(shows.map(show => show.category))].length;
  const totalEpisodes = shows.reduce((sum, show) => sum + show.episode, 0);

  const stats = [
    {
      label: 'Total Shows',
      value: totalShows,
      icon: FiTv,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Completed',
      value: completedShows,
      icon: FiCheck,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Categories',
      value: categories,
      icon: FiCalendar,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Total Episodes',
      value: totalEpisodes,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;