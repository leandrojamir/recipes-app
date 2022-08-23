import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ContextRecipes } from '../context/recipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ titulo, showBtn }) {
  const { setType } = ContextRecipes();
  const history = useHistory();
  const [searchEnabled, setSearchEnabled] = useState(false);

  // food or drink
  setType(titulo);

  return (
    <header>
      {/* Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa */}

      <h1 data-testid="page-title">{titulo}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="./images/profileIcon.svg"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Profile" />
      </button>
      { showBtn && (
        <button
          type="button"
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
          onClick={ () => setSearchEnabled(!searchEnabled) }
        >
          <img src={ searchIcon } alt="Search" />
        </button>
      ) }
      {searchEnabled && (<SearchBar />)}
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
