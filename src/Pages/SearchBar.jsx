import React from 'react';

function SearchBar() {
  return (
    <div>
      <h1>SearchBar</h1>
      <label htmlFor="input-search">
        <input
          type="text"
          id="input-search"
          placeholder="input-search"
        />
      </label>
      <label htmlFor="ingredient-search">
        Busca por ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
        />
      </label>
      <label htmlFor="name-search">
        Busca por nome
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search"
        />
      </label>
      <label htmlFor="first-letter-search">
        Busca da primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
