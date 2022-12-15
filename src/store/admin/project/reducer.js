import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  projects: [],
  isLoading: false,
  isSuccess: false,
}

const projects = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_PROJECTS
    case GET_PROJECTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload || [],
      }
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // add project
    case ADD_PROJECT:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update project

    case UPDATE_PROJECT:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id.toString() === action.payload.id.toString()
            ? { project, ...action.payload?.project }
            : project
        ),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete project

    case DELETE_PROJECT:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default projects
