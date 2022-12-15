import {
  CHANGE_PASS,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERROR,
} from "./actionTypes"

export const changePassword = (data, cbDone, cbFail) => {
  return {
    type: CHANGE_PASS,
    payload: {data, cbDone, cbFail},
  }
}

export const changePasswordSuccess = (message) => {
  return {
    type: CHANGE_PASS_SUCCESS,
    payload: message,
  }
}

export const changePasswordError = error => {
  return {
    type: CHANGE_PASS_ERROR,
    payload: error,
  }
}
