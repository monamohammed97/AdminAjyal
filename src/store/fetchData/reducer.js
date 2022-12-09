import {
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
