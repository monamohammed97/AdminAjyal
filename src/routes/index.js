
import { Redirect } from "react-router-dom";

//  // Inner Authentication

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// //Contacts
// import ContactsList from "../pages/Contacts/ContactList/contacts-list";

// Doctors
import Logout from "../pages/Authentication/Logout";
import Users from "pages/Users/Users";
import Mentors from "pages/Mentors/Mentors";
import Platforms from "pages/Platforms/Platforms";
import Partners from "pages/Partners/Partners";
import Advertisings from "pages/Advertisings/Advertisings";
import Activites from "pages/Activites/Activites";
import Projects from "pages/Projects/Projects";
import Groups from "pages/Groups/Groups";
import Category from "pages/Category/Category";
import Students from "pages/Students/Students";
import Rates from "pages/Rates/Rates";
import Courses from "pages/Courses/Courses";
import Questions from "pages/Questions/Questions";
import ActivityType from "pages/ActivityType/ActivityType";
import Training from "pages/Freelancers/LastTraining/Training";
import FreelancerStd from "pages/Freelancers/StudentsPage/FreelancerStd";
import AddJob from "pages/Freelancers/StudentsPage/AddJob";
import EditJob from "pages/Freelancers/StudentsPage/EditJob";
import Contacts from "pages/Contacts/Contacts";
import AboutUs from "pages/LandingPage/AboutUs/AboutUs";
import Admin from "../pages/AuthenticationInner/Admin";
import Mentor from "pages/AuthenticationInner/Mentor";
import Student from "pages/AuthenticationInner/Student";


const authProtectedRoutes = [
  // Doctors

  // Doctors

  { path: "/", component: Dashboard },
  { path: "/dashboard", component: Dashboard },
  
  // // Contacts

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

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name


  { path: "/", exact: true, component:<Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  
//   // Authentication Inner
//   { path: "/pages-login", component: Login1 },
  { path: "/admin_login", component: Admin },
  { path: "/mentor_login", component: Mentor },
  { path: "/student_login", component: Student },
];

export { authProtectedRoutes, publicRoutes };


// import { Redirect } from "react-router-dom";

// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
// import Offers from "../pages/Ecommerce/Offers/Offers"

// //  // Inner Authentication

// // Dashboard
// import Dashboard from "../pages/Dashboard/index";

// // //Contacts
// // import ContactsList from "../pages/Contacts/ContactList/contacts-list";

// // Doctors
// import Doctors from "../pages/Doctors/DoctorsList/Doctors";
// import Clinics from "../pages/Doctors/Clinics/Clinics";
// import Logout from "../pages/Authentication/Logout";
// import Users from "pages/Users/Users";
// import Mentors from "pages/Mentors/Mentors";
// import Platforms from "pages/Platforms/Platforms";
// import Partners from "pages/Partners/Partners";
// import Advertisings from "pages/Advertisings/Advertisings";
// import Activites from "pages/Activites/Activites";
// import Projects from "pages/Projects/Projects";
// import Groups from "pages/Groups/Groups";
// import Category from "pages/Category/Category";
// import Students from "pages/Students/Students";
// import Rates from "pages/Rates/Rates";
// import Courses from "pages/Courses/Courses";
// import Questions from "pages/Questions/Questions";
// import ActivityType from "pages/ActivityType/ActivityType";
// import Training from "pages/Freelancers/LastTraining/Training";
// import FreelancerStd from "pages/Freelancers/StudentsPage/FreelancerStd";
// import AddJob from "pages/Freelancers/StudentsPage/AddJob";
// import EditJob from "pages/Freelancers/StudentsPage/EditJob";
// import Contacts from "pages/Contacts/Contacts";
// import AboutUs from "pages/LandingPage/AboutUs/AboutUs";
// import Admin from "../pages/AuthenticationInner/Admin";
// import Mentor from "pages/AuthenticationInner/Mentor";
// import Student from "pages/AuthenticationInner/Student";



// const authAdminRoutes = [
//   { path: "/", component: Dashboard },
//   { path: "/dashboard", component: Dashboard },
//   { path: "/users", component: Users },
//   { path: "/mentors", component: Mentors },
//   { path: "/platforms", component: Platforms },
//   { path: "/partners", component: Partners },
//   { path: "/advertisings", component: Advertisings },
//   { path: "/activites", component: Activites },
//   { path: "/projects", component: Projects },
//   { path: "/groups", component: Groups },
//   { path: "/category", component: Category },
//   { path: "/students", component: Students },
//   { path: "/courses", component: Courses },
//   { path: "/questions", component: Questions },
//   { path: "/activityType", component: ActivityType },
//   { path: "/training", component: Training },
//   { path: "/aboutus", component: AboutUs },
//   { path: "/contacts", component: Contacts },

//   // this route should be at the end of all other routes
//   // eslint-disable-next-line react/display-name


//   { path: "/", exact: true, component:<Redirect to="/dashboard" /> },
// ];


// const authMentorRoutes = [
//   { path: "/", component: Dashboard },
//   { path: "/dashboard", component: Dashboard },
//   { path: "/rates", component: Rates },
//   { path: "/", exact: true, component:<Redirect to="/dashboard" /> },
// ];


// const authStudentRoutes = [
//   { path: "/", component: Dashboard },
//   { path: "/dashboard", component: Dashboard },
//   { path: "/edit/:id", component: EditJob },
//   { path: "/freelancer", component: FreelancerStd },
//   { path: "/addjob", component: AddJob },
//   { path: "/", exact: true, component:<Redirect to="/dashboard" /> },
// ];

// const publicRoutes = [
//   { path: "/logout", component: Logout },
  
// //   // Authentication Inner
// //   { path: "/pages-login", component: Login1 },
//   { path: "/admin_login", component: Admin },
//   { path: "/mentor_login", component: Mentor },
//   { path: "/student_login", component: Student },
// ];

// export { authAdminRoutes, publicRoutes, authMentorRoutes, authStudentRoutes };

