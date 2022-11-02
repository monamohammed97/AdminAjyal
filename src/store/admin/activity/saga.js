import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from "./actionTypes"
import {
  addActivitySuccess,
  addActivityFail,
  updateActivitySuccess,
  updateActivityFail,
  deleteActivitySuccess,
  deleteActivityFail,
} from "./actions"
import {
  addActivityAjyal,
  deleteActivityAjyal,
  updateActivityAjyal,
} from "helpers/fakebackend_helper"

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
    yield put(updateActivitySuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateActivityFail(error))
  }
}
function* onDeleteActivity({ payload }) {
  const { activity, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteActivityAjyal, activity?.id)
    console.log(response)
    yield put(deleteActivitySuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteActivityFail(error))
  }
}

function* activitysSaga() {
  yield takeEvery(ADD_ACTIVITY, onAddActivity)
  yield takeEvery(UPDATE_ACTIVITY, onUpdateActivity)
  yield takeEvery(DELETE_ACTIVITY, onDeleteActivity)
}

export default activitysSaga
