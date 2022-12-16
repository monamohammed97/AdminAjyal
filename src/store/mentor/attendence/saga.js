import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import { GET_RATES, ADD_RATE, UPDATE_RATE, DELETE_RATE } from "./actionTypes"
import {
  getRatesFail,
  getRatesSuccess,
  addRateSuccess,
  addRateFail,
  updateRateSuccess,
  updateRateFail,
  deleteRateSuccess,
  deleteRateFail,
} from "./actions"
import {
  getRatesAjyal,
  addRateAjyal,
  deleteRateAjyal,
  updateRateAjyal,
} from "helpers/fakebackend_helper"

// GET_RATES
function* fetchRates() {
  try {
    const response = yield call(getRatesAjyal)
    yield put(getRatesSuccess(response?.data))
  } catch (error) {
    yield put(getRatesFail(getErrorMessage(error)))
  }
}

function* onAddRate({ payload }) {
  const { rate, cbDone, cbFail } = payload
  try {
    const response = yield call(addRateAjyal, rate)
    yield put(addRateSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addRateFail(message))
  }
}

function* onUpdateRate({ payload }) {
  const { rate, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateRateAjyal, id, rate)
    yield put(updateRateSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateRateFail(message))
  }
}
function* onDeleteRate({ payload }) {
  const { rate, cbDone, cbFail } = payload
  try {
    yield call(deleteRateAjyal, rate?.student_id)
    yield put(deleteRateSuccess(rate?.student_id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteRateFail(message))
  }
}

function* ratesSaga() {
  yield takeEvery(GET_RATES, fetchRates)
  yield takeEvery(ADD_RATE, onAddRate)
  yield takeEvery(UPDATE_RATE, onUpdateRate)
  yield takeEvery(DELETE_RATE, onDeleteRate)
}

export default ratesSaga
