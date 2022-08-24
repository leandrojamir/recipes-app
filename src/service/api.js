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
  } catch (error) {
    console.error(error.msg);
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
