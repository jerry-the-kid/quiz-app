import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import quizReducer from './quiz-slice';

const store = configureStore({ reducer: { quiz: quizReducer, ui: uiSlice } });

export default store;
