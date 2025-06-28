import { useState, useEffect, useMemo } from 'react';
import { showsData } from '../data/shows';

export const useShows = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState(showsData);
  const [currentView, setCurrentView] = useState('grid');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateShow = (title, newSeason, newEpisode) => {
    setShows(prevShows =>
      prevShows.map(show =>
        show.title === title
          ? { ...show, season: newSeason, episode: newEpisode }
          : show
      )
    );
  };

  const deleteShow = (title) => {
    setShows(prevShows =>
      prevShows.filter(show => show.title !== title)
    );
  };

  const addShow = (newShow) => {
    setShows(prevShows => [...prevShows, { ...newShow, completed: false }]);
  };

  const toggleShowCompletion = (title) => {
    setShows(prevShows =>
      prevShows.map(show =>
        show.title === title
          ? { ...show, completed: !show.completed }
          : show
      )
    );
  };

  const filteredShows = useMemo(() => {
    let filtered = shows;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(show => show.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(show =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [shows, searchTerm, selectedCategory]);

  return {
    shows,
    filteredShows,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    loading,
    updateShow,
    deleteShow,
    addShow,
    toggleShowCompletion,
    currentView,
    setCurrentView
  };
};