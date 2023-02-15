import { createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';

const hydrate = createAction<AppState>(HYDRATE);

export type ToggleEditorState = {
  isToggled: boolean;
};

const initialState: ToggleEditorState = {
  isToggled: false,
};

export const toggleEditorSlice = createSlice({
  name: 'toggleEditor',
  initialState,
  reducers: {
    setToggleEditorState: (state, action) => {
      state.isToggled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.toggleEditor,
      };
    });
  },
});

export const { setToggleEditorState } = toggleEditorSlice.actions;
export const selectToggleEditorState = (state: AppState) => {
  return state.toggleEditor.isToggled;
};
export default toggleEditorSlice.reducer;
