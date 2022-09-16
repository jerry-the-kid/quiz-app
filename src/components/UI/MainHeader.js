import avatar from '../../assets/avatar.jpg';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <nav className={classes['main-box']}>
      <div>
        <h1>Quiz Challenge</h1>
      </div>
      <div className={classes['info-box']}>
        <img className={classes.image} src={avatar} alt='Avatar' />
        <p>Guest</p>
      </div>
    </nav>
  );
};

export default MainHeader;
