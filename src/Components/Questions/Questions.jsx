import React from 'react';
import './Questions.css';

const Questions = ({ heading, section, onSelectQuestion }) => {
  const numRows = 2;
  const numCols = 5;

  const createButtons = () => {
    const buttons = [];
    for (let i = 1; i <= numRows; i++) {
      const rowButtons = [];
      for (let j = 1; j <= numCols; j++) {
        const questionNumber = (i - 1) * numCols + j - 1; // Adjusting for zero-based index
        rowButtons.push(
          <button
            id="btn"
            key={questionNumber}
            onClick={() => onSelectQuestion(section, questionNumber)}
          >
            {questionNumber + 1} {/* Displaying as 1-based */}
          </button>
        );
      }
      buttons.push(<div key={i}>{rowButtons}</div>);
    }
    return buttons;
  };

  return (
    <div className="container">
      <p id="questionsHeading">{heading}</p>
      <div className="number-buttons-container">
        {createButtons()}
      </div>
    </div>
  );
};

export default Questions;
