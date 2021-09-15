import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import Question from "../Question/Question";
import "./Quiz.css";
const Quiz = ({ name, question, score, setQuestion, setScore }) => {
  const [option, setOption] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    console.log(question);

    setOption(
      question &&
        handleShuffle([
          question[currQues]?.correct_answer,
          ...question[currQues]?.incorrect_answers,
        ])
    );
  }, [question, currQues]);

  console.log(option);

  const handleShuffle = (opt) => {
    return opt.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>
      {question ? (
        <>
          <div className="quizInfo">
            <span>{question[currQues].category}</span>{" "}
            <span>Score : {score}</span>
          </div>

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            question={question}
            setQuestion={setQuestion}
            option={option}
            score={score}
            setScore={setScore}
            correct={question[currQues]?.correct_answer}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
