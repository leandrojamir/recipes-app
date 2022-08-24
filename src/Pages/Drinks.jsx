import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header titulo="Drinks" showBtn />
      <Recipes titulo="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
