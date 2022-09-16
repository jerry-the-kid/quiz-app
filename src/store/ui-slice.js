import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSpinner: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    turnOnSpinner(state) {
      state.showSpinner = true;
    },
    turnOffSpinner(state) {
      state.showSpinner = false;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
