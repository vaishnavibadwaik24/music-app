import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import SongDetails from './SongDetails';

const API_KEY = 'ca2db8ecbe74194fc78809fc01a5ceca';  
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

export default function Home() {
    const [text, setText] = useState('');
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const searchSongs = async () => {
    const url = `${BASE_URL}?method=track.search&track=${text}&api_key=${API_KEY}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    setSongs(data.results.trackmatches.track);
  };

  const handleSongClick = (song) => {
    navigate(`/details`, { state: { song } }); 
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
    <h1>Song Search App</h1>
    <input 
      style={{ padding: '5px' }}
      type="text" 
      value={text} 
      onChange={(e) => setText(e.target.value)}  
      placeholder="Search for a Song" 
    />
    <button 
      style={{ padding: '5px', backgroundColor:'cyan' }}
      onClick={searchSongs}
    >
      Search
    </button>

    <div style={{ marginTop: '20px' }}>
      {songs.map((song, index) => (
        <div key={index} onClick={() => handleSongClick(song)}>
          <h3 style={{ cursor: 'pointer' }}>{song.name} - {song.artist}</h3>
        </div>
      ))}
    </div>
  </div>
  )
}
