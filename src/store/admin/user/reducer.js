import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  isLoading: false,
  isSuccess: false,
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add user
    case ADD_USER:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update user

    case UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete user

    case DELETE_USER:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default users
