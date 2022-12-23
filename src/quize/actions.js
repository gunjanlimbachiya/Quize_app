import * as actionTypes from "./actionTypes";

export const SetOption = (options) => {
  return {
    type: actionTypes.SET_OPTIONS,
    payload: options,
  };
};

export const GenerateQuestion = () => {
  return {
    type: actionTypes.GENERATE_QUESTION,
  };
};

export const IncrementScore = () => {
  return {
    type: actionTypes.INCREMENT_SCORE,
  };
};
export const DecrementScore = () => {
  return {
    type: actionTypes.DECREMENT_SCORE,
  };
};

export const IsLoading = () => {
  return {
    type: actionTypes.ISLOADING,
  };
};

export const FetchSuccess = (data) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    payload: data,
  };
};

export const FetchError = (data) => {
  return {
    type: actionTypes.FETCH_ERROR,
  };
};

export const QuizeOver = () => {
  return {
    type: actionTypes.QUIZE_OVER,
  };
};
