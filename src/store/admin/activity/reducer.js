import {
  GET_ACTIVITES,
  GET_ACTIVITES_FAIL,
  GET_ACTIVITES_SUCCESS,
  ADD_ACTIVITY,
  ADD_ACTIVITY_SUCCESS,
  ADD_ACTIVITY_FAIL,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAIL,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  activities: [],
  isLoading: false,
  isSuccess: false,
  error: null,
}

const activities = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_ACTIVITES
    case GET_ACTIVITES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ACTIVITES_SUCCESS:
      return {
        ...state,
        activities: action.payload || [],
      }
    case GET_ACTIVITES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add activity
    case ADD_ACTIVITY:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: [...state.activities, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_ACTIVITY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update activity

    case UPDATE_ACTIVITY:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id.toString() === action.payload.id.toString()
            ? { activity, ...action.payload?.activity }
            : activity
        ),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_ACTIVITY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete activity

    case DELETE_ACTIVITY:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: state.activities.filter(
          activity => activity.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_ACTIVITY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default activities
