import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_USER, UPDATE_USER, DELETE_USER } from "./actionTypes"
import {
  addUserSuccess,
  addUserFail,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"
import {
  addUserAjyal,
  deleteUserAjyal,
  updateUserAjyal,
} from "helpers/fakebackend_helper"

function* onAddUser({ payload }) {
  const { user, cbDone, cbFail } = payload
  try {
    const response = yield call(addUserAjyal, user)
    yield put(addUserSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addUserFail(error))
  }
}

function* onUpdateUser({ payload }) {
  const { user, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateUserAjyal, id, user)
    yield put(updateUserSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateUserFail(error))
  }
}
function* onDeleteUser({ payload }) {
  const { user, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteUserAjyal, user?.id)
    console.log(response)
    yield put(deleteUserSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteUserFail(error))
  }
}

function* usersSaga() {
  yield takeEvery(ADD_USER, onAddUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
