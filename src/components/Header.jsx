import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ titulo, showBtn }) {
  return (
    <>
      <h1 data-testid="page-title">{titulo}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="./images/profileIcon.svg"
      >
        <img src={ profileIcon } alt="Profile" />
      </button>
      { showBtn && (
        <button
          type="button"
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
        >
          <img src={ searchIcon } alt="Search" />
        </button>
      ) }
    </>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
