import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListCategoryFoods } from '../service/api';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const { arrResults, setGetCategoryFoods, getCategoryFoods } = ContextRecipes();
  const maxNumber = 12;
  const maxCategory = 5;

  useEffect(() => {
    const resultFoods = async () => {
      await getListCategoryFoods(setGetCategoryFoods, maxCategory);
    };
    resultFoods();
  }, []);

  console.log(getCategoryFoods);
  return (
    <>
      <Header titulo="Foods" showBtn />
      <main>
        <section>
          { getCategoryFoods.length > 0
          && getCategoryFoods.map((food) => (
            <button
              type="button"
              key={ food.strCategory }
              name={ food.strCategory }
              data-testid={ `${food.strCategory}-category-filter` }
            >
              { food.strCategory }
            </button>
          )) }
        </section>
        <Recipes titulo="Foods" />
        <section>
          { arrResults && arrResults.slice(0, maxNumber)
            .map((food, index) => (
              <Link key={ food.idMeal } to={ `/food/${food.idMeal}` }>
                <RecipeCard
                  img={ food.strMealThumb }
                  name={ food.strMeal }
                  index={ index }
                />
              </Link>
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Foods;
