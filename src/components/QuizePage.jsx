import React, { useEffect, useState } from "react";
import { useQuizeContext } from "../context/AppContext";
import { IncrementScore, QuizeOver } from "../quize/actions";
import Resultmodel from "./Resultmodel";

function QuizePage() {
  let { questions, score, dispatch } = useQuizeContext();

  const [question, SetQuestion] = useState("");
  const [answer, SetAnswer] = useState("");
  const [options, SetOptions] = useState([]);
  const [index, SetIndex] = useState(0);
  const [showModal, SetShowModal] = useState(false);

  const getShuffledArr = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };
  const setValues = () => {
    if (index !== -1) {
      let { question, correct_answer, incorrect_answers } = questions[index];
      SetAnswer(correct_answer);
      let randomOptions = getShuffledArr([
        correct_answer,
        ...incorrect_answers,
      ]);
      SetOptions([...randomOptions]);
      SetQuestion(question);
    } else {
      SetShowModal(true);
      dispatch(QuizeOver());
    }
  };

  useEffect(() => {
    setValues();
  }, [index]);

  const checkAnswer = (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      let givenAnswer = e.target.value;
      if (givenAnswer === answer) {
        dispatch(IncrementScore());
        SetIndex(index + 1);
      } else {
        SetIndex(index + 1);
      }
      if (index === questions.length - 1) {
        SetIndex(-1);
      }
    }
  };

  return (
    <>
      {showModal ? (
        <Resultmodel />
      ) : (
        <main>
          <section className="quize-page">
            <div className="score">
              Score:&nbsp;
              <span className="score-value">{score}</span>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: question }}
              className="question"
            />
            <div className="options" onClick={checkAnswer}>
              {options.map((option) => {
                return (
                  <button
                    dangerouslySetInnerHTML={{ __html: option }}
                    key={option}
                    value={option}
                  />
                );
              })}
            </div>
            <div className="buttons"></div>
          </section>{" "}
        </main>
      )}
    </>
  );
}

export default QuizePage;
