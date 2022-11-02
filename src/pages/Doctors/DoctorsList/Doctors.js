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
import TableContainer from "../../../components/Common/TableContainer"

import { Code, Description, Name, Specialization } from "./contactlistCol"

//Import Breadcrumb
import img2 from "../../../assets/images/users/avatar-1.png"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import DeleteModal from "../../../components/Common/DeleteModal"

import { isEmpty } from "lodash"
import {
  addNewDoctor,
  deleteDoctor as onDeleteDoctor,
  updateDoctor,
} from "store/contacts/actions"

//redux
import { FileInput } from "components/Form/FileInput"
import { useDispatch, useSelector } from "react-redux"
import { getDoctors } from "store/doctors/actions"
import { validationSchema } from "../../Users/validationSchema"

const urlImg = "https://jihadm33.sg-host.com/public/upload/doctor_image/"

const Doctors = props => {
  //meta title
  const [filename, setFilename] = useState("")

  document.title = "User List | Skote - React Admin & Dashboard Template"

  const { isSuccessAdd } = useSelector(store => store?.contacts)

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      description: (contact && contact.description) || "",
      code: (contact && contact.code) || "",
      specialty: (contact && contact.specialty) || "",
      image: (contact && `${urlImg}${contact.image}`) || img2,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        contact.code !== values.code && edit.append("code", values?.code)
        contact.name !== values.name && edit.append("name", values?.name)
        contact.specialty !== values.specialty &&
          edit.append("specialty", values?.specialty)
        contact.description !== values.description &&
          edit.append("description", values?.description)
        typeof values.image === "object" && edit.append("image", values?.image)
        dispatch(
          updateDoctor(edit, contact.id, () => {
            notify("success", `Success  to  Update ${contact.id} `)
          })
        )
        setIsEdit(false)
        validation.resetForm()
        toggle()
      } else {
        var data = new FormData()
        data.append("name", values?.name)
        data.append("code", values?.code)
        data.append("specialty", values?.specialty)
        data.append("description", values?.description)
        data.append("image", values?.image)

        dispatch(addNewDoctor(data))

        validation.resetForm()
        toggle()
      }
    },
  })

  const { doctors } = useSelector(store => store?.doctors)

  console.log("doctors : ",doctors)

  const [userList, setUserList] = useState([])
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
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: cellProps => {
          return <Description {...cellProps} />
        },
      },
      {
        Header: "Code",
        accessor: "code",
        filterable: true,
        Cell: cellProps => {
          return <Code {...cellProps} />
        },
      },
      {
        Header: "Specialization",
        accessor: "specialty",
        filterable: true,
        Cell: cellProps => {
          return <Specialization {...cellProps} />
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
                  src={urlImg + cellProps.image}
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
    dispatch(getDoctors())
  }, [dispatch])

  // useEffect(() => {
  //   if (isSuccessAdd) {
  //     dispatch(getDoctors())
  //   }
  // }, [dispatch, isSuccessAdd])

  useEffect(() => {
    if (doctors && !doctors.length) {
      dispatch(getDoctors())
      setIsEdit(false)
    }
  }, [dispatch, doctors])

  useEffect(() => {
    setContact(doctors)
    setIsEdit(false)
  }, [doctors])

  useEffect(() => {
    if (!isEmpty(doctors) && !!isEdit) {
      setContact(doctors)
      setIsEdit(false)
    }
  }, [doctors])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const doctor = arg
    setContact({
      id: doctor.id,
      name: doctor.name,
      description: doctor.description,
      code: doctor.code,
      specialty: doctor.specialty,
      image: doctor.image,
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

  const onClickDelete = doctors => {
    setContact(doctors)
    setDeleteModal(true)
  }

  const handleDeleteDoctor = () => {
    dispatch(onDeleteDoctor(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }
  // const handleDeleteDoctor = useCallback(() => {
  //   dispatch(onDeleteDoctor(contact))
  //   dispatch(getDoctors())
  //   onPaginationPageChange(1)
  //   setDeleteModal(false)
  // }, [dispatch])

  // const handleDeleteDoctor = useCallback(
  //   () => {
  //   dispatch(onDeleteDoctor(contact))
  //   onPaginationPageChange(1)
  //   setDeleteModal(false)
  // },
  //   [dispatch],
  // )

  const handleUserClicks = () => {
    setContact("")
    setIsEdit(false)
    toggle()
  }

  // console.log(validation.values)
  // console.log("url : ",typeof validation.values.image === "object"
  // ? URL.createObjectURL(
  //     validation.values["image"]
  //   )
  // : img2)
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
          <Breadcrumbs title="Doctor List" breadcrumbItem="All Doctors" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={doctors}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Doctor" : "Add Doctor"}
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
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Description</Label>
                              <Input
                                name="description"
                                label="Description"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                                invalid={
                                  validation.touched.description &&
                                  validation.errors.description
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.description &&
                              validation.errors.description ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.description}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Code</Label>
                              <Input
                                name="code"
                                label="Code"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.code || ""}
                                invalid={
                                  validation.touched.code &&
                                  validation.errors.code
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.code &&
                              validation.errors.code ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.code}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Specialty</Label>
                              <Input
                                name="specialty"
                                label="Specialty"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.specialty || ""}
                                invalid={
                                  validation.touched.specialty &&
                                  validation.errors.specialty
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.specialty &&
                              validation.errors.specialty ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.specialty}
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

export default withRouter(Doctors)
