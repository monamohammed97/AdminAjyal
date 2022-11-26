import { call, put, takeEvery } from "redux-saga/effects"

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
    yield put(getActivityTypeFail(error))
  }
}

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
    yield put(updateActivityTypeSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateActivityTypeFail(error))
  }
}
function* onDeleteActivityType({ payload }) {
  const { activityType, cbDone, cbFail } = payload
  try {
    yield call(deleteActivityTypeAjyal, activityType?.id)
    yield put(deleteActivityTypeSuccess(activityType?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteActivityTypeFail(error))
  }
}

function* activityTypesSaga() {
  yield takeEvery(GET_ACTIVITY_TYPE, fetchActivityType)
  yield takeEvery(ADD_ACTIVITY_TYPE, onAddActivityType)
  yield takeEvery(UPDATE_ACTIVITY_TYPE, onUpdateActivityType)
  yield takeEvery(DELETE_ACTIVITY_TYPE, onDeleteActivityType)
}

export default activityTypesSaga
