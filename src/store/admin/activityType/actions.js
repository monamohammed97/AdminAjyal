import {
  GET_ACTIVITY_TYPE,
  GET_ACTIVITY_TYPE_FAIL,
  GET_ACTIVITY_TYPE_SUCCESS,
  ADD_ACTIVITY_TYPE,
  ADD_ACTIVITY_TYPE_FAIL,
  ADD_ACTIVITY_TYPE_SUCCESS,
  DELETE_ACTIVITY_TYPE,
  DELETE_ACTIVITY_TYPE_FAIL,
  DELETE_ACTIVITY_TYPE_SUCCESS,
  UPDATE_ACTIVITY_TYPE,
  UPDATE_ACTIVITY_TYPE_FAIL,
  UPDATE_ACTIVITY_TYPE_SUCCESS,
} from "./actionTypes"

// GET_ACTIVITY_TYPE 
export const getActivityType = () => ({
  type: GET_ACTIVITY_TYPE,
})

export const getActivityTypeSuccess = activityType => ({
  type: GET_ACTIVITY_TYPE_SUCCESS,
  payload: activityType,
})

export const getActivityTypeFail = error => ({
  type: GET_ACTIVITY_TYPE_FAIL,
  payload: error,
})

// actions activityTypes
export const addActivityType = (activityType, cbDone, cbFail) => ({
  type: ADD_ACTIVITY_TYPE,
  payload: { activityType, cbDone, cbFail },
})

export const addActivityTypeSuccess = activityType => ({
  type: ADD_ACTIVITY_TYPE_SUCCESS,
  payload: activityType ,
})

export const addActivityTypeFail = error => ({
  type: ADD_ACTIVITY_TYPE_FAIL,
  payload: error,
})

export const updateActivityType = (activityType, id, cbDone, cbFail) => ({
  type: UPDATE_ACTIVITY_TYPE,
  payload: { activityType, id, cbDone, cbFail },
})

export const updateActivityTypeSuccess = (activityType, id) => ({
  type: UPDATE_ACTIVITY_TYPE_SUCCESS,
  payload: { activityType, id },
})

export const updateActivityTypeFail = error => ({
  type: UPDATE_ACTIVITY_TYPE_FAIL,
  payload: error,
})

export const deleteActivityType = (activityType, cbDone, cbFail) => ({
  type: DELETE_ACTIVITY_TYPE,
  payload: { activityType, cbDone, cbFail },
})

export const deleteActivityTypeSuccess = activityType => ({
  type: DELETE_ACTIVITY_TYPE_SUCCESS,
  payload: activityType ,
})

export const deleteActivityTypeFail = error => ({
  type: DELETE_ACTIVITY_TYPE_FAIL,
  payload: error,
})

