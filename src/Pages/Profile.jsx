import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  // 58 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
  const userEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header titulo="Profile" showBtn={ false } />
      {/* 57 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo */}
      <div data-testid="profile-email">
        {`usuário: ${userEmail.email}`}
      </div>
      {/* 59 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout" */}
      <button data-testid="profile-done-btn" type="button">
        Done Recipes
      </button>
      <button data-testid="profile-favorite-btn" type="button">
        Favorite Recipes
      </button>
      <button data-testid="profile-logout-btn" type="button">
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
