import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "./actionTypes"
import {
  getUsersFail,
  getUsersSuccess,
  addUserSuccess,
  addUserFail,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"
import {
  getUsersAjyal,
  addUserAjyal,
  deleteUserAjyal,
  updateUserAjyal,
} from "helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsersAjyal)
    yield put(getUsersSuccess(response?.data))
  } catch (error) {
    yield put(getUsersFail(getErrorMessage(error)))
  }
}

function* onAddUser({ payload }) {
  const { user, cbDone, cbFail } = payload
  try {
    const response = yield call(addUserAjyal, user)
    yield put(addUserSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addUserFail(message))
  }
}

function* onUpdateUser({ payload }) {
  const { user, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateUserAjyal, id, user)
    yield put(updateUserSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateUserFail(message))
  }
}
function* onDeleteUser({ payload }) {
  const { user, cbDone, cbFail } = payload
  try {
    yield call(deleteUserAjyal, user?.id)
    yield put(deleteUserSuccess(user?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteUserFail(message))
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(ADD_USER, onAddUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
