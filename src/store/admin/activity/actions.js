import {
  ADD_ACTIVITY,
  ADD_ACTIVITY_FAIL,
  ADD_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_FAIL,
  DELETE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_FAIL,
  UPDATE_ACTIVITY_SUCCESS,
} from "./actionTypes"

// actions activitys
export const addActivity = (activity, cbDone, cbFail) => ({
  type: ADD_ACTIVITY,
  payload: { activity, cbDone, cbFail },
})

export const addActivitySuccess = activity => ({
  type: ADD_ACTIVITY_SUCCESS,
  payload: activity ,
})

export const addActivityFail = error => ({
  type: ADD_ACTIVITY_FAIL,
  payload: error,
})

export const updateActivity = (activity, id, cbDone, cbFail) => ({
  type: UPDATE_ACTIVITY,
  payload: { activity, id, cbDone, cbFail },
})

export const updateActivitySuccess = (activity, id) => ({
  type: UPDATE_ACTIVITY_SUCCESS,
  payload: { activity, id },
})

export const updateActivityFail = error => ({
  type: UPDATE_ACTIVITY_FAIL,
  payload: error,
})

export const deleteActivity = (activity, cbDone, cbFail) => ({
  type: DELETE_ACTIVITY,
  payload: { activity, cbDone, cbFail },
})

export const deleteActivitySuccess = activity => ({
  type: DELETE_ACTIVITY_SUCCESS,
  payload: activity ,
})

export const deleteActivityFail = error => ({
  type: DELETE_ACTIVITY_FAIL,
  payload: error,
})

