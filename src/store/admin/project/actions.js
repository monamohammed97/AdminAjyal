import {
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
} from "./actionTypes"

// actions projects
export const addProject = (project, cbDone, cbFail) => ({
  type: ADD_PROJECT,
  payload: { project, cbDone, cbFail },
})

export const addProjectSuccess = project => ({
  type: ADD_PROJECT_SUCCESS,
  payload: project ,
})

export const addProjectFail = error => ({
  type: ADD_PROJECT_FAIL,
  payload: error,
})

export const updateProject = (project, id, cbDone, cbFail) => ({
  type: UPDATE_PROJECT,
  payload: { project, id, cbDone, cbFail },
})

export const updateProjectSuccess = (project, id) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: { project, id },
})

export const updateProjectFail = error => ({
  type: UPDATE_PROJECT_FAIL,
  payload: error,
})

export const deleteProject = (project, cbDone, cbFail) => ({
  type: DELETE_PROJECT,
  payload: { project, cbDone, cbFail },
})

export const deleteProjectSuccess = project => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: project ,
})

export const deleteProjectFail = error => ({
  type: DELETE_PROJECT_FAIL,
  payload: error,
})

