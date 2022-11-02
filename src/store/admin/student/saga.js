import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "./actionTypes"
import {
  addStudentSuccess,
  addStudentFail,
  updateStudentSuccess,
  updateStudentFail,
  deleteStudentSuccess,
  deleteStudentFail,
} from "./actions"
import {
  addStudentAjyal,
  deleteStudentAjyal,
  updateStudentAjyal,
} from "helpers/fakebackend_helper"

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
  yield takeEvery(ADD_STUDENT, onAddStudent)
  yield takeEvery(UPDATE_STUDENT, onUpdateStudent)
  yield takeEvery(DELETE_STUDENT, onDeleteStudent)
}

export default studentsSaga
