import React from 'react';

function RecipeDetails() {
  const getApiFood = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
    const data = await result.json();
    const dataId = data.meals;
    console.log(dataId);
  };

  const getApiDrink = async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007');
    const data = await result.json();
    const dataId = data.drinks;
    console.log(dataId);
  };
  getApiFood();
  getApiDrink();

  return (
    <h1>RecipeDetails</h1>
  );
}

export default RecipeDetails;
