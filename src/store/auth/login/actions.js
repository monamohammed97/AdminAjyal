import {
     API_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER,
     LOGOUT_USER_SUCCESS, SOCIAL_LOGIN,
     LOGIN_STD,
     LOGIN_STD_SUCCESS,
     LOGIN_MENTOR,
     LOGIN_MENTOR_SUCCESS
} from "./actionTypes"

export const loginUser = (user, history,cb, cb2) => {
  return {
    type: LOGIN_USER,
    payload: { user, history, cb, cb2 },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}
export const loginMentor = (mentor, history,cb, cb2) => {
  return {
    type: LOGIN_MENTOR,
    payload: { mentor, history, cb, cb2 },
  }
}

export const loginMentorSuccess = mentor => {
  return {
    type: LOGIN_MENTOR_SUCCESS,
    payload: mentor,
  }
}
export const loginStudent = (student, history,cb, cb2) => {
  return {
    type: LOGIN_STD,
    payload: { student, history, cb, cb2 },
  }
}

export const loginStudentSuccess = student => {
  return {
    type: LOGIN_STD_SUCCESS,
    payload: student,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}






export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
