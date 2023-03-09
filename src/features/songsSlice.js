import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/songs");
    dispatch(setSongs(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const songsSlice = createSlice({
  name: "songs",
  initialState: {
    value: [],
  },
  reducers: {
    addSong: (state, action) => {
      state.value.push(action.payload);
    },
    deleteSong: (state, action) => {
      const id = action.payload;
      axios.delete(`http://localhost:3001/delete/${id}`);
      state.value = state.value.filter((song) => song.id !== id);
    },
    updateSong: (state, action) => {
      state.value.forEach((song) => {
        if (song.id === action.payload.id) {
          song.title = action.payload.title;
          song.artist = action.payload.artist;
          song.album = action.payload.album;
          song.genre = action.payload.genre;
        }
      });
    },
    setSongs: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSong, deleteSong, updateSong, setSongs } = songsSlice.actions;

export default songsSlice.reducer;
