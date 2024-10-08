import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_KEY = 'ca2db8ecbe74194fc78809fc01a5ceca';
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

export default function SongDetails() {
    const location = useLocation();
  const { song } = location.state; 
  const [details, setDetails] = useState({});
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const songUrl = `${BASE_URL}?method=track.getInfo&artist=${song.artist}&track=${song.name}&api_key=${API_KEY}&format=json`;
        const response = await fetch(songUrl);
        const data = await response.json();
        setDetails(data.track);

        const topTracksUrl = `${BASE_URL}?method=artist.gettoptracks&artist=${song.artist}&api_key=${API_KEY}&format=json`;
        const topTracksResponse = await fetch(topTracksUrl);
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData.toptracks.track.slice(0, 5)); 
       
        const relatedArtistsUrl = `${BASE_URL}?method=artist.getsimilar&artist=${song.artist}&api_key=${API_KEY}&format=json`;
        const relatedArtistsResponse = await fetch(relatedArtistsUrl);
        const relatedArtistsData = await relatedArtistsResponse.json();
        setRelatedArtists(relatedArtistsData.similarartists.artist.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
  }, [song]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Details for {details.name} by {details.artist?.name}</h2>
      <p><strong>Album:</strong> {details.album?.title}</p>
      <p>{details.wiki?.summary}</p>

      <h3>Top Tracks by {song.artist}</h3>
      <ul>
        {topTracks.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>

      <h3>Related Artists</h3>
      <ul>
        {relatedArtists.map((artist, index) => (
          <li key={index}>{artist.name}</li>
        ))}
      </ul>
    </div>
  )
}
