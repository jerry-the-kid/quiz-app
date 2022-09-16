import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  index: 0,
  guestAnswers: {},
  score: 0,
  submit: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    calculateScore(state) {
      state.submit = true;
      for (let i = 0; i < state.data.length; i++) {
        const guestAnswer = state.data[i].answers[state.guestAnswers[`${i}`]];

        if (state.data[i].correct_answer === guestAnswer) state.score++;
      }
    },
    addGuestAnswers(state, action) {
      state.guestAnswers[`${action.payload.key}`] = action.payload.value;
    },
    resetQuizzes(state) {
      state.data = null;
      state.index = 0;
      state.guestAnswers = {};
      state.score = 0;
      state.submit = false;
    },
    createQuizzes(state, action) {
      state.data = action.payload.data;
    },
    increaseIndex(state) {
      state.index++;
    },
    decreaseIndex(state) {
      state.index--;
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice.reducer;
