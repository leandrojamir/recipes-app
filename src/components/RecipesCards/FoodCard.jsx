import React from 'react';
import { Link } from 'react-router-dom';
import { ContextRecipes } from '../../context/recipesContext';
import './cardStyle.css';

const maxNumberList = 12;

function FoodCard() {
  const { foodsList } = ContextRecipes();

  return (
    <div>
      { foodsList && foodsList.meals
        .filter((_, index) => index < maxNumberList).map((food, index) => (
          <Link
            to={ `/foods/${food.idMeal}` }
            key={ index }
            data-testid="shopping-cart-button"
          >
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
          </Link>
        ))}
    </div>
  );
}

export default FoodCard;
