const categories = [
  "Geography",
  "Movies",
  "Music",
  "History",
  "Science/Tech",
  "Random",
];

const getRandomCategory = () => {
  const randomIdx = Math.floor(Math.random() * (categories.length - 1));
  return categories[randomIdx];
};

const categoryToApiName = {
  Movies: "movies",
  Geography: "geography",
  Music: "music",
  History: "history",
  "Science/Tech": "science-technology",
};

export default categories;
export { getRandomCategory, categoryToApiName };
