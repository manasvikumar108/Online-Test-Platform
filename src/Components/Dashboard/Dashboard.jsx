import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Timer } from '../Timer/Timer';
import './Dashboard.css';
import Questions from '../Questions/Questions';
import Body from '../Body/Body';

export const Dashboard = () => {
    const [currentSection, setCurrentSection] = useState('quant');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());

    const handleQuestionSelect = (section, index) => {
        setCurrentSection(section);
        setCurrentQuestionIndex(index);
    };

    const handleAttemptedQuestion = (index) => {
        setAttemptedQuestions((prev) => new Set(prev).add(index));
    };

    return (
        <>
            <div id="main">
                <div id='left'>
                    <div id="head">
                        <Header text="Online Test Platform" />
                    </div>

                    <div id="mcq">
                        <Body
                            currentSection={currentSection}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                            setCurrentSection={setCurrentSection}
                            handleAttemptedQuestion={handleAttemptedQuestion}
                        />
                    </div>
                </div>
                <div id='right'>
                    <div id="timer">
                        <Timer />
                    </div>
                    <div>
                        <Questions heading='Quant' section='quant' onSelectQuestion={handleQuestionSelect} attemptedQuestions={[...attemptedQuestions]} />
                    </div>
                    <div>
                        <Questions heading='Verbal' section='verbal' onSelectQuestion={handleQuestionSelect} attemptedQuestions={[...attemptedQuestions]} />
                    </div>
                </div>
            </div>
        </>
    );
}
