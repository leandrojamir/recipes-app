import React from 'react';
import DrinksRecommendation from '../components/DrinksRecommendation';
import RecipeDetails from '../components/RecipeDetails';
import '../components/recommendation.css';

function FoodsId() {
  return (
    <>
      <h1>FoodsId</h1>
      <RecipeDetails type="meals" />
      <DrinksRecommendation />
    </>
  );
}

export default FoodsId;
