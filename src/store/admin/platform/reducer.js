import {
  GET_PLATFORMS,
  GET_PLATFORMS_FAIL,
  GET_PLATFORMS_SUCCESS,
  ADD_PLATFORM,
  ADD_PLATFORM_SUCCESS,
  ADD_PLATFORM_FAIL,
  UPDATE_PLATFORM,
  UPDATE_PLATFORM_SUCCESS,
  UPDATE_PLATFORM_FAIL,
  DELETE_PLATFORM,
  DELETE_PLATFORM_SUCCESS,
  DELETE_PLATFORM_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  platforms: [],
  isLoading: false,
  isSuccess: false,
}

const platforms = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_PLATFORMS
    case GET_PLATFORMS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PLATFORMS_SUCCESS:
      return {
        ...state,
        platforms: action.payload || [],
      }
    case GET_PLATFORMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add platform
    case ADD_PLATFORM:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_PLATFORM_SUCCESS:
      return {
        ...state,
        platforms: [...state.platforms, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_PLATFORM_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update platform

    case UPDATE_PLATFORM:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_PLATFORM_SUCCESS:
      return {
        ...state,
        platforms: state.platforms.map(platform => {
          if (platform.id.toString() === action.payload.id.toString()) {
            return { platform, ...action.payload?.platform }
          } else return platform
        }),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_PLATFORM_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete platform

    case DELETE_PLATFORM:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_PLATFORM_SUCCESS:
      return {
        ...state,
        platforms: state.platforms.filter(
          platform => platform.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_PLATFORM_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default platforms
