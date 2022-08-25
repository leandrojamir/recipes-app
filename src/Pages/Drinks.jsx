import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const { arrResults } = ContextRecipes();
  const maxNumber = 12;
  return (
    <>
      <Header titulo="Drinks" showBtn />
      <Recipes titulo="Drinks" />
      <main>
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
