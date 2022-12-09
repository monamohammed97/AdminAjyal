import {
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  
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

// GET_RATES 
export const getRates = () => ({
  type: GET_RATES,
})

export const getRatesSuccess = mentors => ({
  type: GET_RATES_SUCCESS,
  payload: mentors,
})

export const getRatesFail = error => ({
  type: GET_RATES_FAIL,
  payload: error,
})


