import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What color is the sky ?",
    answers: ["Blue", "Green", "Yellow", "Red"],
    correct: "Blue",
  },
  {
    question: "What is my age ?",
    answers: [25, 16, 24, 30],
    correct: 25,
  },
  {
    question: "What is my name ?",
    answers: ["stiven", "john", "doe", "giulio"],
    correct: "stiven",
  },
];

function App() {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerClicked, setAnswerClicked] = useState<number | string>("");
  const isGameOver = currQuestionIndex >= questions.length;

  const wrongScore = questions.length - score;

  const q = questions[currQuestionIndex];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Increment index to go to next question
    if (q.correct === answerClicked) {
      setScore(score + 1);
    }
    setCurrQuestionIndex(currQuestionIndex + 1);
  };

  const tryAgain = () => {
    setCurrQuestionIndex(0);
    setAnswerClicked("");
    setScore(0);
  };

  return (
    <>
      {!isGameOver ? (
        <form onSubmit={(e) => handleSubmit(e)} className="container">
          <span className="question">{q.question}</span>
          {q.answers.map((ans, index) => {
            return (
              <div key={index} className="inner">
                <label>
                  <input
                    onChange={() => setAnswerClicked(ans)}
                    type="radio"
                    name="answer"
                    className="answer"
                    checked={ans === answerClicked}
                  />
                  {ans}
                </label>
              </div>
            );
          })}

          <button>Submit</button>
        </form>
      ) : (
        <div>
          <span>
            This is your score. Correct: {score} - Wrong: {wrongScore}
          </span>
          <button onClick={tryAgain}>Try Again</button>
        </div>
      )}
    </>
  );
}

export default App;
