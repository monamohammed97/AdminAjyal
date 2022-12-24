import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import changePassword from "./auth/changePass/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

// newwwwwwwwwwwwwww
import data from "./fetchData/reducer"
import users from "./admin/user/reducer"
import mentors from "./admin/mentor/reducer"
import platforms from "./admin/platform/reducer"
import partners from "./admin/partenr/reducer"
import advertisings from "./admin/advertisings/reducer"
import activities from "./admin/activity/reducer"
import projects from "./admin/project/reducer"
import groups from "./admin/group/reducer"
import category from "./admin/category/reducer"
import students from "./admin/student/reducer"
import rates from "./mentor/rate/reducer"
import attendence from "./mentor/attendence/reducer"
import notifications from "./mentor/notification/reducer"
import questions from "./admin/question/reducer"
import courses from "./admin/course/reducer"
import activityType from "./admin/activityType/reducer"
import freelance from "./freelance/reducer"
import contacts from "./admin/contact/reducer"
import landingPage from "./admin/landingpage/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  login,
  Account,
  ForgetPassword,
  Profile,
  Dashboard,

  data,
  users,
  mentors,
  platforms,
  partners,
  advertisings,
  activities,
  projects,
  groups,
  category,
  students,
  rates,
  notifications,
  questions,
  courses,
  activityType,
  freelance,
  contacts,
  landingPage,
  changePassword,
  attendence
})

export default rootReducer
