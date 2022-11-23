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
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  GET_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
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

    // GET_PLATFORMS
    case GET_PLATFORMS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PLATFORMS_SUCCESS:
      return {
        ...state,
        platforms: action.payload,
      }
    case GET_PLATFORMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_PARTNERS
    case GET_PARTNERS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PARTNERS_SUCCESS:
      return {
        ...state,
        partners: action.payload,
      }
    case GET_PARTNERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_ADVERTISINGS
    case GET_ADVERTISINGS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ADVERTISINGS_SUCCESS:
      return {
        ...state,
        ads: action.payload,
      }
    case GET_ADVERTISINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_ACTIVITES
    case GET_ACTIVITES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ACTIVITES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
      }
    case GET_ACTIVITES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_PROJECTS
    case GET_PROJECTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      }
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_CATEGORY
    case GET_CATEGORY:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      }
    case GET_CATEGORY_FAIL:
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
    // GET_COURSES
    case GET_COURSES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
      }
    case GET_COURSES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_QUESTIONS
    case GET_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      }
    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_ACTIVITY_TYPE
    case GET_ACTIVITY_TYPE:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ACTIVITY_TYPE_SUCCESS:
      return {
        ...state,
        activityTypes: action.payload,
      }
    case GET_ACTIVITY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_FREELANCER
    case GET_FREELANCER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_FREELANCER_SUCCESS:
      return {
        ...state,
        freelancer: action.payload,
        isLoading: false,
      }
    case GET_FREELANCER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_CONTACTS
    case GET_CONTACTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        isLoading: false,
      }
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // GET_ABOUTUS
    case GET_ABOUTUS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUS: action.payload,
        isLoading: false,
      }
    case GET_ABOUTUS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default data
