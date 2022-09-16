import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Layout from './components/UI/Layout';
import NewQuiz from './pages/NewQuiz';
import CurrentQuiz from './pages/CurrentQuiz';
import ResultPage from './pages/ResultPage';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { getQuizData } from './store/quiz-actions';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSpinner = useSelector((state) => state.ui.showSpinner);
  const data = useSelector((state) => state.quiz.data);

  const getQuiz = async (url) => {
    dispatch(getQuizData(url));
    navigate('/quizzes');
  };

  return (
    <>
      <Layout>
        {showSpinner && <LoadingSpinner />}
        {!showSpinner && (
          <Routes>
            <Route path='/' element={<NewQuiz onSubmitForm={getQuiz} />} />
            <Route
              path='/quizzes'
              element={data ? <CurrentQuiz /> : <Navigate replace to='/' />}
            />
            <Route path='/result' element={<ResultPage />} />
          </Routes>
        )}
      </Layout>
    </>
  );
}

export default App;
