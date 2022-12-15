import {
  CHANGE_PASS,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERROR,
} from "./actionTypes"

const initialState = {
  error:"",
  msg:""
}

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASS:
      return {
        ...state,
      }
      break
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        msg: action.payload,
        isLoading: false,
        isSuccess: true
      }
      break
    case CHANGE_PASS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
      break
    default:
      return state 
      break
  }
  return state
}

export default changePassword
