import { useState } from "react";
import { apiFetch } from "../api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      onLogin(data);
      setError('');
    } catch (err) {
      console.error('Erreur login', err);
      setError('Identifiants incorrects ou serveur inaccessible.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Connexion</h3>

      <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Se connecter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
