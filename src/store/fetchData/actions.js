import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_MENTORS,
  GET_MENTORS_FAIL,
  GET_MENTORS_SUCCESS,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  
} from "./actionTypes"

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

// mentors
export const getMentors = () => ({
  type: GET_MENTORS,
})

export const getMentorsSuccess = mentors => ({
  type: GET_MENTORS_SUCCESS,
  payload: mentors,
})

export const getMentorsFail = error => ({
  type: GET_MENTORS_FAIL,
  payload: error,
})


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


