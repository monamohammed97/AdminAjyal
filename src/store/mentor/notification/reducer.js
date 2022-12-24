import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  notification: [],
  isLoading: false,
  isSuccess: false,
  error: null,
}

const notifications = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_RATES
    case GET_NOTIFICATION:
      return {
        ...state,
        isLoading: true,
      }
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload || [],
      }
    case GET_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default notifications
