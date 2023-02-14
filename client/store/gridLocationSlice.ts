import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';

export type GridLocationState = {
  row: number | null;
  column: number | null;
};

const initialState: GridLocationState = {
  row: null,
  column: null,
};

export const gridLocationSlice = createSlice({
  name: 'gridLocation',
  initialState,
  reducers: {
    setGridRowState: (state, action) => {
      state.row = action.payload;
    },
    setGridColumnState: (state, action) => {
      state.column = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.gridLocation,
      };
    },
  },
});

export const { setGridColumnState, setGridRowState } =
  gridLocationSlice.actions;
export const selectGridLocationState = (state: AppState) => {
  return {
    row: state.gridLocation.row,
    column: state.gridLocation.column,
  };
};
export default gridLocationSlice.reducer;
