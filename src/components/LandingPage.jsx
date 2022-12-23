import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizeContext } from "../context/AppContext";
import { SetOption } from "../quize/actions";

const LandingPage = () => {
  const { dispatch, error } = useQuizeContext();
  const navigate = useNavigate();

  const [options, SetOptions] = useState({
    amount: 5,
    category: 9,
    difficulty: "easy",
    type: "multiple",
  });

  const handleChange = (e) => {
    SetOptions({ ...options, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SetOption(options));

    if (!error) {
      navigate("/questions");
    }
  };

  return (
    <main>
      <h1>Setup Quize</h1>
      <section className="option-selection">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="amount">
              Number of questions
            </label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              name="amount"
              id="amount"
              value={options.amount}
              required
            />
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="category" className="form-label">
                City
              </label>
              <select
                defaultValue={options.category}
                onChange={handleChange}
                className="form-select form-select-lg"
                name="category"
                id="category"
              >
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="18">Computer</option>
                <option value="19">Mathemetics</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="difficulty" className="form-label">
                difficulty leval
              </label>
              <select
                defaultValue={options.difficulty}
                onChange={handleChange}
                className="form-select form-select-lg"
                name="difficulty"
                id="difficulty"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="type" className="form-label">
                option type
              </label>
              <select
                defaultValue={options.type}
                onChange={handleChange}
                className="form-select form-select-lg"
                name="type"
                id="type"
              >
                <option value="multiple">multiple</option>
                <option value="boolean">true/false</option>
              </select>
            </div>
          </div>
          {error && <p className="error">Could not retrive questions.</p>}

          <button type="submit">Start</button>
        </form>
      </section>
    </main>
  );
};

export default LandingPage;
