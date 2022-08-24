export const fetchIngredients = async (ingrediente, type) => {
  try {
    const response = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchName = async (name, type) => {
  try {
    const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('error');
  }
};

export const fetchLetter = async (letter, type) => {
  try {
    const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllDrinks = async () => {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await data.json();
  return response;
};

export const fetchAllMeals = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = data.json();
  return response;
};
