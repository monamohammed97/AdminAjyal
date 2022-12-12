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
  IMPORT_EXCEL,
  IMPORT_EXCEL_SUCCESS,
  IMPORT_EXCEL_FAIL,
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
        groups: [...state.groups, action.payload],
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
      return {
        ...state,
        groups: state.groups.map(group => {
          if (group.id.toString() === action.payload.id.toString()) {
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
          group => group.id.toString() !== action.payload.toString()
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

    // import excel
    case IMPORT_EXCEL:
      return {
        ...state,
        isLoading: true,
      }
    case IMPORT_EXCEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      }
    case IMPORT_EXCEL_FAIL:
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
