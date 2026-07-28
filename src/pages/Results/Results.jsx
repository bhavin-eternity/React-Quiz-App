import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import './Results.css';

function Results() {
  const navigate = useNavigate();
  const { state, highScore, handleRestart, questions } = useQuiz();

  const percentage = Math.round((state.score / questions.length) * 100);

  const getFeedback = () => {
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect Score!' };
    if (percentage >= 80)  return { emoji: '🌟', message: 'Excellent Work!' };
    if (percentage >= 60)  return { emoji: '👍', message: 'Good Job!' };
    if (percentage >= 40)  return { emoji: '📚', message: 'Keep Studying!' };
    return                        { emoji: '💪', message: 'Keep Practicing!' };
  };

  const feedback = getFeedback();

  const onRestart = () => {
    handleRestart();
    navigate('/');
  };

  return (
    <div className="page">
      <div className="results-card">

        <div className="results-emoji">{feedback.emoji}</div>
        <h1 className="results-title">{feedback.message}</h1>

        <div className="score-circle">
          <span className="score-number">{state.score}</span>
          <span className="score-total">/ {questions.length}</span>
        </div>

        <div className="results-stats">
          <div className="stat-item">
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{highScore}</span>
            <span className="stat-label">Best</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">
              {state.answers.filter(a => a.isCorrect).length}
            </span>
            <span className="stat-label">Correct</span>
          </div>
        </div>

        <div className="answers-review">
          <h2 className="review-title">Review Answers</h2>
          {state.answers.map((answer, index) => (
            <div
              key={index}
              className={`review-item ${answer.isCorrect ? 'correct' : 'wrong'}`}
            >
              <p className="review-question">
                {index + 1}. {answer.question}
              </p>
              <p className="review-answer">
                Your answer: <strong>{answer.userAnswer || 'No answer'}</strong>
              </p>
              {!answer.isCorrect && (
                <p className="review-correct">
                  Correct: <strong>{answer.correct}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="results-buttons">
          <button className="restart-button" onClick={onRestart}>
            Play Again 🔄
          </button>
          <button className="home-button" onClick={() => navigate('/')}>
            Home 🏠
          </button>
        </div>

      </div>
    </div>
  );
}

export default Results;