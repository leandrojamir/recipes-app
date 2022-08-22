export const fetchIngredients = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error.msg);
  }
};

export const fetchName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.msg);
  }
};

export const fetchLetter = async (letter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.msg);
  }
};
