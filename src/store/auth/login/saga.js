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

import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Login Redux States
import {
  apiError,
  loginMentorSuccess,
  loginStudentSuccess,
  loginSuccess,
  logoutUserSuccess,
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
    if (response?.data?.token) {
      localStorage.setItem("authUserLogin", response?.data?.token)
      localStorage.setItem("Role", response?.data?.type)
      yield put(loginSuccess(response?.data))
      cb?.()
      history.push("/")
    } else if (response?.status == 401) {
      notify("error", "Failed: " + response?.msg)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(apiError(message))
  }
}
function* loginMentor({ payload }) {
  const { mentor, history, cb, cb2 } = payload

  try {
    const response = yield call(mentorLogin, {
      email: mentor.email,
      password: mentor.password,
    })

    if (response?.data?.token) {
      localStorage.setItem("authUserLogin", response?.data?.token)
      localStorage.setItem("Role", response?.data?.type)
      yield put(loginMentorSuccess(response?.data))
      cb?.()
      history.push("/")
    } else if (response?.status == 401) {
      notify("error", "Failed: " + response?.msg)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(apiError(message))
  }
}
function* loginStudent({ payload }) {
  const { student, history, cb, cb2 } = payload

  try {
    const response = yield call(studentLogin, {
      email: student.email,
      password: student.password,
    })
    if (response?.data?.token) {
      localStorage.setItem("authUserLogin", response?.data?.token)
      localStorage.setItem("Role", response?.data?.type)
      localStorage.setItem("ID", response?.data?.user?.id)
      yield put(loginStudentSuccess(response?.data))
      cb?.()
      history.push("/")
    } else if (response?.status == 401) {
      notify("error", "Failed: " + response?.msg)
    }
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(apiError(message))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield put(logoutUserSuccess())
    localStorage.clear()
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
