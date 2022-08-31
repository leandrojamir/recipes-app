import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserCircle, MagnifyingGlass } from 'phosphor-react';
import { ContextRecipes } from '../context/recipesContext';
import SearchBar from './SearchBar';

function Header({ titulo, showBtn }) {
  const { setType } = ContextRecipes();
  const history = useHistory();
  const [searchEnabled, setSearchEnabled] = useState(false);

  // food or drink
  setType(titulo);

  return (
    <header>
      <div>
        <button
          type="button"
          data-testid="profile-top-btn"
          src="./images/profileIcon.svg"
          onClick={ () => history.push('/profile') }
        >
          <UserCircle size={ 45 } color="#f4f4f4" />
        </button>
        <h1 data-testid="page-title">{titulo}</h1>
        { showBtn && (
          <button
            type="button"
            data-testid="search-top-btn"
            src="src/images/searchIcon.svg"
            onClick={ () => setSearchEnabled(!searchEnabled) }
          >
            <MagnifyingGlass size={ 45 } color="#f7f2fd" />
          </button>
        ) }
      </div>
      {searchEnabled && (<SearchBar />)}
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
