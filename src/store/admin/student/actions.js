import {
  ADD_STUDENT,
  ADD_STUDENT_FAIL,
  ADD_STUDENT_SUCCESS,
  DELETE_STUDENT,
  DELETE_STUDENT_FAIL,
  DELETE_STUDENT_SUCCESS,
  UPDATE_STUDENT,
  UPDATE_STUDENT_FAIL,
  UPDATE_STUDENT_SUCCESS,
} from "./actionTypes"

// actions students
export const addStudent = (student, cbDone, cbFail) => ({
  type: ADD_STUDENT,
  payload: { student, cbDone, cbFail },
})

export const addStudentSuccess = student => ({
  type: ADD_STUDENT_SUCCESS,
  payload: student ,
})

export const addStudentFail = error => ({
  type: ADD_STUDENT_FAIL,
  payload: error,
})

export const updateStudent = (student, id, cbDone, cbFail) => ({
  type: UPDATE_STUDENT,
  payload: { student, id, cbDone, cbFail },
})

export const updateStudentSuccess = (student, id) => ({
  type: UPDATE_STUDENT_SUCCESS,
  payload: { student, id },
})

export const updateStudentFail = error => ({
  type: UPDATE_STUDENT_FAIL,
  payload: error,
})

export const deleteStudent = (student, cbDone, cbFail) => ({
  type: DELETE_STUDENT,
  payload: { student, cbDone, cbFail },
})

export const deleteStudentSuccess = student => ({
  type: DELETE_STUDENT_SUCCESS,
  payload: student ,
})

export const deleteStudentFail = error => ({
  type: DELETE_STUDENT_FAIL,
  payload: error,
})

