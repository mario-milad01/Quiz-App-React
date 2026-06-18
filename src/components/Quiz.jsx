import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js'
import quizDone from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUsersAnswers] = useState([]);
    const [currentAnswerState, setCurrentAnswerState] = useState("");
    const activeQuestionIndex =
        currentAnswerState === "" ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setCurrentAnswerState('selected');
        setUsersAnswers((prevAnswer) => {
            return (
                [...prevAnswer, selectedAnswer]
            );
        });
         setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setCurrentAnswerState('correct');
            }
            else {
                setCurrentAnswerState('wrong');
            }

            setTimeout(() => {
                setCurrentAnswerState('');
            }, 2000);
        }, 1000);

    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => { handleSelectAnswer(null) },
        [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizDone} alt="" />
            <h2>Quiz Completed!</h2>
        </div>
    }
    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleAnswers.sort(() => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id="question">
                <h2 className="">{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {
                        shuffleAnswers.map((answer) => {
                            const isSelected = userAnswers[userAnswers.length - 1] === answer;
                            let cssclass = '';
                            if (currentAnswerState === 'selected' && isSelected) {
                                cssclass = "selected";
                            }
                            if ((currentAnswerState === 'correct' || currentAnswerState === 'wrong') && isSelected) {
                                cssclass = currentAnswerState;
                            }
                            return<li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)} className={cssclass}>{answer}</button>
                            </li>
                        })
                    }
                </ul>
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer} />
            </div>
        </div>
    );
}