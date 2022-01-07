import logo from './logo.svg';
import './App.css';

function App() {
  const load_playlists = async () => {
    const res = await fetch('/api/get_playlists');
    const playlist_data = await res.json();
    return playlist_data;
  }

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
      <p>playlist data: {load_playlists}</p>
    </div>
  );
}

export default App;
