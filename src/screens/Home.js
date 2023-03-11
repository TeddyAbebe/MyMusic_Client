import "./home.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  // addSong,
  // deleteSong,
  // updateSong,
  setSongs,
  fetchSongs,
} from "../features/songsSlice";
import Stats from "./Stats";
import Header from "./Header";

function Home() {
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.songs.value);

  const [title, setTitle] = useState([]);
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [genre, setGenre] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const newSong = {
    title: title,
    artist: artist,
    album: album,
    genre: genre,
  };

  useEffect(
    (id) => {
      Axios.get("https://mymusic-server.onrender.com/read").then((response) => {
        dispatch(setSongs(response.data));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const update = (id) => {
    Axios.put("https://mymusic-server.onrender.com/update", {
      id: id,
      newTitle: newTitle,
      newArtist: newArtist,
      newAlbum: newAlbum,
      newGenre: newGenre,
    });
  };

  const remove = (id) => {
    Axios.delete(`https://mymusic-server.onrender.com/delete/${id}`);
  };

  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <div className="home">
        <div className="displaySongs">
          {songsList.map((song) => (
            <div key={song._id} className="displaySongs_container">
              <div className="list">
                <h3>{song.title}</h3>
                <h4>Artist : {song.artist}</h4>
                <p>Album : {song.album}</p>
                <p>Genre : {song.genre}</p>
              </div>

              <br />

              <div className="updateSongs">
                <div className="updateButton">
                  <button
                    onClick={() => {
                      update(song._id);
                    }}
                  >
                    Update Song
                  </button>
                </div>

                <div className="updateInput">
                  <input
                    type="text"
                    placeholder="title..."
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  ></input>

                  <input
                    type="text"
                    placeholder="artist..."
                    onChange={(e) => {
                      setNewArtist(e.target.value);
                    }}
                  ></input>

                  <input
                    type="text"
                    placeholder="album..."
                    onChange={(e) => {
                      setNewAlbum(e.target.value);
                    }}
                  ></input>

                  <input
                    type="text"
                    placeholder="genre..."
                    onChange={(e) => {
                      setNewGenre(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <br />

              <div className="deleteSong">
                <button
                  onClick={() => {
                    remove(song._id);
                  }}
                >
                  Delete Song
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="addSongs">
          <button
            onClick={() => {
              Axios.post("https://mymusic-server.onrender.com/insert", {
                title: title,
                artist: artist,
                album: album,
                genre: genre,
              });
              dispatch(addSong(newSong)).then(() => {
                dispatch(fetchSongs());
              });
            }}
          >
            Add Music
          </button>

          <input
            type="text"
            placeholder="title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>

          <input
            type="text"
            placeholder="artist..."
            onChange={(e) => {
              setArtist(e.target.value);
            }}
          ></input>

          <input
            type="text"
            placeholder="album..."
            onChange={(e) => {
              setAlbum(e.target.value);
            }}
          ></input>

          <input
            type="text"
            placeholder="genre..."
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          ></input>
        </div>

        <div className="stats">
          <Stats songsList={songsList} />
        </div>
      </div>
    </div>
  );
}

export default Home;
