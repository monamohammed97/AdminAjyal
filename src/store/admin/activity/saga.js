import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_ACTIVITES,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
} from "./actionTypes"
import {
  getActivitiesFail,
  getActivitiesSuccess,
  addActivitySuccess,
  addActivityFail,
  updateActivitySuccess,
  updateActivityFail,
  deleteActivitySuccess,
  deleteActivityFail,
} from "./actions"
import {
  getActivitiesAjyal,
  addActivityAjyal,
  deleteActivityAjyal,
  updateActivityAjyal,
} from "helpers/fakebackend_helper"

// GET_ACTIVITES
function* fetchActivities() {
  try {
    const response = yield call(getActivitiesAjyal)
    yield put(getActivitiesSuccess(response?.data))
  } catch (error) {
    yield put(getActivitiesFail(getErrorMessage(error)))
  }
}

function* onAddActivity({ payload }) {
  const { activity, cbDone, cbFail } = payload
  try {
    const response = yield call(addActivityAjyal, activity)
    yield put(addActivitySuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addActivityFail(message))
  }
}

function* onUpdateActivity({ payload }) {
  const { activity, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateActivityAjyal, id, activity)
    yield put(updateActivitySuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateActivityFail(message))
  }
}
function* onDeleteActivity({ payload }) {
  const { activity, cbDone, cbFail } = payload
  try {
    yield call(deleteActivityAjyal, activity?.id)
    yield put(deleteActivitySuccess(activity?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteActivityFail(message))
  }
}

function* activitysSaga() {
  yield takeEvery(GET_ACTIVITES, fetchActivities)
  yield takeEvery(ADD_ACTIVITY, onAddActivity)
  yield takeEvery(UPDATE_ACTIVITY, onUpdateActivity)
  yield takeEvery(DELETE_ACTIVITY, onDeleteActivity)
}

export default activitysSaga
