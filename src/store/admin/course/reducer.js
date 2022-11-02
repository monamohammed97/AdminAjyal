import {
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  courses: [],
  isLoading: false,
  isSuccess: false,
}

const courses = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add course
    case ADD_COURSE:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update course

    case UPDATE_COURSE:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id.toString() === action.payload.id.toString()
            ? { course, ...action.payload }
            : course
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete course

    case DELETE_COURSE:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(
          course => course.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default courses
