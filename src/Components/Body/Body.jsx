import React, { useState } from 'react';
import './Body.css';
import questionsData from '../QuestionsApi/questions.json';

const Body = ({ currentSection, currentQuestionIndex, setCurrentQuestionIndex, setCurrentSection }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 0 });

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [`${currentSection}-${currentQuestionIndex}`]: option
    }));
  };

  const handleNextQuestion = () => {
    const currentSectionQuestions = questionsData[currentSection];
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSection === 'quant') {
      setCurrentSection('verbal');
      setCurrentQuestionIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection === 'verbal') {
      setCurrentSection('quant');
      setCurrentQuestionIndex(questionsData.quant.length - 1);
    }
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    let totalQuestions = 0;

    const sections = ['quant', 'verbal'];

    sections.forEach((section) => {
      const questions = questionsData[section];
      questions.forEach((question, index) => {
        totalQuestions += 1;
        const selectedOption = selectedOptions[`${section}-${index}`];
        if (selectedOption === question.correct_option) {
          correctCount += 1;
        }
      });
    });

    setResults({ correct: correctCount, total: totalQuestions });
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="results-container">
        <h2>Test Results</h2>
        <p>You answered {results.correct} out of {results.total} questions correctly.</p>
        <button onClick={() => setShowResults(false)}>Back to Test</button>
      </div>
    );
  }

  const currentQuestion = questionsData[currentSection][currentQuestionIndex];
  const sectionTitle = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);

  return (
    <div className="question-container">
      <h2 id="queNo">{sectionTitle} - Question {currentQuestionIndex + 1}</h2>
      <hr id="separator" />
      <p id="que">{currentQuestion.question}</p>
      <ul className="options">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions[`${currentSection}-${currentQuestionIndex}`] === option}
              onChange={() => handleOptionChange(option)}
            />
            {String.fromCharCode(65 + index)}. {option}
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentSection === 'quant' && currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleNextQuestion} disabled={currentSection === 'verbal' && currentQuestionIndex === questionsData.verbal.length - 1}>Next</button>
        <button onClick={handleSubmitTest}>Submit Test</button>
      </div>
    </div>
  );
};

export default Body;
