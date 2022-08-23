import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <div>
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          onClick={ () => history.push('/drinks') }
        >
          <img
            src={ drinkIcon }
            alt="Drinks Icon"
          />
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="food-bottom-btn"
          src="../images/mealIcon.svg"
          onClick={ () => history.push('/foods') }
        >
          <img
            src={ mealIcon }
            alt="Food Icon"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
