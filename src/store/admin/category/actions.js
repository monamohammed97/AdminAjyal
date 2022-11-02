import {
  ADD_CATEGORY,
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "./actionTypes"

// actions categorys
export const addCategory = (category, cbDone, cbFail) => ({
  type: ADD_CATEGORY,
  payload: { category, cbDone, cbFail },
})

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: category ,
})

export const addCategoryFail = error => ({
  type: ADD_CATEGORY_FAIL,
  payload: error,
})

export const updateCategory = (category, id, cbDone, cbFail) => ({
  type: UPDATE_CATEGORY,
  payload: { category, id, cbDone, cbFail },
})

export const updateCategorySuccess = (category, id) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: { category, id },
})

export const updateCategoryFail = error => ({
  type: UPDATE_CATEGORY_FAIL,
  payload: error,
})

export const deleteCategory = (category, cbDone, cbFail) => ({
  type: DELETE_CATEGORY,
  payload: { category, cbDone, cbFail },
})

export const deleteCategorySuccess = category => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: category ,
})

export const deleteCategoryFail = error => ({
  type: DELETE_CATEGORY_FAIL,
  payload: error,
})

