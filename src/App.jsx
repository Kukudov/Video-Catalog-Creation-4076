import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Stats from './components/Stats';
import ShowGrid from './components/ShowGrid';
import AddShowModal from './components/AddShowModal';
import { useShows } from './hooks/useShows';
import { categories } from './data/shows';

function App() {
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const {
    shows,
    filteredShows,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    loading,
    updateShow,
    addShow
  } = useShows();

  const handleAddShow = (newShow) => {
    addShow(newShow);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        onAddShow={() => setShowAddModal(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Stats shows={shows} filteredShows={filteredShows} />
          <ShowGrid shows={filteredShows} loading={loading} onUpdate={updateShow} />
        </motion.div>
      </main>

      <AddShowModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddShow}
      />
    </div>
  );
}

export default App;