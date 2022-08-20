import React, { useState, useEffect } from 'react';

const Login = () => {
  const max = 6;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailValidation = /\S+@\S+\.\S+/;
    if (emailValidation.test(email) && password.length > max) {
      setDisabled(false);
    }
  }, [email, password, setDisabled]);

  return (
    <main>
      <form action="email">
        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            id="email"
            placeholder="Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => {
            localStorage.setItem('mealsToken', 1);
            localStorage.setItem('cocktailsToken', 1);
            const userEmail = {
              email,
            };
            localStorage.setItem('user', JSON.stringify(userEmail));
          } }
        >
          Entrar
        </button>
      </form>
    </main>
  );
};

export default Login;
