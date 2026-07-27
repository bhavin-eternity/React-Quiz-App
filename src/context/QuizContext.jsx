import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import questions from '../data/questions';

const QuizContext = createContext();

const initialState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    status: 'idle',
};

function quizReducer(state, action) {
    switch (action.type) {

        case 'ANSWER': {
            const isCorrect = action.payload === questions[state.currentQuestion].correct;
            return {
                ...state,
                score: isCorrect ? state.score + 1 : state.score,
                answers: [...state.answers, {
                    question: questions[state.currentQuestion].question,
                    userAnswer: action.payload,
                    correct: questions[state.currentQuestion].correct,
                    isCorrect,

                }],
                currentQuestion: state.currentQuestion + 1,
                status: state.currentQuestion + 1 >= questions.length ? "finished" : "playing",
            };
        }

        case 'START':
            return { ...state, status: 'playing' };

        case 'RESTART':
            return initialState;

        default:
            return state;
    }
}

export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('highScore')) || 0
    );


    const handleAnswer = (answer) => {
        dispatch({ type: 'ANSWER', payload: answer });
    };

    const handleStart = () => {
        dispatch({ type: 'START' });
    };

    const handleRestart = () => {
        dispatch({ type: 'RESTART' });
    };

    useEffect(() => {
        if (state.status === 'finished' && state.score > highScore) {
            setHighScore(state.score);
            localStorage.setItem('highScore', state.score);
        }
    }, [state.status, state.score]);


    return (
        <QuizContext.Provider value={{
            state,
            questions,
            handleAnswer,
            handleStart,
            handleRestart,
            highScore,
        }}>
            {children}
        </QuizContext.Provider>
    );
}


export function useQuiz() {
    return useContext(QuizContext);
}
