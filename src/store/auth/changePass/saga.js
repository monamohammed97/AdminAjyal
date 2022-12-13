import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { CHANGE_PASS } from "./actionTypes"
import { changePasswordSuccess, changePasswordError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { changePass } from "../../../helpers/fakebackend_helper"

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* changePassword({ payload }) {
  const { data, cbDone, cbFail } = payload
  try {
    const response = yield call(changePass, data)
    yield put(changePasswordSuccess(response?.msg))
    if(response?.msg == "Password changed successfully!")
      cbDone(response?.msg)
    else
      cbFail(response?.msg)
  } catch (error) {
    cbFail(error)
    yield put(changePasswordError(error))
  }
}

function* changePasswordSaga() {
  yield takeEvery(CHANGE_PASS, changePassword)
}

export default changePasswordSaga
