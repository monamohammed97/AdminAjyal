import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_MENTORS,
  GET_USERS,
  GET_PROJECTS,
  GET_STUDENTS,
  GET_RATES,
  GET_FREELANCER,
} from "./actionTypes"
import {
  getMentorsFail,
  getMentorsSuccess,
  getProjectsFail,
  getProjectsSuccess,
  getRatesFail,
  getRatesSuccess,
  getStudentsFail,
  getStudentsSuccess,
  getUsersFail,
  getUsersSuccess,
  getFreelancerSuccess,
  getFreelancerFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getMentorsAjyal,
  getUsersAjyal,
  getStudentsAjyal,
  getRatesAjyal,
  getProjectsAjyal,
  getFreelanceAjyal,
} from "helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsersAjyal)
    yield put(getUsersSuccess(response?.data))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}
// mentors
function* fetchMentors() {
  try {
    const response = yield call(getMentorsAjyal)
    yield put(getMentorsSuccess(response?.data))
  } catch (error) {
    yield put(getMentorsFail(error))
  }
}



// GET_STUDENTS
function* fetchStudents() {
  try {
    const response = yield call(getStudentsAjyal)
    yield put(getStudentsSuccess(response?.data))
  } catch (error) {
    yield put(getStudentsFail(error))
  }
}

// GET_RATES
function* fetchRates() {
  try {
    const response = yield call(getRatesAjyal)
    yield put(getRatesSuccess(response?.data))
  } catch (error) {
    yield put(getRatesFail(error))
  }
}

// GET_PROJECTS
function* fetchProjects() {
  try {
    const response = yield call(getProjectsAjyal)
    yield put(getProjectsSuccess(response?.data))
  } catch (error) {
    yield put(getProjectsFail(error))
  }
}


// GET_FREELANCER
function* fetchFreelancer() {
  try {
    const response = yield call(getFreelanceAjyal)
    yield put(getFreelancerSuccess(response?.data))
  } catch (error) {
    yield put(getFreelancerFail(error))
  }
}

function* fetchDataSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_MENTORS, fetchMentors)
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(GET_RATES, fetchRates)
  yield takeEvery(GET_PROJECTS, fetchProjects)
  yield takeEvery(GET_FREELANCER, fetchFreelancer)
}

export default fetchDataSaga
