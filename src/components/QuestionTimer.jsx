import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingtime] = useState(timeout)

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeOut();
        }, timeout);
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeOut]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingtime(prev => {
                return (
                    prev - 100
                );
            })
        }, 100);

        return () => {
            clearInterval(interval);
        };
    },
        []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    )
}