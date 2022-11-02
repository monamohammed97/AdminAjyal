import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "./actionTypes"
import {
  addCategorySuccess,
  addCategoryFail,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "./actions"
import {
  addCategoryAjyal,
  deleteCategoryAjyal,
  updateCategoryAjyal,
} from "helpers/fakebackend_helper"

function* onAddCategory({ payload }) {
  const { category, cbDone, cbFail } = payload
  try {
    const response = yield call(addCategoryAjyal, category)
    yield put(addCategorySuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addCategoryFail(error))
  }
}

function* onUpdateCategory({ payload }) {
  const { category, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateCategoryAjyal, id, category)
    yield put(updateCategorySuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateCategoryFail(error))
  }
}
function* onDeleteCategory({ payload }) {
  const { category, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteCategoryAjyal, category?.id)
    console.log(response)
    yield put(deleteCategorySuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteCategoryFail(error))
  }
}

function* categorySaga() {
  yield takeEvery(ADD_CATEGORY, onAddCategory)
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategory)
  yield takeEvery(DELETE_CATEGORY, onDeleteCategory)
}

export default categorySaga
