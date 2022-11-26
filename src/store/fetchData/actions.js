import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_MENTORS,
  GET_MENTORS_FAIL,
  GET_MENTORS_SUCCESS,
  GET_ACTIVITES,
  GET_ACTIVITES_FAIL,
  GET_ACTIVITES_SUCCESS,
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  GET_FREELANCER,
  GET_FREELANCER_FAIL,
  GET_FREELANCER_SUCCESS,
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


// GET_ACTIVITES 
export const getActivities = () => ({
  type: GET_ACTIVITES,
})

export const getActivitiesSuccess = mentors => ({
  type: GET_ACTIVITES_SUCCESS,
  payload: mentors,
})

export const getActivitiesFail = error => ({
  type: GET_ACTIVITES_FAIL,
  payload: error,
})

// GET_PROJECTS 
export const getProjects = () => ({
  type: GET_PROJECTS,
})

export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects,
})

export const getProjectsFail = error => ({
  type: GET_PROJECTS_FAIL,
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

// FREELANCER 
export const getFreelancer = () => ({
  type: GET_FREELANCER,
})

export const getFreelancerSuccess = freelancer => ({
  type: GET_FREELANCER_SUCCESS,
  payload: freelancer,
})

export const getFreelancerFail = error => ({
  type: GET_FREELANCER_FAIL,
  payload: error,
})
