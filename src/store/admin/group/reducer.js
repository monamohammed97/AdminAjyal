import {
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  groups: [],
  isLoading: false,
  isSuccess: false,
}

const groups = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add group
    case ADD_GROUP:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_GROUP_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update group

    case UPDATE_GROUP:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id.toString() === action.payload.id.toString()
            ? { group, ...action.payload }
            : group
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete group

    case DELETE_GROUP:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.filter(
          group => group.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default groups
