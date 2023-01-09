import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/male_avatar.webp"
import { useFormik } from "formik"
import * as Yup from "yup"
import { changePassword } from "store/auth/changePass/actions"
import { useDispatch } from "react-redux"
import { notify } from "components/Common/notify"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Please Enter Current Password"),
      new_password: Yup.string().required("Please Enter New Password"),
      new_password_confirmation: Yup.string()
        .required("Please Enter Confirm Password")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: values => {
      var data = new FormData()
      data.append("old_password", values?.old_password)
      data.append("new_password", values?.new_password)
      data.append(
        "new_password_confirmation",
        values?.new_password_confirmation
      )

      dispatch(
        changePassword(
          data,
          msgSuccess => {
            notify("success", msgSuccess)
          },
          null
        )
      )
      validation.resetForm()
      toggle()
    },
  })

  const [username, setusername] = useState(localStorage.getItem("name"))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.username)
      }
    }
  }, [props.success])
  const toggle = () => {
    setModal(!modal)
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem>
          <div className="dropdown-divider" /> */}
          <Link
            to="#"
            className="dropdown-item"
            onClick={() => {
              toggle()
            }}
          >
            <i className="mdi mdi-pencil font-size-16 align-middle me-1 text-success" />
            <span>{props.t("Change Password")}</span>
          </Link>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
      <Card>
        <CardBody>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              Change Password
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row form>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label className="form-label">Current Password</Label>
                      <Input
                        name="old_password"
                        label="Titold_passwordle"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_password || ""}
                        invalid={
                          validation.touched.old_password &&
                          validation.errors.old_password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.old_password &&
                      validation.errors.old_password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.old_password}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">New Password</Label>
                      <Input
                        name="new_password"
                        label="Titnew_passwordle"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.new_password || ""}
                        invalid={
                          validation.touched.new_password &&
                          validation.errors.new_password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.new_password &&
                      validation.errors.new_password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.new_password}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Confirm Password</Label>
                      <Input
                        name="new_password_confirmation"
                        label="new_password_confirmation"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.new_password_confirmation || ""
                        }
                        invalid={
                          validation.touched.new_password_confirmation &&
                          validation.errors.new_password_confirmation
                            ? true
                            : false
                        }
                      />
                      {validation.touched.new_password_confirmation &&
                      validation.errors.new_password_confirmation ? (
                        <FormFeedback type="invalid">
                          {validation.errors.new_password_confirmation}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
