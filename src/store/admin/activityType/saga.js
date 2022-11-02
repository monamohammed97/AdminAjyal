import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_ACTIVITY_TYPE, UPDATE_ACTIVITY_TYPE, DELETE_ACTIVITY_TYPE } from "./actionTypes"
import {
  addActivityTypeSuccess,
  addActivityTypeFail,
  updateActivityTypeSuccess,
  updateActivityTypeFail,
  deleteActivityTypeSuccess,
  deleteActivityTypeFail,
} from "./actions"
import {
  addActivityTypeAjyal,
  deleteActivityTypeAjyal,
  updateActivityTypeAjyal,
} from "helpers/fakebackend_helper"

function* onAddActivityType({ payload }) {
  const { activityType, cbDone, cbFail } = payload
  try {
    const response = yield call(addActivityTypeAjyal, activityType)
    yield put(addActivityTypeSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addActivityTypeFail(error))
  }
}

function* onUpdateActivityType({ payload }) {
  const { activityType, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateActivityTypeAjyal, id, activityType)
    yield put(updateActivityTypeSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateActivityTypeFail(error))
  }
}
function* onDeleteActivityType({ payload }) {
  const { activityType, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteActivityTypeAjyal, activityType?.id)
    console.log(response)
    yield put(deleteActivityTypeSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteActivityTypeFail(error))
  }
}

function* activityTypesSaga() {
  yield takeEvery(ADD_ACTIVITY_TYPE, onAddActivityType)
  yield takeEvery(UPDATE_ACTIVITY_TYPE, onUpdateActivityType)
  yield takeEvery(DELETE_ACTIVITY_TYPE, onDeleteActivityType)
}

export default activityTypesSaga
