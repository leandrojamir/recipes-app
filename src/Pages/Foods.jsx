import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Foods() {
  return (
    <div>
      <Header titulo="Foods" showBtn />
      <Recipes titulo="Foods" />
      <Footer />
    </div>
  );
}

export default Foods;
