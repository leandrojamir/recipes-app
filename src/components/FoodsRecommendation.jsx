import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllMeals } from '../service/api';
import { ContextRecipes } from '../context/recipesContext';
import './recommendation.css';

const maxNumberList = 6;

function FoodsRecommendation() {
  const { foodsList, setFoodsList } = ContextRecipes();

  useEffect(() => {
    const getRecipes = async () => {
      const foodApi = await fetchAllMeals();
      setFoodsList(foodApi);
    };
    getRecipes();
  }, []);

  return (
    <div
      className="scrollmenu"
      data-testid="recomendation-card"
    >
      { foodsList && foodsList.meals
        .filter((_, index) => index < maxNumberList).map((food, index) => (
          <Link
            to={ `/drinks/${food.idMeal}` }
            key={ index }
          >
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
                className="foto"
              />
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { food.strMeal }

              </h5>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default FoodsRecommendation;
