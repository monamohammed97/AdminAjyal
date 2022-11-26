import {
  GET_PLATFORMS,
  GET_PLATFORMS_FAIL,
  GET_PLATFORMS_SUCCESS,
  ADD_PLATFORM,
  ADD_PLATFORM_FAIL,
  ADD_PLATFORM_SUCCESS,
  DELETE_PLATFORM,
  DELETE_PLATFORM_FAIL,
  DELETE_PLATFORM_SUCCESS,
  UPDATE_PLATFORM,
  UPDATE_PLATFORM_FAIL,
  UPDATE_PLATFORM_SUCCESS,
} from "./actionTypes"

// Platforms 
export const getPlatforms = () => ({
  type: GET_PLATFORMS,
})

export const getPlatformsSuccess = platform => ({
  type: GET_PLATFORMS_SUCCESS,
  payload: platform,
})

export const getPlatformsFail = error => ({
  type: GET_PLATFORMS_FAIL,
  payload: error,
})
// actions platforms
export const addPlatform = (platform, cbDone, cbFail) => ({
  type: ADD_PLATFORM,
  payload: { platform, cbDone, cbFail },
})

export const addPlatformSuccess = platform => ({
  type: ADD_PLATFORM_SUCCESS,
  payload: platform ,
})

export const addPlatformFail = error => ({
  type: ADD_PLATFORM_FAIL,
  payload: error,
})

export const updatePlatform = (platform, id, cbDone, cbFail) => ({
  type: UPDATE_PLATFORM,
  payload: { platform, id, cbDone, cbFail },
})

export const updatePlatformSuccess = (platform, id) => ({
  type: UPDATE_PLATFORM_SUCCESS,
  payload: { platform, id },
})

export const updatePlatformFail = error => ({
  type: UPDATE_PLATFORM_FAIL,
  payload: error,
})

export const deletePlatform = (platform, cbDone, cbFail) => ({
  type: DELETE_PLATFORM,
  payload: { platform, cbDone, cbFail },
})

export const deletePlatformSuccess = platform => ({
  type: DELETE_PLATFORM_SUCCESS,
  payload: platform ,
})

export const deletePlatformFail = error => ({
  type: DELETE_PLATFORM_FAIL,
  payload: error,
})

