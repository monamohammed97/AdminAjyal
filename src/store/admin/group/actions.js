import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  ADD_GROUP,
  ADD_GROUP_FAIL,
  ADD_GROUP_SUCCESS,
  DELETE_GROUP,
  DELETE_GROUP_FAIL,
  DELETE_GROUP_SUCCESS,
  UPDATE_GROUP,
  UPDATE_GROUP_FAIL,
  UPDATE_GROUP_SUCCESS,
  IMPORT_EXCEL,
  IMPORT_EXCEL_SUCCESS,
  IMPORT_EXCEL_FAIL,
} from "./actionTypes"

// GET_GROUPS
export const getGroups = () => ({
  type: GET_GROUPS,
})

export const getGroupsSuccess = group => ({
  type: GET_GROUPS_SUCCESS,
  payload: group,
})

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

// actions groups
export const addGroup = (group, cbDone, cbFail) => ({
  type: ADD_GROUP,
  payload: { group, cbDone, cbFail },
})

export const addGroupSuccess = group => ({
  type: ADD_GROUP_SUCCESS,
  payload: group,
})

export const addGroupFail = error => ({
  type: ADD_GROUP_FAIL,
  payload: error,
})

export const updateGroup = (group, id, cbDone, cbFail) => ({
  type: UPDATE_GROUP,
  payload: { group, id, cbDone, cbFail },
})

export const updateGroupSuccess = (group, id) => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: { group, id },
})

export const updateGroupFail = error => ({
  type: UPDATE_GROUP_FAIL,
  payload: error,
})

export const deleteGroup = (group, cbDone, cbFail) => ({
  type: DELETE_GROUP,
  payload: { group, cbDone, cbFail },
})

export const deleteGroupSuccess = group => ({
  type: DELETE_GROUP_SUCCESS,
  payload: group,
})

export const deleteGroupFail = error => ({
  type: DELETE_GROUP_FAIL,
  payload: error,
})

export const importExcel = (excel, cbDone, cbFail) => ({
  type: IMPORT_EXCEL,
  payload: { excel, cbDone, cbFail },
})

export const importExcelSuccess = excel => ({
  type: IMPORT_EXCEL_SUCCESS,
  payload: excel,
})

export const importExcelFail = error => ({
  type: IMPORT_EXCEL_FAIL,
  payload: error,
})
