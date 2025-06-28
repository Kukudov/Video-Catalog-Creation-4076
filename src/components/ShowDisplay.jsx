import React from 'react';
import ShowGrid from './ShowGrid';
import ShowListView from './ShowListView';
import AlphabetNavigator from './AlphabetNavigator';
import { groupShowsByLetter, getOrderedGroups } from '../utils/showGrouping';

const ShowDisplay = ({ currentView, shows, loading, onUpdate, onDelete, onToggleCompletion }) => {
  // Get available letters for navigator
  const groupedShows = groupShowsByLetter(shows);
  const orderedGroups = getOrderedGroups(groupedShows);
  const availableLetters = orderedGroups.map(group => group.letter);

  return (
    <div className="relative">
      {/* Alphabet Navigator - only show when there are shows */}
      {!loading && shows.length > 0 && (
        <AlphabetNavigator availableLetters={availableLetters} />
      )}

      {/* Main content */}
      <div>
        {currentView === 'list' ? (
          <ShowListView 
            shows={shows} 
            loading={loading} 
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleCompletion={onToggleCompletion}
          />
        ) : (
          <ShowGrid 
            shows={shows} 
            loading={loading} 
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleCompletion={onToggleCompletion}
          />
        )}
      </div>
    </div>
  );
};

export default ShowDisplay;