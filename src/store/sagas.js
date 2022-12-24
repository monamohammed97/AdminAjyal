import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import changePasswordSaga from "./auth/changePass/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import contactsSaga from "./contacts/saga"
import dashboardSaga from "./dashboard/saga"

// new
import fetchDataSaga from "./fetchData/saga"
import usersSaga from "./admin/user/saga"
import mentorsSaga from "./admin/mentor/saga"
import platformsSaga from "./admin/platform/saga"
import partenrsSaga from "./admin/partenr/saga"
import advertisingsSaga from "./admin/advertisings/saga"
import activitysSaga from "./admin/activity/saga"
import projectsSaga from "./admin/project/saga"
import groupsSaga from "./admin/group/saga"
import categorySaga from "./admin/category/saga"
import studentsSaga from "./admin/student/saga"
import ratesSaga from "./mentor/rate/saga"
import attendSaga from "./mentor/attendence/saga"
import questionsSaga from "./admin/question/saga"
import coursesSaga from "./admin/course/saga"
import activityTypesSaga from "./admin/activityType/saga"
import freelancesSaga from "./freelance/saga"
import contactSaga from "./admin/contact/saga"
import Contacts from "pages/Contacts/Contacts"
import landingPageSaga from "./admin/landingpage/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(dashboardSaga),

    fork(fetchDataSaga),
    fork(usersSaga),
    fork(mentorsSaga),
    fork(platformsSaga),
    fork(partenrsSaga),
    fork(advertisingsSaga),
    fork(activitysSaga),
    fork(projectsSaga),
    fork(groupsSaga),
    fork(categorySaga),
    fork(studentsSaga),
    fork(ratesSaga),
    fork(attendSaga),
    fork(questionsSaga),
    fork(coursesSaga),
    fork(activityTypesSaga),
    fork(freelancesSaga),
    fork(contactSaga),
    fork(landingPageSaga),
    fork(changePasswordSaga),
  ])
}
