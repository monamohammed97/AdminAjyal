import {
  GET_STUDENTS_G,
  GET_STUDENTS_G_FAIL,
  GET_STUDENTS_G_SUCCESS,
  GET_ATTENDENCE,
  GET_ATTENDENCE_FAIL,
  GET_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE,
  ADD_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  data: {},
  students_attendence: [],
  isLoading: false,
  isSuccess: false,
}

const attendence = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_STUDENTS_G
    case GET_STUDENTS_G:
      return {
        ...state,
        isLoading: true,
      }
    case GET_STUDENTS_G_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        students_attendence: action.payload,
      }
    case GET_STUDENTS_G_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      }

    // GET_ATTENDENCE
    case GET_ATTENDENCE:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ATTENDENCE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case GET_ATTENDENCE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add rate
    case ADD_ATTENDENCE:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ATTENDENCE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      }
    case ADD_ATTENDENCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default attendence
