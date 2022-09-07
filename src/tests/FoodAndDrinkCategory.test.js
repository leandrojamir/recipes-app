// src/context                   |   50.72 |        0 |      50 |   50.72 |                    
// recipesContext.jsx            |   50.72 |        0 |      50 |   50.72 | 45-59,64-78,95-100 


// describe('aumentar cobertura do recipesContext', () => {

//     it('futura ideia testar categoria food linhas 45 a 59', async () => {
//       // data-testid={ `${food.strCategory}-category-filter` }      


//     })
//     it('futura ideia testar categoria drink linhas 64 a 78', async () => {
//       // data-testid={ `${drink.strCategory}-category-filter` }

//     })
//     it('futura ideia testar categoria all linhas 95 (83 testada)', async () => {
//       // data-testid="All-category-filter"
  
//     })
// });


import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from "./helpers/renderWithRouter";
import App from "../App";

describe('aumentar cobertura do recipesContext', () => {
  it('45-55 foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(await screen.findByTestId(/All-category-filter/i))
    // <button type="button" name="Beef" data-testid="Beef-category-filter">Beef</button>
    expect(await screen.findByTestId(/Beef-category-filter/i))
    expect(screen.getByTestId(/Breakfast-category-filter/i))
    expect(screen.getByTestId(/Chicken-category-filter/i))
    expect(screen.getByTestId(/Dessert-category-filter/i))
    expect(screen.getByTestId(/Goat-category-filter/i))
  })

  it('64-74 drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(await screen.findByTestId(/All-category-filter/i))
    // <button type="button" name="Ordinary Drink" data-testid="Ordinary Drink-category-filter">Ordinary Drink</button>
    expect(await screen.findByTestId(/Ordinary Drink-category-filter/i))
    expect(screen.getByTestId(/Cocktail-category-filter/i))
    expect(screen.getByTestId(/Shake-category-filter/i))
    // <button type="button" name="Other/Unknown" data-testid="Other/Unknown-category-filter">Other/Unknown</button>
    expect(screen.getByTestId('Other/Unknown-category-filter'))
    expect(screen.getByTestId(/Cocoa-category-filter/i))
  })

  it('botões de categoria estão sendo rederizados na tela foods',async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
  
    const beef = await screen.findByTestId('Beef-category-filter');
    fireEvent.click(beef);   
    expect(await screen.findByText('Beef'))
    const all = await screen.findByTestId('All-category-filter');
    fireEvent.click(all);
    expect(await screen.findByText('Corba'));
  })

  it('botões de categoria estão sendo rederizados na tela drinks',async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const Shake = await screen.findByTestId('Shake-category-filter');
    fireEvent.click(Shake);
    // <img data-testid="0-card-img" src="https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg" alt="151 Florida Bushwacker"></img>
    
    // await waitFor(() => {
    //   const drinkImg = screen.getByText(/card-img/i);
    //   expect(drinkImg).toHaveAttribute(
    //     'src',
    //     'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg'
    //   );
    // });
    expect(await screen.findByText('151 Florida Bushwacker'))
    // <img data-testid="0-card-img" src="https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg" alt="Castillian Hot Chocolate">
    // <button type="button" name="Cocoa" data-testid="Cocoa-category-filter">Cocoa</button>
    const cocoa = await screen.findByTestId('Cocoa-category-filter');
    fireEvent.click(cocoa);
    expect(await screen.findByText('Castillian Hot Chocolate'))

    const all = await screen.findByTestId('All-category-filter');
    fireEvent.click(all);
    expect(await screen.findByText('GG'));
  });
});

// -------------------------------|---------|----------|---------|---------|--------------------
// File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
// -------------------------------|---------|----------|---------|---------|--------------------
// All files                      |   91.22 |    83.65 |    92.1 |   91.02 |                    
//  src                           |     100 |      100 |     100 |     100 |                    
//   App.jsx                      |     100 |      100 |     100 |     100 |                    
//  src/Pages                     |     100 |      100 |     100 |     100 |                    
//   DoneRecipes.jsx              |     100 |      100 |     100 |     100 |                    
//   Drinks.jsx                   |     100 |      100 |     100 |     100 |                    
//   DrinksID.jsx                 |     100 |      100 |     100 |     100 |                    
//   FavoriteRecipes.jsx          |     100 |      100 |     100 |     100 |                    
//   Foods.jsx                    |     100 |      100 |     100 |     100 |                    
//   FoodsID.jsx                  |     100 |      100 |     100 |     100 |                    
//   Login.jsx                    |     100 |      100 |     100 |     100 |                    
//   Profile.jsx                  |     100 |      100 |     100 |     100 |                    
//  src/components                |    89.6 |    82.66 |   85.33 |   89.43 |                    
//   DrinksRecommendation.jsx     |      90 |      100 |     100 |      90 | 15                 
//   FavoriteDrink.jsx            |       0 |        0 |       0 |       0 | 8-44               
//   FavoriteMeal.jsx             |      60 |    21.42 |      20 |      60 | 16-35,46-48,53     
//   FavoriteRecipeInProgress.jsx |     100 |      100 |     100 |     100 |                    
//   FoodsRecommendation.jsx      |     100 |      100 |     100 |     100 |                    
//   Footer.jsx                   |     100 |      100 |     100 |     100 |                    
//   Header.jsx                   |     100 |      100 |     100 |     100 |                    
//   RecipeCard.jsx               |     100 |      100 |     100 |     100 |                    
//   RecipeDetails.jsx            |     100 |    96.42 |     100 |     100 | 26                 
//   RecipeInProgress.jsx         |     100 |       90 |     100 |     100 | 27,114-116,119-120 
//   Recipes.jsx                  |     100 |      100 |     100 |     100 |                    
//   SearchBar.jsx                |   93.75 |       90 |     100 |   93.47 | 36-38              
//   ShareButton.jsx              |      75 |      100 |      50 |      75 | 12-13              
//   StartContinueButton.jsx      |   78.57 |    64.28 |      75 |   78.57 | 13,23,26           
//  src/components/RecipesCards   |     100 |      100 |     100 |     100 |                    
//   DrinkCard.jsx                |     100 |      100 |     100 |     100 |                    
//   FoodCard.jsx                 |     100 |      100 |     100 |     100 |                    
//  src/context                   |    85.5 |       50 |     100 |    85.5 |                    
//   recipesContext.jsx           |    85.5 |       50 |     100 |    85.5 | 55-59,74-78        
//  src/hook                      |    91.3 |       60 |     100 |    91.3 |                    
//   useLocalStorage.js           |   85.71 |     62.5 |     100 |   85.71 | 6,13               
//   useResponseFilter.js         |     100 |       50 |     100 |     100 | 10                 
//  src/service                   |   79.16 |      100 |      80 |   79.16 |                    
//   api.js                       |   79.16 |      100 |      80 |   79.16 | 17,22-25           
// -------------------------------|---------|----------|---------|---------|--------------------
