import { useRef, useState } from 'react';

import { category, difficulty, type } from '../assets/data';
import Select from '../components/UI/Select';
import classes from './NewQuiz.module.css';

const NewQuiz = (props) => {
  const [quizAmount, setQuizAmount] = useState(10);

  const categoryRef = useRef();
  const difficultyRef = useRef();
  const typeRef = useRef();

  const changeAmountHandler = function (e) {
    setQuizAmount(+e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    let url = `https://opentdb.com/api.php?amount=${quizAmount}`;
    if (categoryRef.current.value !== 'any')
      url += `&category=${categoryRef.current.value}`;

    if (difficultyRef.current.value !== 'any')
      url += `&difficulty=${difficultyRef.current.value}`;

    if (typeRef.current.value !== 'any')
      url += `&type=${typeRef.current.value}`;

    props.onSubmitForm(url);
  };

  return (
    <main className={classes['new-quiz']}>
      <h3>Create Your New Quiz</h3>
      <form action='/' onSubmit={submitFormHandler}>
        <div className={classes['form-group']}>
          <label htmlFor='amount'>Number of questions : </label>
          <input
            type='number'
            id='amount'
            min={10}
            onInput={changeAmountHandler}
            value={quizAmount}
          />
        </div>
        <div className={classes['form-group']}>
          <Select
            name='Category :'
            id='category'
            options={category}
            ref={categoryRef}
          />
        </div>
        <div className={classes['form-group']}>
          <Select
            name='Difficulty :'
            id='difficulty'
            options={difficulty}
            ref={difficultyRef}
          />
        </div>
        <div className={classes['form-group']}>
          <Select name='Type :' id='type' options={type} ref={typeRef} />
        </div>
        <button className={classes['btn']} type='submit'>
          Create quiz
        </button>
      </form>
    </main>
  );
};

export default NewQuiz;
