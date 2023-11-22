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

export default categories;
export { getRandomCategory };
