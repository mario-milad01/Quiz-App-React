import Answers from "../components/Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
export default function Question({onSelect,questionText,answers,selectedAnswer,answerState,onSkip}) {
    return (
        <div id="question">
            <h2 className="">{questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer= {selectedAnswer}
                answerState={answerState}
                onSelect={onSelect} />
            <QuestionTimer  timeout={10000} onTimeOut={onSkip} />
        </div>

    );

}