import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_FREELANCER, ADD_FREELANCE, UPDATE_FREELANCE, DELETE_FREELANCE } from "./actionTypes"
import {
  getFreelancerSuccess,
  getFreelancerFail,
  addFreelanceSuccess,
  addFreelanceFail,
  updateFreelanceSuccess,
  updateFreelanceFail,
  deleteFreelanceSuccess,
  deleteFreelanceFail,
} from "./actions"
import {
  getFreelanceAjyal,
  addFreelanceAjyal,
  deleteFreelanceAjyal,
  updateFreelanceAjyal,
} from "helpers/fakebackend_helper"

// GET_FREELANCER
function* fetchFreelancer() {
  try {
    const STUDENT_ID = localStorage.getItem("ID")
    const response = yield call(getFreelanceAjyal)
    const filterData = response?.data?.filter(el => el?.student_id == STUDENT_ID)
    yield put(getFreelancerSuccess(filterData))
  } catch (error) {
    yield put(getFreelancerFail(error))
  }
}

function* onAdddFreelance({ payload }) {
  const { freelance, history, cbDone, cbFail } = payload
  try {
    const response = yield call(addFreelanceAjyal, freelance)
    yield put(addFreelanceSuccess(response?.data))
    cbDone?.()
    history?.push("/freelancer")
  } catch (error) {
    cbFail?.()
    yield put(addFreelanceFail(error))
  }
}

function* onUpdatedFreelance({ payload }) {
  const { freelance, id, history, cbDone, cbFail } = payload
  try {
    const response = yield call(updateFreelanceAjyal, id, freelance)
    yield put(updateFreelanceSuccess(response?.data, id))
    cbDone?.()
    history?.push("/freelancer")
  } catch (error) {
    cbFail?.()
    yield put(updateFreelanceFail(error))
  }
}
function* onDeletedFreelance({ payload }) {
  const { freelance, cbDone, cbFail } = payload
  try {
    yield call(deleteFreelanceAjyal, freelance?.id)
    yield put(deleteFreelanceSuccess(freelance?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteFreelanceFail(error))
  }
}

function* freelancesSaga() {
  yield takeEvery(GET_FREELANCER, fetchFreelancer)
  yield takeEvery(ADD_FREELANCE, onAdddFreelance)
  yield takeEvery(UPDATE_FREELANCE, onUpdatedFreelance)
  yield takeEvery(DELETE_FREELANCE, onDeletedFreelance)
}

export default freelancesSaga
