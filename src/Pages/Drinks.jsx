import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListCategoryDrinks } from '../service/api';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const { arrResults, getCategoryDrinks, setGetCategoryDrinks } = ContextRecipes();
  const maxNumber = 12;
  const maxCategory = 5;

  useEffect(() => {
    const resultFoods = async () => {
      await getListCategoryDrinks(setGetCategoryDrinks, maxCategory);
    };
    resultFoods();
  }, []);
  console.log(getCategoryDrinks);
  return (
    <>
      <Header titulo="Drinks" showBtn />
      <main>
        { getCategoryDrinks.length > 0
        && getCategoryDrinks.map((drink) => (
          <button
            type="button"
            key={ drink.strCategory }
            name={ drink.strCategory }
            data-testid={ `${drink.strCategory}-category-filter` }
          >
            { drink.strCategory }
          </button>
        ))}
        <Recipes titulo="Drinks" />
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
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
