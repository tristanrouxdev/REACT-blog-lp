// src/App.js
import { useState, useEffect } from 'react';
import '../styles/App.css';
import Banner from './Banner';
import Feed from './Feed';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function App() {
  const [user, setUser] = useState(null);
  const [formMode, setFormMode] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error('Non autorisé');
          return res.json();
        })
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const handleLogin = (accessToken, userData) => {
    localStorage.setItem('token', accessToken);
    setUser(userData);
    setFormMode(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Banner />
        <h2>B2LP - Le Blog !</h2>
        {!user ? (
          <>
            <button onClick={() => setFormMode('login')}>Se connecter</button>
            <button onClick={() => setFormMode('register')}>S'inscrire</button>
            {formMode === 'login' && <LoginForm onLogin={handleLogin} />}
            {formMode === 'register' && <RegisterForm onRegister={handleLogin} />}
          </>
        ) : (
          <div>
            Connecté en tant que {user.name || user.nom}
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        )}
      </header>

      <main className="App-main">
        <Feed user={user} />
      </main>

      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;