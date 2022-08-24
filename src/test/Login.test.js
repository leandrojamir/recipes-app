import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const testEmail = 'teste@teste.com';
const testPassword = '1234567';

describe('Teste da Login', () => {
  it('45% requisito 4', () => {
    renderWithRouter(<App />);
    //
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue(testEmail);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue(testPassword);
  });
  it('Testando se o botao inicia desabilitado na tela', () => {
    renderWithRouter(<App />);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
  });

  it('tentanto deixar o mais proximo de 90% com botão', () => {
    renderWithRouter(<App />);

    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);
    expect(buttonEnter).not.toBeDisabled();
  });
  it('Testar se ao clicar no botao e redirecionado para pagina foods', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });

  it('profile do 8', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonEnter);

    history.push('/profile');

    expect(screen.getByRole('heading', { testEmail })).toBeInTheDocument();
  });
});
