import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { gridLocationSlice } from './gridLocationSlice';
import { createWrapper } from 'next-redux-wrapper';
import { toggleEditorSlice } from './toggleEditorSlice';
import { highlightedArtSlice } from './highlightedArtSlice';

const makeStore = () => {
  return configureStore({
    reducer: {
      [gridLocationSlice.name]: gridLocationSlice.reducer,
      [toggleEditorSlice.name]: toggleEditorSlice.reducer,
      [highlightedArtSlice.name]: highlightedArtSlice.reducer,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
