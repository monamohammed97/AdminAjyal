import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_STUDENTS, GET_RATES } from "./actionTypes"
import {
  getRatesFail,
  getRatesSuccess,
  getStudentsFail,
  getStudentsSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import { getStudentsAjyal, getRatesAjyal } from "helpers/fakebackend_helper"

// GET_STUDENTS
function* fetchStudents() {
  try {
    const response = yield call(getStudentsAjyal)
    yield put(getStudentsSuccess(response?.data))
  } catch (error) {
    yield put(getStudentsFail(error))
  }
}

// GET_RATES
function* fetchRates() {
  try {
    const response = yield call(getRatesAjyal)
    yield put(getRatesSuccess(response?.data))
  } catch (error) {
    yield put(getRatesFail(error))
  }
}

function* fetchDataSaga() {
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(GET_RATES, fetchRates)
}

export default fetchDataSaga
