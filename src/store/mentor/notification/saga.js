import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"

// Ecommerce Redux States
import { GET_NOTIFICATION } from "./actionTypes"
import { getNotificationsFail, getNotificationsSuccess } from "./actions"
import { getNotificationsAjyal } from "helpers/fakebackend_helper"

// GET_RATES
function* fetchNotifications() {
  try {
    const response = yield call(getNotificationsAjyal)
    yield put(getNotificationsSuccess(response?.data))
  } catch (error) {
    yield put(getNotificationsFail(getErrorMessage(error)))
  }
}

function* notificationsSaga() {
  yield takeEvery(GET_NOTIFICATION, fetchNotifications)
}

export default notificationsSaga
