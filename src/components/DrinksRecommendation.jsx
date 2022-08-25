import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllDrinks } from '../service/api';
import { ContextRecipes } from '../context/recipesContext';
import './recommendation.css';

const maxNumberList = 6;

function DrinksRecommendation() {
  const { drinksList, setDrinksList } = ContextRecipes();

  useEffect(() => {
    const getRecipes = async () => {
      const drinkApi = await fetchAllDrinks();
      setDrinksList(drinkApi);
    };
    getRecipes();
  }, []);

  return (
    <div
      className="scrollmenu"
      data-testid="recomendation-card"
    >
      { drinksList && drinksList.drinks
        .filter((_, index) => index < maxNumberList).map((beverage, index) => (
          <Link
            to={ `/drinks/${beverage.idDrink}` }
            key={ index }
          >
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ beverage.strDrinkThumb }
                alt={ beverage.strDrink }
                className="foto"
              />
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { beverage.strDrink }

              </h5>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default DrinksRecommendation;
