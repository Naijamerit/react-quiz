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

  const isCorrect = (index) => {
    if (index + 1 === questions[index].correctIndex) {
      setCorrect((val) => val + 1);
    } else {
      setFailed((val) => val + 1);
    }
  };

  const ressetHandler = () => {
    window.location.reload();
  };

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="App">
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
                You failed {failed} / {questions.length}
              </p>
            </div>
          </div>
          <button onClick={ressetHandler}>Try again</button>
        </div>
      ) : (
        <div className="container">
          <h1>
            Question {num}/{questions.length}
          </h1>

          <div className="questions">
            <p>{questions[index].question}</p>
          </div>

          <div className="answers">
            {questions[index].answers.map((item, index) => (
              <button onClick={({ handleClick }, () => isCorrect(index))}>
                {item}
              </button>
            ))}
          </div>

          <div className="controllers">
            <button className="prev" onClick={() => prevHandler()}>
              Prev
            </button>
            <button className="next" onClick={() => nextHandler()}>
              Next
            </button>
            <button className="submit" onClick={() => submitHandler()}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
