import {
  ADD_QUESTION,
  ADD_QUESTION_FAIL,
  ADD_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_SUCCESS,
  UPDATE_QUESTION,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION_SUCCESS,
} from "./actionTypes"

// actions questions
export const addQuestion = (question, cbDone, cbFail) => ({
  type: ADD_QUESTION,
  payload: { question, cbDone, cbFail },
})

export const addQuestionSuccess = question => ({
  type: ADD_QUESTION_SUCCESS,
  payload: question ,
})

export const addQuestionFail = error => ({
  type: ADD_QUESTION_FAIL,
  payload: error,
})

export const updateQuestion = (question, id, cbDone, cbFail) => ({
  type: UPDATE_QUESTION,
  payload: { question, id, cbDone, cbFail },
})

export const updateQuestionSuccess = (question, id) => ({
  type: UPDATE_QUESTION_SUCCESS,
  payload: { question, id },
})

export const updateQuestionFail = error => ({
  type: UPDATE_QUESTION_FAIL,
  payload: error,
})

export const deleteQuestion = (question, cbDone, cbFail) => ({
  type: DELETE_QUESTION,
  payload: { question, cbDone, cbFail },
})

export const deleteQuestionSuccess = question => ({
  type: DELETE_QUESTION_SUCCESS,
  payload: question ,
})

export const deleteQuestionFail = error => ({
  type: DELETE_QUESTION_FAIL,
  payload: error,
})

