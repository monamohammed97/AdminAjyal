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
import { apiError, loginMentorSuccess, loginStudentSuccess, loginSuccess, logoutUserSuccess } from "./actions"
import { LOGIN_MENTOR, LOGIN_STD, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"

//Include Both Helper File with needed methods
import { postLogin, postSocialLogin, adminLogin, mentorLogin, studentLogin } from "helpers/fakebackend_helper"
import { getFirebaseBackend } from "../../../helpers/firebase_helper"


// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       );
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* loginUser({ payload }) {
  const { user, history, cb, cb2 } = payload

  try {
    const response = yield call(adminLogin, {
      email: user.email,
      password: user.password,
    })
    localStorage.setItem("authUserLogin", response?.data?.token)
    sessionStorage.setItem("Role", response?.data?.type)
    yield put(loginSuccess(response))
     cb?.()
    history.push("/dashboard")
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
    sessionStorage.setItem("Role", response?.data?.type)
    yield put(loginMentorSuccess(response))
     cb?.()
    history.push("/dashboard")
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
    sessionStorage.setItem("Role", response?.data?.type)
    yield put(loginStudentSuccess(response))
     cb?.()
    history.push("/dashboard")
  } catch (error) {
    cb2?.()
    yield put(apiError(error))
  }
}






function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUserLogin")
    history.push("/admin_login")
  } catch (error) {
    yield put(apiError(error))
  }
}

// function* socialLogin({ payload: { data, history, type } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend()
//       const response = yield call(fireBaseBackend.socialLoginUser, data, type)
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     } else {
//       const response = yield call(postSocialLogin, data)
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     }
//     history.push("/dashboard")
//   } catch (error) {
//     yield put(apiError(error))
//   }
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  // yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(LOGIN_MENTOR, loginMentor)
  yield takeEvery(LOGIN_STD, loginStudent)
}

export default authSaga
