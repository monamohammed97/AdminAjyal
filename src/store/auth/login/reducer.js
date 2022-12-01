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

const userRole = localStorage?.getItem("Role") || null
const userToken = localStorage?.getItem("authUserLogin") || null

const initialState = {
  error: "",
  loading: false,
  isAuth: !!userToken,
  role: userRole,
  token: userToken,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: !!action.payload?.token,
        token: action.payload?.token || null,
        role: action.payload?.type || null,
      }
    case LOGIN_MENTOR:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_MENTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: !!action.payload?.token,
        token: action.payload?.token || null,
        role: action.payload?.type || null,
      }

    case LOGIN_STD:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_STD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: !!action.payload?.token,
        token: action.payload?.token || null,
        role: action.payload?.type || null,
      }
    case LOGOUT_USER:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        token: null,
        role: null,
      }
    case API_ERROR:
      return { ...state, error: action.payload, loading: false }

    default:
      return state
  }
}

export default login
