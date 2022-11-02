import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_COURSE, UPDATE_COURSE, DELETE_COURSE } from "./actionTypes"
import {
  addCourseSuccess,
  addCourseFail,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourseSuccess,
  deleteCourseFail,
} from "./actions"
import {
  addCourseAjyal,
  deleteCourseAjyal,
  updateCourseAjyal,
} from "helpers/fakebackend_helper"

function* onAddCourse({ payload }) {
  const { course, cbDone, cbFail } = payload
  try {
    const response = yield call(addCourseAjyal, course)
    yield put(addCourseSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addCourseFail(error))
  }
}

function* onUpdateCourse({ payload }) {
  const { course, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateCourseAjyal, id, course)
    yield put(updateCourseSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateCourseFail(error))
  }
}
function* onDeleteCourse({ payload }) {
  const { course, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteCourseAjyal, course?.id)
    console.log(response)
    yield put(deleteCourseSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteCourseFail(error))
  }
}

function* coursesSaga() {
  yield takeEvery(ADD_COURSE, onAddCourse)
  yield takeEvery(UPDATE_COURSE, onUpdateCourse)
  yield takeEvery(DELETE_COURSE, onDeleteCourse)
}

export default coursesSaga
