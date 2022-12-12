import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "./actionTypes"
import {
  getStudentsFail,
  getStudentsSuccess,
  addStudentSuccess,
  addStudentFail,
  updateStudentSuccess,
  updateStudentFail,
  deleteStudentSuccess,
  deleteStudentFail,
} from "./actions"
import {
  getStudentsAjyal,
  addStudentAjyal,
  deleteStudentAjyal,
  updateStudentAjyal,
} from "helpers/fakebackend_helper"

// GET_STUDENTS
function* fetchStudents() {
  try {
    const response = yield call(getStudentsAjyal)
    yield put(getStudentsSuccess(response?.data))
  } catch (error) {
    yield put(getStudentsFail(error))
  }
}
function* onAddStudent({ payload }) {
  const { student, cbDone, cbFail } = payload
  try {
    const response = yield call(addStudentAjyal, student)
    yield put(addStudentSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addStudentFail(error))
  }
}

function* onUpdateStudent({ payload }) {
  const { student, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateStudentAjyal, id, student)
    yield put(updateStudentSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateStudentFail(error))
  }
}
function* onDeleteStudent({ payload }) {
  const { student, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteStudentAjyal, student?.id)
    console.log(response)
    yield put(deleteStudentSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteStudentFail(error))
  }
}

function* studentsSaga() {
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(ADD_STUDENT, onAddStudent)
  yield takeEvery(UPDATE_STUDENT, onUpdateStudent)
  yield takeEvery(DELETE_STUDENT, onDeleteStudent)
}

export default studentsSaga
