// iniciando projeto
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import FoodsId from './Pages/FoodsID';
import DrinksId from './Pages/DrinksID';
import Profile from './Pages/Profile';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/foods" render={ (props) => <Foods { ...props } /> } />
      <Route exact path="/foods/:id" render={ (props) => <FoodsId { ...props } /> } />
      <Route exact path="/drinks" render={ (props) => <Drinks { ...props } /> } />
      <Route exact path="/drinks/:id" render={ (props) => <DrinksId { ...props } /> } />
      <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
      <Route
        exact
        path="/recipeInProgress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => <DoneRecipes { ...props } /> }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => <FavoriteRecipes { ...props } /> }
      />
    </Switch>
  );
}

export default App;
