import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const {
    arrResults,
    getCategoryDrinks,
    handleClickCategoryDrink,
    filterCategoryDrinks,
    handleClickBtnAllDrinks,
    showRecipes,
  } = ContextRecipes();

  const maxNumber = 12;
  const maxCategory = 5;
  //console.log(filterCategoryDrinks);
  return (
    <>
      <Header titulo="Drinks" showBtn />
      <main>
        <section>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickBtnAllDrinks }
          >
            All
          </button>

          { getCategoryDrinks.length > 0
          && getCategoryDrinks.slice(0, maxCategory).map((drink) => (
            <button
              type="button"
              key={ drink.strCategory }
              name={ drink.strCategory }
              onClick={ handleClickCategoryDrink }
              data-testid={ `${drink.strCategory}-category-filter` }
            >
              { drink.strCategory }
            </button>
          ))}
        </section>

        { showRecipes && <Recipes titulo="Drinks" /> }

        <section>
          { arrResults && arrResults.slice(0, maxNumber)
            .map((drink, index) => (
              <Link key={ drink.idDrink } to={ `/drinks/${drink.idDrink}` }>
                <RecipeCard
                  img={ drink.strDrinkThumb }
                  name={ drink.strDrink }
                  index={ index }
                />
              </Link>
            ))}
        </section>
        <section>
          { filterCategoryDrinks
            && filterCategoryDrinks.slice(0, maxNumber)
              .map((drink, index) => (
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ drink.strDrink }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    { drink.strDrink }
                  </p>
                </div>
              ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
