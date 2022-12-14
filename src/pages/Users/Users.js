import { useFormik } from "formik"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Link, withRouter } from "react-router-dom"

import {
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

import {
  Name,
  Email,
  Gender,
  Phone,
  Overview,
  PositionDescription,
} from "./contactlistCol"

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { getValidationSchema } from "./validationSchema"
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "store/admin/user/actions"
import { notify } from "components/Common/notify"
import img from "assets/images/img.png"

const Users = props => {
  //meta title
  document.title = "Users"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { users, error } = useSelector(store => store?.users)

  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: (contact && contact.first_name) || "",
      last_name: (contact && contact.last_name) || "",
      password: (contact && contact.password) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      gender: (contact && contact.gender) || "",
      position_description: (contact && contact.position_description) || "",
      overview: (contact && contact.overview) || "",
      image: (contact && contact.image) || null,
    },
    validationSchema: getValidationSchema(isEdit),
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("first_name", values?.first_name)
        edit.append("last_name", values?.last_name)
        edit.append("email", values?.email)
        edit.append("phone", values?.phone)
        edit.append("gender", values?.gender)
        if (values?.overview) edit.append("overview", values?.overview)
        if (values?.position_description)
          edit.append("position_description", values?.position_description)
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        edit.append("_method", "put")
        dispatch(
          updateUser(
            edit,
            contact.id,
            () => {
              notify("success", "Success")
            },
            null
          )
        )
        setIsEdit(false)
        validation.resetForm()
        toggle()
      } else {
        var data = new FormData()
        data.append("first_name", values?.first_name)
        data.append("last_name", values?.last_name)
        data.append("password", values?.password)
        data.append("email", values?.email)
        data.append("phone", values?.phone)
        data.append("gender", values?.gender)
        if (values?.overview) data.append("overview", values?.overview)
        if (values?.position_description)
          data.append("position_description", values?.position_description)
        if (values?.image) data.append("image", values?.image)

        dispatch(
          addUser(
            data,
            () => {
              notify("success", "Success")
            },
            null
          )
        )
        validation.resetForm()
        toggle()
      }
    },
  })

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Gender",
        accessor: "gender",
        filterable: true,
        Cell: cellProps => {
          return <Gender {...cellProps} />
        },
      },
      {
        Header: "Overview",
        accessor: "overview",
        filterable: true,
        Cell: cellProps => {
          return <Overview {...cellProps} />
        },
      },
      {
        Header: "Position Description",
        accessor: "position_description",
        filterable: true,
        Cell: cellProps => {
          return <PositionDescription {...cellProps} />
        },
      },
      {
        Header: "Image",
        accessor: "image",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.image ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {/* {cellProps.name.charAt(0)} */}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.image}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (users && !users.length) {
      dispatch(getUsers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg
    setContact({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      overview: user.overview,
      position_description: user.position_description,
      image: user.image,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(
      deleteUser(
        contact,
        () => {
          notify("success", "Success")
        },
        null
      )
    )
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setContact("")
    setIsEdit(false)
    toggle()
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users List" breadcrumbItem="All Users" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row className="wrapperdiv">
                          <FileInput
                            name="image"
                            src={
                              typeof validation.values?.image === "object" &&
                              validation.values?.image
                                ? URL.createObjectURL(validation.values?.image)
                                : typeof validation.values.image === "string"
                                ? validation.values.image
                                : img
                            }
                            onChange={event => {
                              validation.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              )
                            }}
                          />
                          {validation.touched.image &&
                          validation.errors.image ? (
                            <h6>
                              <span className="text-danger" htmlFor={"image"}>
                                {validation.errors.image}
                              </span>
                            </h6>
                          ) : null}
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Fisrt Name</Label>
                              <Input
                                name="first_name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.first_name || ""}
                                invalid={
                                  validation.touched.first_name &&
                                  validation.errors.first_name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.first_name &&
                              validation.errors.first_name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.first_name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Last Name</Label>
                              <Input
                                name="last_name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.last_name || ""}
                                invalid={
                                  validation.touched.last_name &&
                                  validation.errors.last_name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.last_name &&
                              validation.errors.last_name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.last_name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
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
                            {isEdit ? null : (
                              <div className="mb-3">
                                <Label className="form-label">Password</Label>
                                <Input
                                  name="password"
                                  label="Password"
                                  type="password"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
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
                            )}
                            <div className="mb-3">
                              <Label className="form-label">Phone</Label>
                              <Input
                                name="phone"
                                label="Phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Gender</Label>
                              <Input
                                name="gender"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.gender || ""}
                                invalid={
                                  validation.touched.gender &&
                                  validation.errors.gender
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                <option value={"male"}>Male </option>
                                <option value={"female"}>Female</option>
                              </Input>
                              {validation.touched.gender &&
                              validation.errors.gender ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.gender}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Overview</Label>
                              <Input
                                name="overview"
                                label="Overview"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.overview || ""}
                                invalid={
                                  validation.touched.overview &&
                                  validation.errors.overview
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.overview &&
                              validation.errors.overview ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.overview}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">
                                Position Description
                              </Label>
                              <Input
                                name="position_description"
                                label="Position Description"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={
                                  validation.values.position_description || ""
                                }
                                invalid={
                                  validation.touched.position_description &&
                                  validation.errors.position_description
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.position_description &&
                              validation.errors.position_description ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.position_description}
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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Users)
