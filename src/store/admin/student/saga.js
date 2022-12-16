import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_STUDENTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "./actionTypes"
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
    yield put(getStudentsFail(getErrorMessage(error)))
  }
}
function* onAddStudent({ payload }) {
  const { student, cbDone, cbFail } = payload
  try {
    const response = yield call(addStudentAjyal, student)
    yield put(addStudentSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addStudentFail(message))
    cbFail?.()
  }
}

function* onUpdateStudent({ payload }) {
  const { student, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateStudentAjyal, id, student)
    yield put(updateStudentSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateStudentFail(message))
  }
}
function* onDeleteStudent({ payload }) {
  const { student, cbDone, cbFail } = payload
  try {
    yield call(deleteStudentAjyal, student?.id)
    yield put(deleteStudentSuccess(student?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteStudentFail(message))
  }
}

function* studentsSaga() {
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(ADD_STUDENT, onAddStudent)
  yield takeEvery(UPDATE_STUDENT, onUpdateStudent)
  yield takeEvery(DELETE_STUDENT, onDeleteStudent)
}

export default studentsSaga
