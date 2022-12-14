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
  Address,
  Phone,
  Rate,
  Transport,
  Status,
  TotalIncome,
  TotalJobs,
  Group,
} from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "store/admin/student/actions"
import { notify } from "components/Common/notify"
import img from "assets/images/img.png"
import { getGroups } from "store/admin/group/actions"

const Students = props => {
  //meta title
  const [filename, setFilename] = useState("")

  document.title = "Students"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      first_name: (contact && contact.first_name) || "",
      last_name: (contact && contact.last_name) || "",
      email: (contact && contact.email) || "",
      password: (contact && contact.password) || "",
      gender: (contact && contact.gender) || "",
      phone: (contact && contact.phone) || "",
      address: (contact && contact.address) || "",
      rate: (contact && contact.rate) || "",
      transport: (contact && contact.transport) || "",
      status: (contact && contact.status) || "",
      // total_income: (contact && contact.total_income) || "",
      // total_jobs: (contact && contact.total_jobs) || "",
      group_id: (contact && contact.group_id) || "",
      image: (contact && contact.image) || img,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("first_name", values?.first_name)
        edit.append("last_name", values?.last_name)
        edit.append("gender", values?.gender)
        edit.append("email", values?.email)
        edit.append("phone", values?.phone)
        edit.append("rate", values?.rate)
        edit.append("address", values?.address)
        edit.append("transport", values?.transport)
        edit.append("status", values?.status)
        // edit.append("total_income", values?.total_income)
        // edit.append("total_jobs", values?.total_jobs)
        edit.append("group_id", values?.group_id)
        edit.append("_method", "put")
        edit.append("image", values?.image)
        // contact.first_name !== values.first_name && edit.append("first_name", values?.first_name)
        // contact.last_name !== values.last_name && edit.append("last_name", values?.last_name)
        // contact.gender !== values.gender && edit.append("gender", values?.gender)
        // contact.email !== values.email && edit.append("email", values?.email)
        // contact.phone !== values.phone && edit.append("phone", values?.phone)
        // contact.rate !== values.rate && edit.append("rate", values?.rate)
        // contact.address !== values.address &&
        //   edit.append("address", values?.address)
        // contact.transport !== values.transport &&
        //   edit.append("transport", values?.transport)
        // contact.status !== values.status &&
        //   edit.append("status", values?.status)
        // contact.total_income !== values.total_income &&
        //   edit.append("total_income", values?.total_income)
        // contact.total_jobs !== values.total_jobs &&
        //   edit.append("total_jobs", values?.total_jobs)
        // edit.append("_method", "put")
        // typeof values.image === "object" && edit.append("image", values?.image)
        dispatch(
          updateStudent(
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
        data.append("email", values?.email)
        data.append("password", values?.password)
        data.append("phone", values?.phone)
        data.append("gender", values?.gender)
        data.append("rate", values?.rate)
        data.append("address", values?.address)
        data.append("transport", values?.transport)
        data.append("status", values?.status)
        // data.append("total_income", values?.total_income)
        // data.append("total_jobs", values?.total_jobs)
        data.append("group_id[]", [values?.group_id])
        data.append("image", values?.image)

        dispatch(
          addStudent(
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

  const { students } = useSelector(store => store?.students)
  const { groups } = useSelector(store => store?.groups)

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
        Header: "Transport",
        accessor: "transport",
        filterable: true,
        Cell: cellProps => {
          return <Transport {...cellProps} />
        },
      },
      {
        Header: "Rate",
        accessor: "rate",
        filterable: true,
        Cell: cellProps => {
          return <Rate {...cellProps} />
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: cellProps => {
          return <Address {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: cellProps => {
          return <Status {...cellProps} />
        },
      },
      {
        Header: "Group",
        accessor: "group_id",
        filterable: true,
        Cell: cellProps => {
          return <Group {...cellProps} />
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
    dispatch(getGroups())
    dispatch(getStudents())
  }, [dispatch])

  useEffect(() => {
    if (students && !students.length) {
      dispatch(getStudents())
      setIsEdit(false)
    }
  }, [dispatch, students])

  useEffect(() => {
    setContact(students)
    setIsEdit(false)
  }, [students])

  useEffect(() => {
    if (!isEmpty(students) && !!isEdit) {
      setContact(students)
      setIsEdit(false)
    }
  }, [students])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const student = arg
    setContact({
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      password: student.password,
      phone: student.phone,
      gender: student.gender,
      transport: student.transport,
      address: student.address,
      status: student.status,
      reate: student.reate,
      // total_income: student.total_income,
      // total_jobs: student.total_jobs,
      group_id: student.group_id,
      image: student.image,
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

  const onClickDelete = students => {
    setContact(students)
    setDeleteModal(true)
  }

  const handleDeleteStudent = () => {
    dispatch(
      deleteStudent(
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
        onDeleteClick={handleDeleteStudent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Students List" breadcrumbItem="All Students" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={students}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Student" : "Add Student"}
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
                                : img2
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
                              <Label className="form-label">Transport</Label>
                              <Input
                                name="transport"
                                label="Transport"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.transport || ""}
                                invalid={
                                  validation.touched.transport &&
                                  validation.errors.transport
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.transport &&
                              validation.errors.transport ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.transport}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Rate</Label>
                              <Input
                                name="rate"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rate || ""}
                              >
                                <option selected disabled></option>
                                <option value={"Featured"}>Featured </option>
                                <option value={"Junior"}>Junior</option>
                                <option value={"Average"}>Average</option>
                                <option value={"Unclassified"}>Unclassified</option>
                              </Input>
                              {validation.touched.rate &&
                              validation.errors.rate ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.rate}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Address</Label>
                              <Input
                                name="address"
                                label="Address"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address &&
                                  validation.errors.address
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.address &&
                              validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <Input
                                name="status"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.status || ""}
                              >
                                <option selected disabled></option>
                                <option value={"active"}>Active </option>
                                <option value={"inactive"}>Inactive</option>
                              </Input>
                              {validation.touched.status &&
                              validation.errors.status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.status}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Group</Label>
                              <Input
                                name="group_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.group_id || ""}
                                invalid={
                                  validation.touched.group_id &&
                                  validation.errors.group_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {groups?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.title}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.group_id &&
                              validation.errors.group_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.group_id}
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

export default withRouter(Students)
