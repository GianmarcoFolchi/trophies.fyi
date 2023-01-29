<<<<<<< Updated upstream
<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
=======
>>>>>>> Stashed changes
import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";

export default function App() {
  const isLoggedIn = () => true;

  return (
    <>
      {isLoggedIn() ? <HomePage></HomePage> : <LoginPage></LoginPage>}
    </>
  );
}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
