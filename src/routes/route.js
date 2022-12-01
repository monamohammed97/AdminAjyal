import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  OnlyNoAuth = false,
  ...rest
}) => {
  const { isAuth } = useSelector(store => store?.login)

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !isAuth) {
          return (
            <Redirect
              to={{ pathname: "/admin_login", state: { from: props.location } }}
            />
          )
        } else if (OnlyNoAuth && isAuth) {
          return <Redirect to={"/"} />
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
