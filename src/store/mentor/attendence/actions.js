import {
  GET_STUDENTS_G,
  GET_STUDENTS_G_FAIL,
  GET_STUDENTS_G_SUCCESS,
  GET_ATTENDENCE,
  GET_ATTENDENCE_FAIL,
  GET_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE,
  ADD_ATTENDENCE_FAIL,
  ADD_ATTENDENCE_SUCCESS,
} from "./actionTypes"

// GET_ATTENDENCE 
export const getStudentsG = (course_id, date) => ({
  type: GET_STUDENTS_G,
  payload: {course_id, date}
})

export const getStudentsGSuccess = data => ({
  type: GET_STUDENTS_G_SUCCESS,
  payload: data,
})

export const getStudentsGFail = error => ({
  type: GET_STUDENTS_G_FAIL,
  payload: error,
})

// GET_ATTENDENCE 
export const getAttend = () => ({
  type: GET_ATTENDENCE,
})

export const getAttendSuccess = data => ({
  type: GET_ATTENDENCE_SUCCESS,
  payload: data,
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
