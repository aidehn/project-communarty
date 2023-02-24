import { createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';

const hydrate = createAction<AppState>(HYDRATE);

export type HighlightedArtState = {
  creator: string | undefined;
  image_src: string | undefined;
};

const initialState: HighlightedArtState = {
  creator: undefined,
  image_src: undefined,
};

export const highlightedArtSlice = createSlice({
  name: 'highlightedArt',
  initialState,
  reducers: {
    setImageSrcState: (state, action) => {
      state.image_src = action.payload;
    },
    setCreatorState: (state, action) => {
      state.creator = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.highlightedArt,
      };
    });
  },
});

export const { setImageSrcState, setCreatorState } =
  highlightedArtSlice.actions;

export const selectHighlightedArtState = (state: AppState) => {
  return state.highlightedArt;
};

export default highlightedArtSlice.reducer;
