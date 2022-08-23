import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Teste da Header', () => {
  it('60% requisito 7 e 8', () => {
    renderWithRouter(<Header />);
    const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    // const searchBtn = screen.getByTestId('search-top-btn');
    // expect(searchBtn).toBeInTheDocument();
  });

  it('100% Header, teste botão search e caminho até profile', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, '1234567');
    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);

    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.getByText(/busca por ingredient/i)).toBeInTheDocument();

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(firstLetter).toBeInTheDocument();

    userEvent.click(firstLetter);
    expect(firstLetter).toBeChecked();

    userEvent.click(profileBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
