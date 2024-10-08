import React, { useState } from 'react';

const API_KEY = 'ca2db8ecbe74194fc78809fc01a5ceca';  
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

function App() {
  const [text, setText] = useState('');  
  const [songs, setSongs] = useState([]);  

  const searchSongs = async () => {
    const url = `${BASE_URL}?method=track.search&track=${text}&api_key=${API_KEY}&format=json`;
    const response = await fetch(url);  
    const data = await response.json();  
    setSongs(data.results.trackmatches.track);  
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Song Search App</h1>
      <input 
        style={{ padding: '5px'}}
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}  
        placeholder="Enter Song Title" 
      />
      <button 
      style={{ padding: '5px', backgroundColor:'cyan'}}
      onClick={searchSongs}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {songs.map((song, index) => (
          <div key={index}>
            <h3>{song.name}</h3>
            <p>Artist: {song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
