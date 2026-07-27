import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { highScore, handleStart } = useQuiz();

    const onStart = () => {
        handleStart();
        navigate('/quiz');
    };
    return (
        <div className="page">
            <div className="home-card">

                <div className="home-emoji">🧠</div>

                <h1 className="home-title">React Quiz</h1>
                <p className="home-subtitle">
                    Test your knowledge of React and web development!
                </p>

                <div className="home-info">
                    <div className="info-item">
                        <span className="info-number">10</span>
                        <span className="info-label">Questions</span>
                    </div>
                    <div className="info-divider" />
                    <div className="info-item">
                        <span className="info-number">15s</span>
                        <span className="info-label">Per Question</span>
                    </div>
                    <div className="info-divider" />
                    <div className="info-item">
                        <span className="info-number">{highScore}</span>
                        <span className="info-label">High Score</span>
                    </div>
                </div>

                <button className="start-button" onClick={onStart}>
                    Start Quiz 🚀
                </button>

                <p className="home-hint">
                    Choose the correct answer before the timer runs out!
                </p>

            </div>
        </div>
    );
}

export default Home
