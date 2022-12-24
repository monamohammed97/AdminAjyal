import {
  GET_ATTENDENCE,
  GET_ATTENDENCE_FAIL,
  GET_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE,
  ADD_ATTENDENCE_FAIL,
  ADD_ATTENDENCE_SUCCESS,
} from "./actionTypes"

// GET_ATTENDENCE 
export const getAttend = () => ({
  type: GET_ATTENDENCE,
})

export const getAttendSuccess = mentors => ({
  type: GET_ATTENDENCE_SUCCESS,
  payload: mentors,
})

export const getAttendFail = error => ({
  type: GET_ATTENDENCE_FAIL,
  payload: error,
})
// actions datas
export const addAttend = (data, cbDone, cbFail) => ({
  type: ADD_ATTENDENCE,
  payload: { data, cbDone, cbFail },
})

export const addAttendSuccess = data => ({
  type: ADD_ATTENDENCE_SUCCESS,
  payload: data ,
})

export const addAttendFail = error => ({
  type: ADD_ATTENDENCE_FAIL,
  payload: error,
})
