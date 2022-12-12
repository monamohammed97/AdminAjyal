import {
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
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

// GET_STUDENTS 
export const getStudents = () => ({
  type: GET_STUDENTS,
})

export const getStudentsSuccess = mentors => ({
  type: GET_STUDENTS_SUCCESS,
  payload: mentors,
})

export const getStudentsFail = error => ({
  type: GET_STUDENTS_FAIL,
  payload: error,
})

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

