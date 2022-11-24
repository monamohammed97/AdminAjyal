import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_MENTORS,
  GET_USERS,
  GET_PLATFORMS,
  GET_PARTNERS,
  GET_ADVERTISINGS,
  GET_ACTIVITES,
  GET_PROJECTS,
  GET_STUDENTS,
  GET_RATES,
  GET_QUESTIONS,
  GET_ACTIVITY_TYPE,
  GET_FREELANCER,
  GET_CONTACTS,
  GET_ABOUTUS,
} from "./actionTypes"
import {
  getActivitiesFail,
  getActivitiesSuccess,
  getAdsFail,
  getAdsSuccess,
  getMentorsFail,
  getMentorsSuccess,
  getPartenrsFail,
  getPartenrsSuccess,
  getPlatformsFail,
  getPlatformsSuccess,
  getProjectsFail,
  getProjectsSuccess,
  getQuestionsFail,
  getQuestionsSuccess,
  getRatesFail,
  getRatesSuccess,
  getStudentsFail,
  getStudentsSuccess,
  getUsersFail,
  getUsersSuccess,
  getActivityTypeFail,
  getActivityTypeSuccess,
  getFreelancerSuccess,
  getFreelancerFail,
  getContactsSuccess,
  getContactsFail,
  getAboutusSuccess,
  getAboutusFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getMentorsAjyal,
  getPartnersAjyal,
  getPlatformsAjyal,
  getUsersAjyal,
  getAdsAjyal,
  getActivitiesAjyal,
  getStudentsAjyal,
  getRatesAjyal,
  getQuestionsAjyal,
  getProjectsAjyal,
  getActivityTypesAjyal,
  getFreelanceAjyal,
  getContactsAjyal,
  getAboutusAjyal,
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
// GET_PLATFORMS
function* fetchPlatforms() {
  try {
    const response = yield call(getPlatformsAjyal)
    yield put(getPlatformsSuccess(response?.data))
  } catch (error) {
    yield put(getPlatformsFail(error))
  }
}
// GET_PARTNERS
function* fetchPartenrs() {
  try {
    const response = yield call(getPartnersAjyal)
    yield put(getPartenrsSuccess(response?.data))
  } catch (error) {
    yield put(getPartenrsFail(error))
  }
}

// GET_ADVERTISINGS
function* fetchAds() {
  try {
    const response = yield call(getAdsAjyal)
    yield put(getAdsSuccess(response?.data))
  } catch (error) {
    yield put(getAdsFail(error))
  }
}

// GET_ACTIVITES
function* fetchActivities() {
  try {
    const response = yield call(getActivitiesAjyal)
    yield put(getActivitiesSuccess(response?.data))
  } catch (error) {
    yield put(getActivitiesFail(error))
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
// GET_QUESTIONS
function* fetchQuestions() {
  try {
    const response = yield call(getQuestionsAjyal)
    yield put(getQuestionsSuccess(response?.data))
  } catch (error) {
    yield put(getQuestionsFail(error))
  }
}

// GET_activities-types
function* fetchActivityType() {
  try {
    const response = yield call(getActivityTypesAjyal)
    yield put(getActivityTypeSuccess(response?.data))
  } catch (error) {
    yield put(getActivityTypeFail(error))
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
// GET_CONTACTS
function* fetchContacts() {
  try {
    const response = yield call(getContactsAjyal)
    yield put(getContactsSuccess(response?.data))
  } catch (error) {
    yield put(getContactsFail(error))
  }
}

// GET_ABOUTUS
function* fetchAboutus() {
  try {
    const response = yield call(getAboutusAjyal)
    yield put(getAboutusSuccess(response?.data?.pageContent[0]?.["aboutUs"]))
  } catch (error) {
    yield put(getAboutusFail(error))
  }
}

function* fetchDataSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_MENTORS, fetchMentors)
  yield takeEvery(GET_PLATFORMS, fetchPlatforms)
  yield takeEvery(GET_PARTNERS, fetchPartenrs)
  yield takeEvery(GET_ADVERTISINGS, fetchAds)
  yield takeEvery(GET_ACTIVITES, fetchActivities)
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(GET_RATES, fetchRates)
  yield takeEvery(GET_QUESTIONS, fetchQuestions)
  yield takeEvery(GET_PROJECTS, fetchProjects)
  yield takeEvery(GET_ACTIVITY_TYPE, fetchActivityType)
  yield takeEvery(GET_FREELANCER, fetchFreelancer)
  yield takeEvery(GET_CONTACTS, fetchContacts)
  yield takeEvery(GET_ABOUTUS, fetchAboutus)
}

export default fetchDataSaga
