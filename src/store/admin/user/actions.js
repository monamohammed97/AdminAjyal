import {
  ADD_USER,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./actionTypes"

// actions users
export const addUser = (user, cbDone, cbFail) => ({
  type: ADD_USER,
  payload: { user, cbDone, cbFail },
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user ,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const updateUser = (user, id, cbDone, cbFail) => ({
  type: UPDATE_USER,
  payload: { user, id, cbDone, cbFail },
})

export const updateUserSuccess = (user, id) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user, id },
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = (user, cbDone, cbFail) => ({
  type: DELETE_USER,
  payload: { user, cbDone, cbFail },
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user ,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

