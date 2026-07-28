import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import QuestionCard from '../../components/QuestionCard/QuestionCard.jsx';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import Timer from '../../components/Timer/Timer.jsx';
import './Quiz.css';

function Quiz() {
  const navigate = useNavigate();
  const { state, questions, handleAnswer } = useQuiz();
  const [answered, setAnswered] = useState(null);

  const currentQ = questions[state.currentQuestion];
  const onAnswer = (option) => {
    setAnswered(option);
    
    setTimeout(() => {
      handleAnswer(option);
      setAnswered(null);
      if (state.currentQuestion + 1 >= questions.length) {
        navigate('/results');
      }
    }, 1000);
  }

  const onTimeUp = () => {
    
    setTimeout(() => {
      handleAnswer(null);
      setAnswered(null);
      if (state.currentQuestion + 1 >= questions.length) {
        navigate('/results');
      }
    }, 1000);
  };
  return (
    <div className="page">
      <div className="quiz-header">
        <ProgressBar
          current={state.currentQuestion + 1}
          total={questions.length}
        />
        <Timer
          onTimeUp={onTimeUp}
          questionIndex={state.currentQuestion}
        />
      </div>

      <QuestionCard
        question={currentQ}
        onAnswer={onAnswer}
        answered={answered}
      />

      <p className="quiz-score">Score: {state.score}</p>
    </div>
  );

}

export default Quiz
