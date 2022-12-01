import { Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

import { STUDENT, ADMIN, MENTOR } from "helpers/roles"

// Dashboard
// import Dashboard from "../pages/Dashboard/index"
import Logout from "pages/Authentication/Logout"
import Users from "pages/Users/Users"
import Mentors from "pages/Mentors/Mentors"
import Platforms from "pages/Platforms/Platforms"
import Partners from "pages/Partners/Partners"
import Advertisings from "pages/Advertisings/Advertisings"
import Activites from "pages/Activites/Activites"
import Projects from "pages/Projects/Projects"
import Groups from "pages/Groups/Groups"
import Category from "pages/Category/Category"
import Students from "pages/Students/Students"
import Rates from "pages/Rates/Rates"
import Courses from "pages/Courses/Courses"
import Questions from "pages/Questions/Questions"
import ActivityType from "pages/ActivityType/ActivityType"
import Training from "pages/Freelancers/LastTraining/Training"
import FreelancerStd from "pages/Freelancers/StudentsPage/FreelancerStd"
import AddJob from "pages/Freelancers/StudentsPage/AddJob"
import EditJob from "pages/Freelancers/StudentsPage/EditJob"
import Contacts from "pages/Contacts/Contacts"
import AboutUs from "pages/LandingPage/AboutUs/AboutUs"
import Admin from "../pages/AuthenticationInner/Admin"
import Mentor from "pages/AuthenticationInner/Mentor"
import Student from "pages/AuthenticationInner/Student"
import NotFound from "pages/NotFound/NotFound"

const EmptyDiv = () => {
  const { role } = useSelector(store => store?.login)
  if (role === STUDENT) return <Redirect to={"/freelancer"} />
  else if (role === MENTOR) return <Redirect to={"/rates"} />
  else if (role === ADMIN) return <Redirect to={"/users"} />
  else return <>.</>
}

const authProtectedRoutes = [
  { path: "/users", component: Users },
  { path: "/mentors", component: Mentors },
  { path: "/platforms", component: Platforms },
  { path: "/partners", component: Partners },
  { path: "/advertisings", component: Advertisings },
  { path: "/activites", component: Activites },
  { path: "/projects", component: Projects },
  { path: "/groups", component: Groups },
  { path: "/category", component: Category },
  { path: "/students", component: Students },
  { path: "/rates", component: Rates },
  { path: "/courses", component: Courses },
  { path: "/questions", component: Questions },
  { path: "/activityType", component: ActivityType },
  { path: "/training", component: Training },
  { path: "/freelancer", component: FreelancerStd },
  { path: "/addjob", component: AddJob },
  { path: "/edit/:id", component: EditJob },
  { path: "/contacts", component: Contacts },
  { path: "/aboutus", component: AboutUs },
]

const publicRoutes = [
  { path: "/", component: EmptyDiv, isProtected: true },
  { path: "/logout", component: Logout, isProtected: true },
  {
    path: "/admin_login",
    component: Admin,
    isProtected: false,
    OnlyNoAuth: true,
  },
  {
    path: "/mentor_login",
    component: Mentor,
    isProtected: false,
    OnlyNoAuth: true,
  },
  {
    path: "/student_login",
    component: Student,
    isProtected: false,
    OnlyNoAuth: true,
  },
  { path: "*", component: NotFound, isProtected: false },
]

const authMentorRoutes = [
  { path: "/rates", component: Rates },
  { path: "/attendence", component: Rates },
]

const authStudentRoutes = [
  { path: "/freelancer", component: FreelancerStd },
  { path: "/edit/:id", component: EditJob },
  { path: "/addjob", component: AddJob },
]

const authAdminRoutes = [
  { path: "/users", component: Users },
  { path: "/mentors", component: Mentors },
  { path: "/platforms", component: Platforms },
  { path: "/partners", component: Partners },
  { path: "/advertisings", component: Advertisings },
  { path: "/activites", component: Activites },
  { path: "/projects", component: Projects },
  { path: "/groups", component: Groups },
  { path: "/category", component: Category },
  { path: "/students", component: Students },
  { path: "/rates", component: Rates },
  { path: "/courses", component: Courses },
  { path: "/questions", component: Questions },
  { path: "/activityType", component: ActivityType },
  { path: "/training", component: Training },
  { path: "/contacts", component: Contacts },
  { path: "/aboutus", component: AboutUs },
]

export {
  authAdminRoutes,
  authMentorRoutes,
  authStudentRoutes,
  authProtectedRoutes,
  publicRoutes,
}
