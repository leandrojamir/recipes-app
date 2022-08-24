export const fetchIngredients = async (ingrediente, type) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data.meals;
};

export const fetchName = async (name, type) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const fetchLetter = async (letter, type) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};
