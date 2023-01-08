import {
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  ADD_RATE,
  ADD_RATE_FAIL,
  ADD_RATE_SUCCESS,
  DELETE_RATE,
  DELETE_RATE_FAIL,
  DELETE_RATE_SUCCESS,
  UPDATE_RATE,
  UPDATE_RATE_FAIL,
  UPDATE_RATE_SUCCESS,
} from "./actionTypes"

// GET_RATES 
export const getRates = () => ({
  type: GET_RATES,
})

export const getRatesSuccess = rate => ({
  type: GET_RATES_SUCCESS,
  payload: rate,
})

export const getRatesFail = error => ({
  type: GET_RATES_FAIL,
  payload: error,
})
// actions rates
export const addRate = (rate, cbDone, cbFail) => ({
  type: ADD_RATE,
  payload: { rate, cbDone, cbFail },
})

export const addRateSuccess = rate => ({
  type: ADD_RATE_SUCCESS,
  payload: rate ,
})

export const addRateFail = error => ({
  type: ADD_RATE_FAIL,
  payload: error,
})

export const updateRate = (rate, id, cbDone, cbFail) => ({
  type: UPDATE_RATE,
  payload: { rate, id, cbDone, cbFail },
})

export const updateRateSuccess = (rate, id) => ({
  type: UPDATE_RATE_SUCCESS,
  payload: { rate, id },
})

export const updateRateFail = error => ({
  type: UPDATE_RATE_FAIL,
  payload: error,
})

export const deleteRate = (rate, cbDone, cbFail) => ({
  type: DELETE_RATE,
  payload: { rate, cbDone, cbFail },
})

export const deleteRateSuccess = rate => ({
  type: DELETE_RATE_SUCCESS,
  payload: rate ,
})

export const deleteRateFail = error => ({
  type: DELETE_RATE_FAIL,
  payload: error,
})

