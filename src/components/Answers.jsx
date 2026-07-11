import {useRef} from 'react';
export default function Answers({ answers, selectedAnswer, answerState,onSelect }) {
    const shuffleAnswers = useRef();

    if (!shuffleAnswers.current) {
        shuffleAnswers.current = [...answers];
        shuffleAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {
                shuffleAnswers.current.map((answer) => {
                    const isSelected = selectedAnswer === answer;
                    let cssclass = '';
                    if (answerState === 'selected' && isSelected) {
                        cssclass = "selected";
                    }
                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssclass = answerState;
                    }
                    return <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssclass}>{answer}</button>
                    </li>
                })
            }
        </ul>

    );
}