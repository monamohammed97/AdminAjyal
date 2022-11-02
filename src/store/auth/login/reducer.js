import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  LOGIN_STD,
  LOGIN_STD_SUCCESS,
  LOGIN_MENTOR,
  LOGIN_MENTOR_SUCCESS,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  isAuth: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        isAuth: !!action.payload.token,
      }
      break
    
    case LOGIN_MENTOR:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_MENTOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        isAuth: !!action.payload.token,
      }
      break

    case LOGIN_STD:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_STD_SUCCESS:
      state = {
        ...state,
        loading: false,
        isAuth: !!action.payload.token,
      }
      break






    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
