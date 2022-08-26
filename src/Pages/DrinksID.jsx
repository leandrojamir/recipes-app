import React from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FoodsRecommendation from '../components/FoodsRecommendation';

function DrinksId() {
  return (
    <>
      <h1>DrinksId</h1>
      <RecipeDetails type="drinks" />
      <FoodsRecommendation />
    </>
  );
}

export default DrinksId;
