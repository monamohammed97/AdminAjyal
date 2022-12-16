import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_ACTIVITY_TYPE,
  ADD_ACTIVITY_TYPE,
  UPDATE_ACTIVITY_TYPE,
  DELETE_ACTIVITY_TYPE,
} from "./actionTypes"
import {
  getActivityTypeFail,
  getActivityTypeSuccess,
  addActivityTypeSuccess,
  addActivityTypeFail,
  updateActivityTypeSuccess,
  updateActivityTypeFail,
  deleteActivityTypeSuccess,
  deleteActivityTypeFail,
} from "./actions"
import {
  getActivityTypesAjyal,
  addActivityTypeAjyal,
  deleteActivityTypeAjyal,
  updateActivityTypeAjyal,
} from "helpers/fakebackend_helper"

// GET_activities-types
function* fetchActivityType() {
  try {
    const response = yield call(getActivityTypesAjyal)
    yield put(getActivityTypeSuccess(response?.data))
  } catch (error) {
    yield put(getActivityTypeFail(getErrorMessage(error)))
  }
}

function* onAddActivityType({ payload }) {
  const { activityType, cbDone, cbFail } = payload
  try {
    const response = yield call(addActivityTypeAjyal, activityType)
    yield put(addActivityTypeSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addActivityTypeFail(message))
  }
}

function* onUpdateActivityType({ payload }) {
  const { activityType, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateActivityTypeAjyal, id, activityType)
    yield put(updateActivityTypeSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateActivityTypeFail(message))
  }
}
function* onDeleteActivityType({ payload }) {
  const { activityType, cbDone, cbFail } = payload
  try {
    yield call(deleteActivityTypeAjyal, activityType?.id)
    yield put(deleteActivityTypeSuccess(activityType?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteActivityTypeFail(message))
  }
}

function* activityTypesSaga() {
  yield takeEvery(GET_ACTIVITY_TYPE, fetchActivityType)
  yield takeEvery(ADD_ACTIVITY_TYPE, onAddActivityType)
  yield takeEvery(UPDATE_ACTIVITY_TYPE, onUpdateActivityType)
  yield takeEvery(DELETE_ACTIVITY_TYPE, onDeleteActivityType)
}

export default activityTypesSaga
