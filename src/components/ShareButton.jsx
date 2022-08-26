import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const ShareButton = () => {
  const [copyLink, setCopyLink] = useState('');
  const history = useHistory();

  const handleClickShare = () => {
    copy(`${window.location.origin}${history.location.pathname}`);
    setCopyLink('Link copied!');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShare }
      >
        <img src={ Share } alt="compartilhar" />
      </button>
      <p>{copyLink}</p>
    </div>
  );
};
export default ShareButton;
