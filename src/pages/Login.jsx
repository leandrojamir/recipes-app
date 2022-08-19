import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');

  return (
    <main>
      <form action="email">
        <label htmlFor="email">
          <input type="text" data-testid="email-input" id="email" placeholder="Email" />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            data-testid="password-input"
            placeholder="Password"
          />
        </label>
        <button type="button" data-testid="login-submit-btn">Entrar</button>
      </form>
    </main>
  );
};

export default Login;
