import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../../typings";
import { RootState } from "../store";


type WordState = {
  todayWords: Word[],
  trendingWords: Word[],
}

const INITIAL_STATE: WordState = {
  todayWords: [],
  trendingWords: [],
}

export const WordSlice = createSlice({
  name: 'words',
  reducers: {
    getToday: (state, action) => {
      state.todayWords = action.payload;
    },
    getTrending: (state, action) => {
      state.trendingWords = action.payload;
    },
  },
  initialState: INITIAL_STATE,
})

export const selectWord = (state: RootState) => state.words;

export const { getToday, getTrending } = WordSlice.actions;

export default WordSlice.reducer;
