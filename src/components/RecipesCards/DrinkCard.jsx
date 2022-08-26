import React from 'react';
import { Link } from 'react-router-dom';
import { ContextRecipes } from '../../context/recipesContext';
import './cardStyle.css';

const maxNumberList = 12;

function DrinkCard() {
  const { drinksList } = ContextRecipes();

  return (
    <div>
      { drinksList && drinksList.drinks
        .filter((_, index) => index < maxNumberList).map((beverage, index) => (
          <Link
            to={ `/drinks/${beverage.idDrink}` }
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
                src={ beverage.strDrinkThumb }
                alt={ beverage.strDrink }
                className="foto"
              />
              <h5
                data-testid={ `${index}-card-name` }
              >
                { beverage.strDrink }

              </h5>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default DrinkCard;
