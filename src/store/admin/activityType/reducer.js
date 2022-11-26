import {
  GET_ACTIVITY_TYPE,
  GET_ACTIVITY_TYPE_FAIL,
  GET_ACTIVITY_TYPE_SUCCESS,
  ADD_ACTIVITY_TYPE,
  ADD_ACTIVITY_TYPE_SUCCESS,
  ADD_ACTIVITY_TYPE_FAIL,
  UPDATE_ACTIVITY_TYPE,
  UPDATE_ACTIVITY_TYPE_SUCCESS,
  UPDATE_ACTIVITY_TYPE_FAIL,
  DELETE_ACTIVITY_TYPE,
  DELETE_ACTIVITY_TYPE_SUCCESS,
  DELETE_ACTIVITY_TYPE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  activityType: [],
  isLoading: false,
  isSuccess: false,
}

const activityType = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_ACTIVITY_TYPE
    case GET_ACTIVITY_TYPE:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ACTIVITY_TYPE_SUCCESS:
      return {
        ...state,
        activityType: action.payload,
      }
    case GET_ACTIVITY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add activity
    case ADD_ACTIVITY_TYPE:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ACTIVITY_TYPE_SUCCESS:
      return {
        ...state,
        activityType: [...state?.activityType, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_ACTIVITY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update activity

    case UPDATE_ACTIVITY_TYPE:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_ACTIVITY_TYPE_SUCCESS:
      console.log("state.activityType:", state.activityType)
      console.log(
        ":UPDATE_ACTIVITY_TYPE_SUCCESS :action.payload:",
        action.payload
      )
      return {
        ...state,
        activityType: state.activityType.map(activity =>
          activity.id.toString() === action.payload.id.toString()
            ? { activity, ...action.payload?.activityType }
            : activity
        ),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_ACTIVITY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete activity

    case DELETE_ACTIVITY_TYPE:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_ACTIVITY_TYPE_SUCCESS:
      return {
        ...state,
        activityType: state.activityType.filter(
          activity => activity.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_ACTIVITY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default activityType
