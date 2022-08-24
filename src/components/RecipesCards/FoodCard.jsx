import React from 'react';
import { ContextRecipes } from '../../context/recipesContext';
import './cardStyle.css';

const maxNumberList = 12;

function FoodCard() {
  const { foodsList } = ContextRecipes();

  return (
    <div>
      { foodsList && foodsList.meals
        .filter((_, index) => index < maxNumberList).map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="carta"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
              className="foto"
            />
            <h5
              data-testid={ `${index}-card-name` }
            >
              { food.strMeal }

            </h5>
          </div>
        ))}
    </div>
  );
}

export default FoodCard;
