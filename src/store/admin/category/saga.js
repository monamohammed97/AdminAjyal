import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./actionTypes"
import {
  getCategoryFail,
  getCategorySuccess,
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
  getCategoryAjyal,
} from "helpers/fakebackend_helper"

// GET_CATEGORY
function* fetchCategory() {
  try {
    const response = yield call(getCategoryAjyal)
    yield put(getCategorySuccess(response?.data))
  } catch (error) {
    yield put(getCategoryFail(error))
  }
}

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
    yield put(updateCategorySuccess(response?.data, id))
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
    yield put(deleteCategorySuccess(category?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteCategoryFail(error))
  }
}

function* categorySaga() {
  yield takeEvery(GET_CATEGORY, fetchCategory)
  yield takeEvery(ADD_CATEGORY, onAddCategory)
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategory)
  yield takeEvery(DELETE_CATEGORY, onDeleteCategory)
}

export default categorySaga
