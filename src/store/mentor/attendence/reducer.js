import {
  GET_ATTENDENCE,
  GET_ATTENDENCE_FAIL,
  GET_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE,
  ADD_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  data: {},
  isLoading: false,
  isSuccess: false,
}

const attendence = (state = INIT_STATE, action) => {
  switch (action.type) {
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
        isSuccess: true
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
