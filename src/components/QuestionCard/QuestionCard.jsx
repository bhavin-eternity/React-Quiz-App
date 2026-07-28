import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, onAnswer, answered }) {
    return (
        <div className="question-card">
            <p className="question-text">{question.question}</p>

            <div className="options-grid">
                {question.options.map((option) => {
                    const isSelected = answered === option;
                    const isCorrect = option === question.correct;

                    let optionClass = 'option-btn';
                    if (answered) {
                        if (isCorrect) optionClass += ' correct';
                        else if (isSelected) optionClass += ' wrong';
                    }
                    return (
                        <button
                            key={option}
                            className={optionClass}
                            onClick={() => !answered && onAnswer(option)}
                            disabled={!!answered}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionCard;
    
