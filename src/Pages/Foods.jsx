import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const { arrResults, getCategoryFoods, showRecipes } = ContextRecipes();
  const maxNumber = 12;
  const maxCategory = 5;
  console.log(getCategoryFoods);
  return (
    <>
      <Header titulo="Foods" showBtn />

      <main>
        <section>
          { getCategoryFoods.length > 0
          && getCategoryFoods.slice(0, maxCategory).map((food) => (
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
        { showRecipes && <Recipes titulo="Foods" /> }
        <section>
          { arrResults && arrResults.slice(0, maxNumber)
            .map((food, index) => (
              <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
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
