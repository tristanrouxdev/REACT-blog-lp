// src/components/RegisterForm.js
import React, { useState } from 'react';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation: passwordConf,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      onRegister(data.access_token, data.data || data.user || data);
      setMessage('Inscription réussie !');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmer mot de passe"
        value={passwordConf}
        onChange={e => setPasswordConf(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}