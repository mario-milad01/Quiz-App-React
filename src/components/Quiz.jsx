import { useState, useCallback } from "react";
import Questions from '../components/Questions.jsx';
import QUESTIONS from '../questions.js'
import QuestionTimer from "./QuestionTimer.jsx";
import Summary from "./Summary.jsx";

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
        return <Summary answers={userAnswers}/>;
    }
  

    return (
        <div id="quiz">
            <Questions 
            key={activeQuestionIndex}
            onSelect={handleSelectAnswer}
            questionText={QUESTIONS[activeQuestionIndex].text}
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={currentAnswerState}
            onSkip={handleSkipAnswer}
            selectedAnswer={userAnswers[userAnswers.length -1]}/>
        </div>
    );
}