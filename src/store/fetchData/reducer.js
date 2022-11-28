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

const INIT_STATE = {
  users: [],
  mentors: [],
  platforms: [],
  partners: [],
  ads: [],
  activities: [],
  projects: [],
  groups: [],
  category: [],
  students: [],
  rates: [],
  courses: [],
  questions: [],
  activityTypes: [],
  freelancer: [],
  contacts: [],
  aboutUS: {},
  isLoading: false,
}

const data = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // Mentors
    case GET_MENTORS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MENTORS_SUCCESS:
      return {
        ...state,
        mentors: action.payload,
      }
    case GET_MENTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // GET_STUDENTS
    case GET_STUDENTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      }
    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_RATES
    case GET_RATES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_RATES_SUCCESS:
      return {
        ...state,
        rates: action.payload,
      }
    case GET_RATES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    
    default:
      return state
  }
}

export default data
