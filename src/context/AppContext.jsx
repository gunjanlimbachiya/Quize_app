import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { FetchError, FetchSuccess, IsLoading } from "../quize/actions";
import {
  SET_OPTIONS,
  ISLOADING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  QUIZE_OVER,
} from "../quize/actionTypes";

const API = "https://opentdb.com/api.php";

const initialState = {
  amount: 5,
  category: 9,
  difficulty: "easy",
  type: "multiple",
  questions: [],
  isLoading: false,
  error: false,
  score: 0,
  showModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ISLOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
      };
    }

    case FETCH_ERROR: {
      return {
        ...state,
        questions: [],
        isLoading: false,
        error: true,
      };
    }
    case SET_OPTIONS: {
      return {
        ...state,
        score: 0,
        amount: action.payload.amount,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
        type: action.payload.type,
      };
    }

    case INCREMENT_SCORE: {
      return {
        ...state,
        score: state.score + 1,
      };
    }

    case DECREMENT_SCORE: {
      return {
        ...state,
        score: state.score - 1 < 0 ? state.score : state.score - 1,
      };
    }
    case QUIZE_OVER: {
      return {
        ...state,
        showModal: true,
      };
    }

    default:
      return state;
  }
};

const QuizeContext = createContext();
function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async function () {
    dispatch(IsLoading());
    console.log(state);
    try {
      const response = await axios.get(
        `${API}?amount=${state.amount}&category=${state.category}&difficulty=${state.difficulty}&type=${state.type}`
      );
      const data = response.data.results;
      dispatch(FetchSuccess(data));
    } catch (error) {
      dispatch(FetchError(error.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.amount, state.difficulty, state.type, state.category]);

  const value = {
    amount: state.amount,
    category: state.category,
    difficulty: state.difficulty,
    type: state.type,
    dispatch: dispatch,
    questions: state.questions,
    isLoading: state.isLoading,
    error: state.error,
    score: state.score,
    showModal: state.showModal,
  };
  return (
    <QuizeContext.Provider value={value}>{children}</QuizeContext.Provider>
  );
}

export const useQuizeContext = () => {
  return useContext(QuizeContext);
};

export default AppContext;
