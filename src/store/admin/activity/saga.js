import { actionChannel, call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_ACTIVITES, ADD_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from "./actionTypes"
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
    yield put(getActivitiesFail(error))
  }
}

function* onAddActivity({ payload }) {
  const { activity, cbDone, cbFail } = payload
  try {
    const response = yield call(addActivityAjyal, activity)
    yield put(addActivitySuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addActivityFail(error))
  }
}

function* onUpdateActivity({ payload }) {
  const { activity, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateActivityAjyal, id, activity)
    yield put(updateActivitySuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateActivityFail(error))
  }
}
function* onDeleteActivity({ payload }) {
  const { activity, cbDone, cbFail } = payload
  try {
    yield call(deleteActivityAjyal, activity?.id)
    yield put(deleteActivitySuccess(activity?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteActivityFail(error))
  }
}

function* activitysSaga() {
  yield takeEvery(GET_ACTIVITES, fetchActivities)
  yield takeEvery(ADD_ACTIVITY, onAddActivity)
  yield takeEvery(UPDATE_ACTIVITY, onUpdateActivity)
  yield takeEvery(DELETE_ACTIVITY, onDeleteActivity)
}

export default activitysSaga
