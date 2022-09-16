import { uiActions } from './ui-slice';
import { quizActions } from './quiz-slice';

function shuffleArray(array) {
  const copyArray = [...array];
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  return copyArray;
}

export const getQuizData = (url) => {
  return async (dispatch) => {
    dispatch(quizActions.resetQuizzes());
    dispatch(uiActions.turnOnSpinner());

    const sendRequest = async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Send request failed ! Cannot get quizzes');

      return res.json();
    };
    try {
      const { response_code, results: questions } = await sendRequest();

      if (response_code === 1)
        throw new Error('No quiz found for this request ! Please try again');

      const data = questions.map((question) => {
        return {
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        };
      });

      dispatch(quizActions.createQuizzes({ data }));
      dispatch(uiActions.turnOffSpinner());
    } catch (e) {
      dispatch(uiActions.turnOffSpinner());
      alert(e.message);
      console.log(e.message);
    }
  };
};
