import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import { GET_STUDENTS_G, ADD_ATTENDENCE } from "./actionTypes"
import {
  getStudentsGFail,
  getStudentsGSuccess,
  addAttendSuccess,
  addAttendFail,
} from "./actions"
import {
  getStudentsGAjyal,
  addAttendAjyal,
  // addAttendAjyal,
} from "helpers/fakebackend_helper"

function* onGetStudentsGroup({payload}) {
  const { date, course_id } = payload
  try {
    const response = yield call(getStudentsGAjyal, date, course_id)
    yield put(getStudentsGSuccess(response?.data))
  } catch (error) {
    yield put(getStudentsGFail(getErrorMessage(error)))
  }
}



function* onAddAttend({ payload }) {
  const { data, cbDone } = payload
  try {
    const response = yield call(addAttendAjyal, data)
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
  yield takeEvery(GET_STUDENTS_G, onGetStudentsGroup)
}

export default attendSaga
