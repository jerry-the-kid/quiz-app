import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './ResultPage.module.css';

const ResultPage = () => {
  const navigate = useNavigate();

  const score = useSelector((state) => state.quiz.score);
  const quizzes = useSelector((state) => state.quiz.data);
  const submit = useSelector((state) => state.quiz.submit);

  useEffect(() => {
    if (!quizzes || !submit) {
      navigate('/', { replace: true });
    }
  }, [quizzes, submit, navigate]);

  const playQuizAgainHandler = () => {
    navigate('/', { replace: true });
  };

  const goToQuizPage = () => {
    navigate('/quizzes');
  };

  return (
    <main className={classes.result}>
      <h1 className={classes.title}>Congratulations!</h1>
      <h3 className={classes['sub-title']}>You answered</h3>
      <p>
        {score} / {quizzes?.length}
      </p>
      <h3 className={classes['sub-title']}>question correct</h3>

      <div className={'btn-box'}>
        <button className='btn' onClick={playQuizAgainHandler}>
          Play again
        </button>
        <button className='btn' onClick={goToQuizPage}>
          Check Answer
        </button>
      </div>
    </main>
  );
};

export default ResultPage;
