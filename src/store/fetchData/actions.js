import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_MENTORS,
  GET_MENTORS_FAIL,
  GET_MENTORS_SUCCESS,
  GET_PLATFORMS,
  GET_PLATFORMS_FAIL,
  GET_PLATFORMS_SUCCESS,
  GET_PARTNERS,
  GET_PARTNERS_FAIL,
  GET_PARTNERS_SUCCESS,
  GET_ADVERTISINGS,
  GET_ADVERTISINGS_FAIL,
  GET_ADVERTISINGS_SUCCESS,
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
  GET_QUESTIONS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_SUCCESS,
  GET_ACTIVITY_TYPE,
  GET_ACTIVITY_TYPE_FAIL,
  GET_ACTIVITY_TYPE_SUCCESS,
  GET_FREELANCER,
  GET_FREELANCER_FAIL,
  GET_FREELANCER_SUCCESS,
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_ABOUTUS,
  GET_ABOUTUS_FAIL,
  GET_ABOUTUS_SUCCESS,
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

// Platforms 
export const getPlatforms = () => ({
  type: GET_PLATFORMS,
})

export const getPlatformsSuccess = mentors => ({
  type: GET_PLATFORMS_SUCCESS,
  payload: mentors,
})

export const getPlatformsFail = error => ({
  type: GET_PLATFORMS_FAIL,
  payload: error,
})

// getPartenrs 
export const getPartenrs = () => ({
  type: GET_PARTNERS,
})

export const getPartenrsSuccess = mentors => ({
  type: GET_PARTNERS_SUCCESS,
  payload: mentors,
})

export const getPartenrsFail = error => ({
  type: GET_PARTNERS_FAIL,
  payload: error,
})

// getAds 
export const getAds = () => ({
  type: GET_ADVERTISINGS,
})

export const getAdsSuccess = mentors => ({
  type: GET_ADVERTISINGS_SUCCESS,
  payload: mentors,
})

export const getAdsFail = error => ({
  type: GET_ADVERTISINGS_FAIL,
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

// GET_QUESTIONS 
export const getQuestions = () => ({
  type: GET_QUESTIONS,
})

export const getQuestionsSuccess = mentors => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: mentors,
})

export const getQuestionsFail = error => ({
  type: GET_QUESTIONS_FAIL,
  payload: error,
})

// GET_ACTIVITY_TYPE 
export const getActivityType = () => ({
  type: GET_ACTIVITY_TYPE,
})

export const getActivityTypeSuccess = activityType => ({
  type: GET_ACTIVITY_TYPE_SUCCESS,
  payload: activityType,
})

export const getActivityTypeFail = error => ({
  type: GET_ACTIVITY_TYPE_FAIL,
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

// GET_CONTACTS 
export const getContacts = () => ({
  type: GET_CONTACTS,
})

export const getContactsSuccess = contatcs => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contatcs,
})

export const getContactsFail = error => ({
  type: GET_CONTACTS_FAIL,
  payload: error,
})
// GET_CONTACTS 
export const getAboutus = () => ({
  type: GET_ABOUTUS,
})

export const getAboutusSuccess = aboutUs => ({
  type: GET_ABOUTUS_SUCCESS,
  payload: aboutUs,
})

export const getAboutusFail = error => ({
  type: GET_ABOUTUS_FAIL,
  payload: error,
})
