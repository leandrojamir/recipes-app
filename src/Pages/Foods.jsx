import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const {
    arrResults,
    getCategoryFoods,
    filterCategoryFoods,
    handleClickCategoryFood,
    handleClickBtnAllFoods,
    showRecipes,
  } = ContextRecipes();

  const maxNumber = 12;
  const maxCategory = 5;

  return (
    <>
      <Header titulo="Foods" showBtn />

      <main>
        <section>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickBtnAllFoods }
          >
            All
          </button>
          { getCategoryFoods.length > 0
                && getCategoryFoods.slice(0, maxCategory).map((food) => (
                  <button
                    type="button"
                    key={ food.strCategory }
                    name={ food.strCategory }
                    onClick={ handleClickCategoryFood }
                    data-testid={ `${food.strCategory}-category-filter` }
                  >
                    { food.strCategory }
                  </button>
                )) }
        </section>
        <section>
          { filterCategoryFoods
          && filterCategoryFoods.slice(0, maxNumber)
            .map((category, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ category.strMeal }
              >
                <img
                  src={ category.strMealThumb }
                  alt={ category.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { category.strMeal }
                </p>

              </div>
            ))}
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
