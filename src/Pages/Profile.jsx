import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  // 58 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
  // estava quebrando a 7, a 8 e a 17
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail) {
      setProfileEmail(userEmail);
    }
  }, []);

  const history = useHistory();

  return (
    <div>
      <Header titulo="Profile" showBtn={ false } />
      {/* 57 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo */}
      <div data-testid="profile-email">
        {`usuário: ${profileEmail.email}`}
      </div>
      {/* 59 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout" */}
      <button
        data-testid="profile-done-btn"
        type="button"
        // 60 - Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        // 61 - Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
