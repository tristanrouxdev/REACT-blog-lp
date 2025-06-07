// src/components/LoginForm.js
import { useState } from 'react';
import { apiFetch } from '../api';

export default function LoginForm({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // récupère CSRF
      await apiFetch('/sanctum/csrf-cookie');
      // login
      const res = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Échec de la connexion');
      onLogin(data.user || data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h3>Connexion</h3>
      <input type="email"    placeholder="E-mail"    value={email}    onChange={e => setEmail(e.target.value)}    required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
