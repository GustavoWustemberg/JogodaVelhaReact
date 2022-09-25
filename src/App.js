import './App.css';
import Game from './Game.js'
import Logo from './img/logo.jpg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className='logo' src={Logo} />
        <Game />
      </header>
    </div>
  );
}

export default App;
