import React from "react";
import "./home.css";


function Stats({ songsList }) {
  const totalSongs = songsList.length;
  const totalArtists = new Set(songsList.map((song) => song.artist)).size;
  const totalAlbums = new Set(songsList.map((song) => song.album)).size;
  const totalGenres = new Set(songsList.map((song) => song.genre)).size;

  return (
    <div>
      <h2>Overall Statistics : </h2>
      <p>Total Songs : {totalSongs}</p>
      <p>Total Artists : {totalArtists}</p>
      <p>Total Albums : {totalAlbums}</p>
      <p>Total Genres : {totalGenres}</p>
    </div>
  );
}

export default Stats;
