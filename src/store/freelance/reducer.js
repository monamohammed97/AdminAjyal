import {
  GET_FREELANCER,
  GET_FREELANCER_FAIL,
  GET_FREELANCER_SUCCESS,
  ADD_FREELANCE,
  ADD_FREELANCE_SUCCESS,
  ADD_FREELANCE_FAIL,
  UPDATE_FREELANCE,
  UPDATE_FREELANCE_SUCCESS,
  UPDATE_FREELANCE_FAIL,
  DELETE_FREELANCE,
  DELETE_FREELANCE_SUCCESS,
  DELETE_FREELANCE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  freelance: [],
  isLoading: false,
  isSuccess: false,
}

const freelance = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_FREELANCER
    case GET_FREELANCER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_FREELANCER_SUCCESS:
      return {
        ...state,
        freelance: action.payload,
        isLoading: false,
      }
    case GET_FREELANCER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add freelance_
    case ADD_FREELANCE:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_FREELANCE_SUCCESS:
      return {
        ...state,
        freelance: [...state.freelance, action.payload],
        isLoading: false,
        isSuccess: true
      }
    case ADD_FREELANCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update freelance_

    case UPDATE_FREELANCE:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_FREELANCE_SUCCESS:
      return {
        ...state,
        freelance: state.freelance.map(freelance_ =>
          freelance_.id.toString() === action.payload.id.toString()
            ? { freelance_, ...action.payload }
            : freelance_
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_FREELANCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete freelance_

    case DELETE_FREELANCE:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_FREELANCE_SUCCESS:
      return {
        ...state,
        freelance: state.freelance.filter(
          freelance_ => freelance_.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_FREELANCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default freelance
