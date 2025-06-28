export const groupShowsByLetter = (shows) => {
  const groups = {};
  
  // Initialize all letters and numbers
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numbers = '#'; // For shows starting with numbers
  
  // Initialize empty groups
  [...letters, numbers].forEach(key => {
    groups[key] = [];
  });
  
  // Group shows by first letter/number
  shows.forEach(show => {
    const firstChar = show.title.charAt(0).toUpperCase();
    
    if (/[0-9]/.test(firstChar)) {
      groups['#'].push(show);
    } else if (/[A-Z]/.test(firstChar)) {
      groups[firstChar].push(show);
    } else {
      // For special characters, group under '#'
      groups['#'].push(show);
    }
  });
  
  // Sort shows within each group
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => a.title.localeCompare(b.title));
  });
  
  return groups;
};

export const getOrderedGroups = (groupedShows) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const orderedGroups = [];
  
  // Add numbers first
  if (groupedShows['#'] && groupedShows['#'].length > 0) {
    orderedGroups.push({
      letter: '#',
      shows: groupedShows['#'],
      count: groupedShows['#'].length
    });
  }
  
  // Add letters A-Z
  letters.forEach(letter => {
    if (groupedShows[letter] && groupedShows[letter].length > 0) {
      orderedGroups.push({
        letter,
        shows: groupedShows[letter],
        count: groupedShows[letter].length
      });
    }
  });
  
  return orderedGroups;
};