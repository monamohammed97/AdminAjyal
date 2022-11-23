import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
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
    // GET_GROUPS
    case GET_GROUPS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      }
    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
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
        isSuccess: true,
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
      console.log("action.payload.id: ", action.payload.id)
      console.log("group: ", state)
      return {
        ...state,
        groups: state.groups.map(group => {
          if (group.id.toString() === action.payload.id.toString()) {
            console.log("action.payload: ", { group, ...action.payload?.group })
            console.log("group: ", group.status)
            console.log("group: ", action.payload?.group?.status)

            return { group, ...action.payload?.group }
          } else return group
        }),
        isLoading: false,
        isSuccess: true,
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
        isSuccess: true,
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
