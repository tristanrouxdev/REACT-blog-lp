import '../styles/App.css';
import Banner from './Banner';
import Feed from './Feed';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner />
      </header>
      <main className="App-main">
        <Feed />
      </main>
      <div className="App-footer">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
