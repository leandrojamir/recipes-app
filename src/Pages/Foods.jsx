import React from 'react';
import Header from '../components/Header';
import SearchBar from './SearchBar';

function Foods() {
  return (
    <div>
      <Header titulo="Foods" showBtn />
      <SearchBar />
    </div>
  );
}

export default Foods;
