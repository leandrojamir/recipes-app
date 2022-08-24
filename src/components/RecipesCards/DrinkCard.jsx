import React from 'react';
import { ContextRecipes } from '../../context/recipesContext';

const maxNumberList = 12;

function DrinkCard() {
  const { drinksList } = ContextRecipes();

  return (
    <div>
      { drinksList && drinksList.drinks
        .filter((_, index) => index < maxNumberList).map((beverage, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ beverage.strDrinkThumb }
              alt={ beverage.strDrink }
            />
            <h5
              data-testid={ `${index}-card-name` }
            >
              { beverage.strDrink }

            </h5>
          </div>
        ))}
    </div>
  );
}

export default DrinkCard;
