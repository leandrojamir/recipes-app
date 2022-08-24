import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ContextRecipes } from '../context/recipesContext';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const { arrResults } = ContextRecipes();
  const maxNumber = 12;
  return (
    <>
      <Header titulo="Foods" showBtn />
      <Footer />
      <main>
        <h1>hello</h1>
        <section>
          { arrResults.slice(0, maxNumber)
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
    </>
  );
}

export default Foods;
