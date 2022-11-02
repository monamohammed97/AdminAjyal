import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_RATE, UPDATE_RATE, DELETE_RATE } from "./actionTypes"
import {
  addRateSuccess,
  addRateFail,
  updateRateSuccess,
  updateRateFail,
  deleteRateSuccess,
  deleteRateFail,
} from "./actions"
import {
  addRateAjyal,
  deleteRateAjyal,
  updateRateAjyal,
} from "helpers/fakebackend_helper"

function* onAddRate({ payload }) {
  const { rate, cbDone, cbFail } = payload
  try {
    const response = yield call(addRateAjyal, rate)
    yield put(addRateSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addRateFail(error))
  }
}

function* onUpdateRate({ payload }) {
  const { rate, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateRateAjyal, id, rate)

    yield put(updateRateSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateRateFail(error))
  }
}
function* onDeleteRate({ payload }) {
  const { rate, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteRateAjyal, rate?.student_id)
    console.log(response, rate)
    yield put(deleteRateSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteRateFail(error))
  }
}

function* ratesSaga() {
  yield takeEvery(ADD_RATE, onAddRate)
  yield takeEvery(UPDATE_RATE, onUpdateRate)
  yield takeEvery(DELETE_RATE, onDeleteRate)
}

export default ratesSaga
