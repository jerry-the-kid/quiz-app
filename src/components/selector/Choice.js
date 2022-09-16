import { useSelector } from 'react-redux';
import { decode } from 'html-entities';

import classes from './Choice.module.css';

const Choice = function (props) {
  const submit = useSelector((state) => state.quiz.submit);

  const { onClickHandler, active, answer, index, correctIndex } = props;

  let cssClass = active
    ? `${classes.choice} ${classes.active}`
    : `${classes.choice} `;

  if (correctIndex && submit) {
    cssClass = `${cssClass} ${classes.correct}`;
  }

  return (
    <div className={cssClass} onClick={() => onClickHandler(+index)}>
      <div className={classes.box}></div>
      <p>{decode(answer)}</p>
    </div>
  );
};

export default Choice;
