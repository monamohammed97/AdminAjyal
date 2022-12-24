import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import { GET_ATTENDENCE, ADD_ATTENDENCE } from "./actionTypes"
import {
  getAttendFail,
  getAttendSuccess,
  addAttendSuccess,
  addAttendFail,
} from "./actions"
import {
  addAttendAjyal,
  // addAttendAjyal,
} from "helpers/fakebackend_helper"

// GET_ATTENDENCE
// function* fetchRates() {
//   try {
//     const response = yield call(addAttendAjyal)
//     yield put(getAttendSuccess(response?.data))
//   } catch (error) {
//     yield put(getAttendFail(getErrorMessage(error)))
//   }
// }

function* onAddAttend({ payload }) {
  const { data, cbDone } = payload
  try {
    const response = yield call(addAttendAjyal, data)
    console.log(response)
    yield put(addAttendSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addAttendFail(message))
  }
}


function* attendSaga() {
  // yield takeEvery(GET_ATTENDENCE, fetchRates)
  yield takeEvery(ADD_ATTENDENCE, onAddAttend)
}

export default attendSaga
