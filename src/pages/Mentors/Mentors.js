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

import { Name, Email, Gender, Phone, Overview } from "./contactlistCol"

//Import Breadcrumb
import user from "../../assets/images/users/mona.png"

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import { getMentors, addMentor, deleteMentor, updateMentor } from "store/admin/mentor/actions"
import { notify } from "components/Common/notify"
import img from "assets/images/img.png"

const Mentors = props => {
  //meta title
  const [filename, setFilename] = useState("")

  document.title = "Mentors"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
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
      overview: (contact && contact.overview) || "",
      image: (contact && contact.image) || img,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("first_name", values?.first_name)
        edit.append("last_name", values?.last_name)
        // edit.append("password", values?.password)
        edit.append("email", values?.email)
        edit.append("phone", values?.phone)
        edit.append("gender", values?.gender)
        edit.append("overview", values?.overview)
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        dispatch(
          updateMentor(
            edit,
            contact.id,
            () => {
              notify("success", "Success")
            },
            () => {
              notify("error", "Failed")
            }
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
        data.append("overview", values?.overview)
        data.append("image", values?.image)

        dispatch(
          addMentor(
            data,
            () => {
              notify("success", "Success")
            },
            () => {
              notify("error", "Failed")
            }
          )
        )
        validation.resetForm()
        toggle()
      }
    },
  })

  const { mentors } = useSelector(store => store?.mentors)

  // const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [selectedFiles, setselectedFiles] = useState([])
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

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
        Header: "Image",
        accessor: "image",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.image ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
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
                  // console.log("userData :", userData)
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
    dispatch(getMentors())
  }, [dispatch])

  useEffect(() => {
    if (mentors && !mentors.length) {
      dispatch(getMentors())
      setIsEdit(false)
    }
  }, [dispatch, mentors])

  useEffect(() => {
    setContact(mentors)
    setIsEdit(false)
  }, [mentors])

  useEffect(() => {
    if (!isEmpty(mentors) && !!isEdit) {
      setContact(mentors)
      setIsEdit(false)
    }
  }, [mentors])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const mentor = arg
    setContact({
      id: mentor.id,
      first_name: mentor.first_name,
      last_name: mentor.last_name,
      password: mentor.password,
      email: mentor.email,
      phone: mentor.phone,
      gender: mentor.gender,
      overview: mentor.overview,
      image: mentor.image,
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

  const onClickDelete = mentors => {
    setContact(mentors)
    setDeleteModal(true)
  }

  const handleDeleteDoctor = () => {
    dispatch(
      deleteMentor(
        contact,
        () => {
          notify("success", "Success")
        },
        () => {
          notify("error", "Failed")
        }
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

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteDoctor}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Mentors List" breadcrumbItem="All Mentors" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={mentors}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Mentor" : "Add Mentor"}
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
                              typeof validation.values.image === "object"
                                ? URL.createObjectURL(
                                    validation.values["image"]
                                  )
                                : typeof validation.values.image === "string"
                                ? validation.values["image"]
                                : filename
                                ? validation.values.image
                                : ""
                            }
                            onChange={event => {
                              setFilename(
                                prev => event.target.files[0]?.name || ""
                              )

                              validation.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              )
                            }}
                          />
                          {/* {filename && (
                            <h6>
                              {filename} <span htmlFor={"avatar"}>Change</span>
                            </h6>
                          )} */}
                        </Row>
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">First Name</Label>
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
                            {
                              isEdit?null:<div className="mb-3">
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
                            }
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
                              >
                                <option selected disabled></option>
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

export default withRouter(Mentors)
