import React from "react";
import { Link } from "react-router-dom";
import { useQuizeContext } from "../context/AppContext";

function Resultmodel() {
  const { score, amount } = useQuizeContext();
  let resultPercentage = Math.floor((parseInt(score) / amount) * 100);
  return (
    <div className="overlay">
      <div className="popup-box">
        <h4>Congrats you got {resultPercentage}% question right ! </h4>
        <Link to="/">Start Quize Again</Link>
      </div>
    </div>
  );
}

export default Resultmodel;
