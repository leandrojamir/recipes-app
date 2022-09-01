import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
  const { img, name, key, index } = props;
  // key recebe id2
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link key={ key } to={ `/drinks/${key}` }>
        <img
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
      </Link>
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
};

RecipeCard.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default RecipeCard;
