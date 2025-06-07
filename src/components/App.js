import { useState } from 'react';
import '../styles/App.css';
import Banner from './Banner';
import Feed from './Feed';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


function App() {
  const [user, setUser] = useState(null);
  const [formMode, setFormMode] = useState(null); // 'login' ou 'register'

  const handleLogin = (data) => {
    setUser(data); // Tu peux adapter selon ce que renvoie ton API
    setFormMode(null); // Revenir à l’état neutre
  };

  const handleLogout = () => setUser(null);

  return (
    <div className="App">
      <header className="App-header">
        <Banner />

        <div className="login-area">
          {!user ? (
            <>
              <div>
                <button onClick={() => setFormMode('login')}>Se connecter</button>
                <button onClick={() => setFormMode('register')}>S’inscrire</button>
              </div>

              {formMode === 'login' && <LoginForm onLogin={handleLogin} />}
              {formMode === 'register' && <RegisterForm onRegister={handleLogin} />}
            </>
          ) : (
            <>
              <p>Connecté en tant que : {user.nom}</p>
              <button onClick={handleLogout}>Se déconnecter</button>
            </>
          )}
        </div>
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
// App.js