import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { decode } from 'html-entities';

import classes from './CurrentQuiz.module.css';
import Choice from '../components/selector/Choice';
import { quizActions } from '../store/quiz-slice';

const CurrentQuiz = function () {
  const [clickedChoice, setClickedChoice] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quiz.data);
  const currentPosition = useSelector((state) => state.quiz.index);
  const userGuesses = useSelector((state) => state.quiz.guestAnswers);
  const submit = useSelector((state) => state.quiz.submit);
  const currentQuiz = quizzes[currentPosition];

  const correct_index = currentQuiz.answers.indexOf(currentQuiz.correct_answer);

  useEffect(() => {
    if (
      userGuesses[`${currentPosition}`] ||
      userGuesses[`${currentPosition}`] === 0
    ) {
      setClickedChoice(userGuesses[`${currentPosition}`]);
    } else {
      setClickedChoice(null);
    }
  }, [currentPosition, userGuesses]);

  const chooseQuizHandler = (value) => {
    if (submit) return;
    setClickedChoice(value);
  };

  const addKeyValueHandler = () => {
    if (submit) return;
    dispatch(
      quizActions.addGuestAnswers({
        key: currentPosition,
        value: clickedChoice,
      })
    );
    if (currentPosition !== quizzes.length - 1) {
      setClickedChoice(null);
    }
  };

  const submitQuizzesHandler = () => {
    if (!submit) {
      addKeyValueHandler();
      dispatch(quizActions.calculateScore());
    }
    navigate('/result');
  };

  const prevQuizHandler = () => {
    dispatch(quizActions.decreaseIndex());
  };

  const nextQuizHandler = () => {
    addKeyValueHandler();
    dispatch(quizActions.increaseIndex());
  };

  return (
    <main className={classes['current-quiz']}>
      <div className={classes['title-box']}>
        <h3>{currentQuiz.category}</h3>
        <p className={classes['current-position']}>
          {currentPosition + 1} / {quizzes.length}
        </p>
        <h3>{decode(currentQuiz.question)}</h3>
      </div>
      <div className={classes['answers']}>
        {currentQuiz.answers.map((el, index) => (
          <Choice
            key={index}
            answer={el}
            index={index}
            active={clickedChoice === index ? true : false}
            onClickHandler={chooseQuizHandler}
            correctIndex={correct_index === index ? true : false}
          />
        ))}
      </div>
      <div className='btn-box'>
        {currentPosition !== 0 && (
          <button className='btn' onClick={prevQuizHandler}>
            Prev Question
          </button>
        )}

        {currentPosition !== quizzes.length - 1 && (
          <button className='btn' onClick={nextQuizHandler}>
            Next Question
          </button>
        )}
        {currentPosition === quizzes.length - 1 && (
          <button className='btn' onClick={submitQuizzesHandler}>
            Submit Question
          </button>
        )}
      </div>
    </main>
  );
};

export default CurrentQuiz;
