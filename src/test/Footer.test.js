import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import Profile from '../Pages/Profile';

const testEmail = 'teste@teste.com';
const testPassword = '1234567';

describe('Teste da Login', () => {
  it('Testar os botões corretos', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    const mealBtn = screen.getByTestId('food-bottom-btn');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Testar se ao clicar no botão é redirecionado para as páginas corretas', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);

    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    const { location: { pathname } } = history;
    // const { location: { pathname } } = histo
    expect(pathname).toBe('/drinks');
  });

  it('Testar se ao clicar no botão é redirecionado para as páginas corretas', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const mealBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(mealBtn);

    expect(pathname).toBe('/foods');
  });
});
