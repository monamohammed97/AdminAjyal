import PropTypes from "prop-types"
import React from "react"

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import {
  authAdminRoutes,
  authMentorRoutes,
  authStudentRoutes,
  publicRoutes,
} from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

import { useSelector } from "react-redux"

import { STUDENT, ADMIN, MENTOR } from "helpers/roles"

// Import scss
import "./assets/scss/theme.scss"

const App = props => {
  const { role } = useSelector(store => store?.login)

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {role === MENTOR
            ? authMentorRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  exact
                />
              ))
            : role === STUDENT
            ? authStudentRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  exact
                />
              ))
            : role === ADMIN
            ? authAdminRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  // exact
                />
              ))
            : null}

          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={route?.isProtected}
              OnlyNoAuth={route?.OnlyNoAuth}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
