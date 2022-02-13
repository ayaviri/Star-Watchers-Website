// Adds '%20' in between spaces of every word in multi-word search queries
export const encodeSpaceIntoQuery = (searchQuery) => {
  const queryAsList = searchQuery.split(' ');
  return queryAsList.join('%20');
};