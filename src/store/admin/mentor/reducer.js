import {
  ADD_MENTOR,
  ADD_MENTOR_SUCCESS,
  ADD_MENTOR_FAIL,
  UPDATE_MENTOR,
  UPDATE_MENTOR_SUCCESS,
  UPDATE_MENTOR_FAIL,
  DELETE_MENTOR,
  DELETE_MENTOR_SUCCESS,
  DELETE_MENTOR_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  mentors: [],
  isLoading: false,
  isSuccess: false,
}

const mentors = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add mentor
    case ADD_MENTOR:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_MENTOR_SUCCESS:
      return {
        ...state,
        mentors: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_MENTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update mentor

    case UPDATE_MENTOR:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_MENTOR_SUCCESS:
      return {
        ...state,
        mentors: state.mentors.map(mentor =>
          mentor.id.toString() === action.payload.id.toString()
            ? { mentor, ...action.payload }
            : mentor
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_MENTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete mentor

    case DELETE_MENTOR:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_MENTOR_SUCCESS:
      return {
        ...state,
        mentors: state.mentors.filter(
          mentor => mentor.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_MENTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default mentors
