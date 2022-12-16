import React from "react"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"

// Formik validation
import { useFormik } from "formik"

import * as Yup from "yup"

// import images
import { notify } from "components/Common/notify"
import { useDispatch } from "react-redux"
import { loginUser } from "store/actions"
import logolight from "../../assets/images/ajyal/logo.PNG"
import CarouselPage from "./CarouselPage"

const Admin = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Login | Admin"

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      dispatch(
        loginUser(
          values,
          props.history,
          () => {
            //  should  be  chnage  the  text  info

            notify("success", "Login  Success", "Wellcom  to App")
          },
          null
        )
      )
    },
  })

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-2">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img
                          src={logolight}
                          alt=""
                          height="100"
                          className="auth-logo-dark"
                        />
                      </Link>
                    </div>
                    <div className="my-1">
                      <div>
                        <div className="mt-3 d-flex gap-3">
                          <Link className="flex-grow-1" to="/mentor_login">
                            <button
                              className="btn btn-primary btn-block mb-3 w-100"
                              type="button"
                            >
                              Mentor
                            </button>
                          </Link>
                          <Link className="flex-grow-1" to="/student_login">
                            <button
                              className="btn btn-primary btn-block mb-3 w-100"
                              type="button"
                            >
                              Student
                            </button>
                          </Link>
                        </div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        {/* <p className="text-muted">
                          Sign in to continue to Skote.
                        </p> */}
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                          {/* 
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div> */}

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </Form>

                        {/* <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}
                        {/* <div className="mt-5 text-center">
                          <p>
                            Don&apos;t have an account ?
                            <Link
                              to="pages-register-2"
                              className="fw-medium text-primary"
                            >
                              Signup now
                            </Link>
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        2022 © All rights reserved
                        <i className="mdi mdi-heart text-danger"></i> <br />
                        development by Mona Mohammed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Admin
