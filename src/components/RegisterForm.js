import { useState } from "react";
import { apiFetch } from "../api";

function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmation,
        }),
      });

      onRegister(data);
      setMessage("Inscription réussie !");
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmation('');
    } catch (err) {
      setError(err.message || "Échec de l'inscription.");
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Inscription</h3>

      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirmation du mot de passe" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required />

      <button type="submit">S’inscrire</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default RegisterForm;
