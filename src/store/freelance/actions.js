import {
  ADD_FREELANCE,
  ADD_FREELANCE_FAIL,
  ADD_FREELANCE_SUCCESS,
  DELETE_FREELANCE,
  DELETE_FREELANCE_FAIL,
  DELETE_FREELANCE_SUCCESS,
  UPDATE_FREELANCE,
  UPDATE_FREELANCE_FAIL,
  UPDATE_FREELANCE_SUCCESS,
} from "./actionTypes"

// actions freelances
export const addFreelance = (freelance, cbDone, cbFail) => ({
  type: ADD_FREELANCE,
  payload: { freelance, cbDone, cbFail },
})

export const addFreelanceSuccess = freelance => ({
  type: ADD_FREELANCE_SUCCESS,
  payload: freelance ,
})

export const addFreelanceFail = error => ({
  type: ADD_FREELANCE_FAIL,
  payload: error,
})

export const updateFreelance = (freelance, id, history, cbDone, cbFail) => ({
  type: UPDATE_FREELANCE,
  payload: { freelance, id, history, cbDone, cbFail },
})

export const updateFreelanceSuccess = (freelance, id) => ({
  type: UPDATE_FREELANCE_SUCCESS,
  payload: { freelance, id },
})

export const updateFreelanceFail = error => ({
  type: UPDATE_FREELANCE_FAIL,
  payload: error,
})

export const deleteFreelance = (freelance, cbDone, cbFail) => ({
  type: DELETE_FREELANCE,
  payload: { freelance, cbDone, cbFail },
})

export const deleteFreelanceSuccess = freelance => ({
  type: DELETE_FREELANCE_SUCCESS,
  payload: freelance ,
})

export const deleteFreelanceFail = error => ({
  type: DELETE_FREELANCE_FAIL,
  payload: error,
})

