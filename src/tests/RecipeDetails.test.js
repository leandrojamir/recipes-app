// -----------------------------|---------|----------|---------|---------|--------------------------
// File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s        
// -----------------------------|---------|----------|---------|---------|--------------------------
                      
//   RecipeDetails.jsx          |   73.33 |    26.66 |   57.14 |   75.86 | 60-66,101
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import foods from './mocks/FoodsListMock';
import drinkList from './mocks/DrinksListMock';
import penne from './mocks/Penne';
import aquamarine from './mocks/Aquamarine';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {}
  }
});

const doneRecipes = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '',
  tags: [],
}]

describe('Teste para RecipeDetail', () => {
  it('testes para requisitos 29 e 36 - drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execBtn);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
    expect(await screen.findByText(/aquamarine/i)).toBeInTheDocument();
    expect(screen.getByText(/Hpnotiq - 2 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Pineapple Juice - 1 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Banana Liqueur - 1 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Shake well in a shaker/i)).toBeInTheDocument();
    //   RecipeDetails.jsx          |   96.66 |    83.33 |   85.71 |     100 | 76-97  
    // <h2 data-testid="recipe-category">Alcoholic</h2>
    const strAlcoholic = screen.getByTestId(/recipe-category/i);
    expect(strAlcoholic).toBeInTheDocument();
    expect(strAlcoholic).toHaveTextContent(/Alcoholic/i)
    // <img data-testid="recipe-photo" src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg" alt="Aquamarine">
    const strDrinkThumb = screen.getByTestId(/recipe-photo/i);
    expect(strDrinkThumb).toBeInTheDocument();

    const strVideo = screen.getByTestId(/video/i);
    expect(strVideo).toBeInTheDocument();   
    const shareButton = screen.getByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument(); 
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();

    const startBtn = screen.getByTestId(/start-recipe-btn/i);
    expect(startBtn).toBeInTheDocument();

    const corba = screen.getByTestId(/0-recomendation-card/)
    userEvent.click(corba)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977');
    });

  });

  it('testes para requisitos 29 e 36 - foods', async () => {
    // jest.restoreAllMocks();

    // jest.spyOn(window, 'fetch');
    // window.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(foods),
    // });
    
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods');
    });

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execBtn);

    // const corbaMeal = screen.getAllByTestId(/shopping-cart-button/);
    // userEvent.click(corbaMeal[0])

    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977');
    });

    // jest.restoreAllMocks();

    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(drinkList),
    // });

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/Lentils - 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Onion - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/carrots - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/tomato puree - 1 tbs/i)).toBeInTheDocument();
    expect(screen.getByText(/Cumin - 2 tsp/i)).toBeInTheDocument();
    expect(screen.getByText(/Paprika - 1 tsp/i)).toBeInTheDocument();
    expect(screen.getByText('Mint - 1/2 tsp')).toBeInTheDocument();
    expect(screen.getByText('Thyme - 1/2 tsp')).toBeInTheDocument();
    expect(screen.getByText('Black Pepper - 1/4 tsp')).toBeInTheDocument();
    expect(screen.getByText(/Vegetable Stock - 4 cups/i)).toBeInTheDocument();
    expect(screen.getByText(/Water - 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Sea Salt - Pinch/i)).toBeInTheDocument();

    
    const strCategory = screen.getByTestId(/recipe-category/i);
    const categoryH2 = screen.getByRole('heading', {level: 2})
    expect(categoryH2).toHaveTextContent(/Side/i)
    expect(strCategory).toBeInTheDocument();
    const strMealThumb = screen.getByTestId(/recipe-photo/i);
    expect(strMealThumb).toBeInTheDocument();
    
    const shareButton = screen.getByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument(); 

    // userEvent.click(shareButton);

    
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    const strVideo = screen.getByTestId(/video/i);
    expect(strVideo).toBeInTheDocument();
    
    // const linkCopied = screen.findByText(/Link copied!/i);
    // expect(linkCopied).toBeInTheDocument();

    const instructions = screen.getByTestId(/instructions/i)
    expect(instructions).toBeInTheDocument();

    const startBtn = screen.getByTestId(/start-recipe-btn/i);
    expect(startBtn).toBeInTheDocument();

    const ggDrink = screen.getByTestId(/0-recomendation-card/)
    userEvent.click(ggDrink)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
      expect(screen.getByTestId(/recipe-title/i)).toHaveTextContent(/GG/i);
    });

    // const title = await screen.findByTestId(/recipe-title/i);
  });

  it('Testando a rota do bota start', async () => {
        
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods');
    });

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execBtn);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977');
    });

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/Lentils - 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Onion - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/carrots - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/tomato puree - 1 tbs/i)).toBeInTheDocument();

    const strMealThumb = screen.getByTestId(/recipe-photo/i);
    expect(strMealThumb).toBeInTheDocument();
    
    const shareButton = screen.getByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument(); 
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    const strVideo = screen.getByTestId(/video/i);
    expect(strVideo).toBeInTheDocument();   

    const startBtn = screen.getByTestId(/start-recipe-btn/i);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn)

    history.push('/foods/52977/in-progress')
      expect(history.location.pathname).toBe('/foods/52977/in-progress');

    await waitFor(() => {      
      expect(localStorage.getItem('inProgressRecipes')).toBeTruthy()
    })

    
  });

  it('Teste lista de recomendações e favoritos', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods');
    });

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977');
    });

    const recomendation = await screen.findAllByTestId(/recomendation-card/i)

    expect(recomendation).toHaveLength(6);

    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    const blackColor = 'blackHeartIcon.svg';
    expect(favBtn).toHaveAttribute('src', blackColor);
    expect(localStorage.getItem('favoriteRecipes')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].id).toEqual('52977');
    userEvent.click(favBtn);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0]).toBe(undefined);

  })

  it('Testando a rota do bota start', async () => {
    localStorage.clear();
       
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execBtn);

      
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });

        
    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument(); 
    const favoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    const strVideo = await screen.findByTestId(/video/i);
    expect(strVideo).toBeInTheDocument();   

    const startBtn = await screen.findByTestId(/start-recipe-btn/i);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn)

    // history.push('/drinks/178319/in-progress')
    
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    await waitFor(() => {      
      expect(localStorage.getItem('inProgressRecipes')).toBeTruthy();
      history.push('/drinks/178319');
      expect(history.location.pathname).toBe('/drinks/178319');
      const startButton = screen.getByTestId(/start-recipe-btn/i)
      expect(startButton).toHaveTextContent('Continue Recipe');
    })

  });

  it('Testando o botão share', async () => {
    localStorage.clear();
    jest.spyOn(navigator.clipboard, 'writeText');
    navigator.clipboard.writeText('http://localhost:3000/drinks/178319')

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execBtn);

      
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });

    
    const startBtn = await screen.findByTestId(/start-recipe-btn/i);
    expect(startBtn).toBeInTheDocument();

    const shareButton = await screen.findByTestId(/share-btn/i);
    // expect(linkCopied).toBeNull();
    userEvent.click(shareButton);
    const linkCopied = await screen.findByText(/Link copied!/i)
    expect(linkCopied).toBeInTheDocument(); 

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    expect(localStorage.getItem('doneRecipes')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('doneRecipes'))[0].id).toEqual('178319');
    const startButton = screen.getByTestId(/start-recipe-btn/i)
    // expect(startButton).not.toBeInTheDocument(); 
  })

  it('Testando a chamada da API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquamarine)
    })

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    userEvent.click(name);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execBtn);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });
  })
});