import React from 'react';
import './App.css';
import { questions } from './dummyData';
import { useState } from 'react';

function App() {
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [failed, setFailed] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const prevHandler = () => {
    setIndex((val) => (val > 0 ? val - 1 : (val = 0)));
    setNum((val) => (val > 1 ? val - 1 : (val = 1)));
  };
  const nextHandler = () => {
    setIndex((val) => (val < questions.length ? val + 1 : setShowScore(true)));
    setNum((val) => (val < questions.length ? val + 1 : setShowScore(true)));
  };
  const submitHandler = () => {
    setShowScore(true);
  };

  const resetHandler = () => {
    window.location.reload();
  };

  const isCorrect = (index) => {
    if (index + 1 === questions[index].correctIndex) {
      setCorrect((val) => val + 1);
    } else {
      setFailed((val) => val + 1);
    }
  };

  return (
    <div>
      {showScore ? (
        <div className="score_sheet">
          <div className="display">
            <div className="correct">
              <p>
                You Scored {correct} / {questions.length}
              </p>
            </div>
            <div className="failed">
              <p>
                {' '}
                You Failed {failed} / {questions.length}
              </p>
            </div>
          </div>
          <button
            style={{ border: 'solid 3px green' }}
            onClick={() => resetHandler()}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="container">
          <h1 style={{ color: 'white' }}>
            Question {num}/{questions.length}
          </h1>

          <div className="questions">
            <p>{questions[index].question}</p>
          </div>

          <div className="answers">
            {questions[index].answers.map((item, index) => (
              <button
                onClick={() => {
                  isCorrect(index);
                }}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="controllers">
            <button
              style={{ border: 'solid 3px green' }}
              className="prev"
              onClick={() => prevHandler()}
            >
              Prev
            </button>

            <button
              style={{ border: 'solid 3px green' }}
              className="prev"
              onClick={() => nextHandler()}
            >
              Next
            </button>

            <button
              style={{ border: 'solid 3px green' }}
              className="submit"
              onClick={() => submitHandler()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
