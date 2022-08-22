import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ titulo, showBtn }) {
  const history = useHistory();
  const [searchEnabled, setSearchEnabled] = useState(false);

  return (
    <header>
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
      {searchEnabled && (
        <label htmlFor="search">
          <input type="text" data-testid="search-input" id="search"/>
        </label>
      )}
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
