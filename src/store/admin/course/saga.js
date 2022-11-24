import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_COURSES,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "./actionTypes"
import {
  getCoursesSuccess,
  getCoursesFail,
  addCourseSuccess,
  addCourseFail,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourseSuccess,
  deleteCourseFail,
} from "./actions"
import {
  getCoursesAjyal,
  addCourseAjyal,
  deleteCourseAjyal,
  updateCourseAjyal,
} from "helpers/fakebackend_helper"

// GET_COURSES
function* fetchCourses() {
  try {
    const response = yield call(getCoursesAjyal)
    yield put(getCoursesSuccess(response?.data))
  } catch (error) {
    yield put(getCoursesFail(error))
  }
}

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
    yield put(updateCourseSuccess(response?.data, id))
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
    yield put(deleteCourseSuccess(course?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteCourseFail(error))
  }
}

function* coursesSaga() {
  yield takeEvery(GET_COURSES, fetchCourses)
  yield takeEvery(ADD_COURSE, onAddCourse)
  yield takeEvery(UPDATE_COURSE, onUpdateCourse)
  yield takeEvery(DELETE_COURSE, onDeleteCourse)
}

export default coursesSaga
