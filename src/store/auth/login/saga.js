// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// // Login Redux States
// import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
// import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

// //Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";
// import {
//   postFakeLogin,
//   postJwtLogin,
//   postSocialLogin,
// } from "../../../helpers/fakebackend_helper";

// const fireBaseBackend = getFirebaseBackend();

import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import {
  apiError,
  loginMentorSuccess,
  loginStudentSuccess,
  loginSuccess,
} from "./actions"
import { LOGIN_MENTOR, LOGIN_STD, LOGIN_USER, LOGOUT_USER } from "./actionTypes"

//Include Both Helper File with needed methods
import {
  adminLogin,
  mentorLogin,
  studentLogin,
} from "helpers/fakebackend_helper"

function* loginUser({ payload }) {
  const { user, history, cb, cb2 } = payload

  try {
    const response = yield call(adminLogin, {
      email: user.email,
      password: user.password,
    })
    localStorage.setItem("authUserLogin", response?.data?.token)
    localStorage.setItem("Role", response?.data?.type)
    yield put(loginSuccess(response?.data))
    cb?.()
    history.push("/")
  } catch (error) {
    cb2?.()
    yield put(apiError(error))
  }
}
function* loginMentor({ payload }) {
  const { mentor, history, cb, cb2 } = payload

  try {
    const response = yield call(mentorLogin, {
      email: mentor.email,
      password: mentor.password,
    })
    localStorage.setItem("authUserLogin", response?.data?.token)
    localStorage.setItem("Role", response?.data?.type)
    yield put(loginMentorSuccess(response?.data))
    cb?.()
    history.push("/")
  } catch (error) {
    cb2?.()
    yield put(apiError(error))
  }
}
function* loginStudent({ payload }) {
  const { student, history, cb, cb2 } = payload

  try {
    const response = yield call(studentLogin, {
      email: student.email,
      password: student.password,
    })
    localStorage.setItem("authUserLogin", response?.data?.token)
    localStorage.setItem("Role", response?.data?.type)
    localStorage.setItem("ID", response?.data?.user?.id)

    yield put(loginStudentSuccess(response?.data))
    cb?.()
    history.push("/")
  } catch (error) {
    cb2?.()
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.clear()
    history.push("/")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(LOGIN_MENTOR, loginMentor)
  yield takeEvery(LOGIN_STD, loginStudent)
}

export default authSaga
