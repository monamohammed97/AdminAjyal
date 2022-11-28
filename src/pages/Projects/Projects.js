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
  StartDate,
  Title,
  Description,
  Budget,
  EndDate,
  Status,
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
import { notify } from "components/Common/notify"
import {
  getProjects,
  updateProject,
  addProject,
  deleteProject,
} from "store/admin/project/actions"
import { getPartenrs } from "store/admin/partenr/actions"
import img from "assets/images/img.png"

const Projects = props => {
  //meta budget
  const [filename, setFilename] = useState("")

  document.title = "Projects"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      budget: (contact && contact.budget) || "",
      partner_id: (contact && contact.partner_id) || "",
      end_date: (contact && contact.end_date) || "",
      title: (contact && contact.title) || "",
      description: (contact && contact.description) || "",
      start_date: (contact && contact.start_date) || "",
      status: (contact && contact.status) || "",
      image: (contact && contact.image) || img,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("budget", values?.budget)
        edit.append("end_date", values?.end_date)
        edit.append("description", values?.description)
        edit.append("title", values?.title)
        edit.append("start_date", values?.start_date)
        edit.append("status", values?.status)
        edit.append("_method", "put")
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        // contact.budget !== values.budget &&
        //   edit.append("budget", values?.budget)
        // contact.end_date !== values.end_date &&
        //   edit.append("end_date", values?.end_date)
        // contact.description !== values.description &&
        //   edit.append("description", values?.description)
        // contact.title !== values.title && edit.append("title", values?.title)
        // contact.start_date !== values.start_date &&
        //   edit.append("start_date", values?.start_date)
        // contact.status !== values.status &&
        //   edit.append("status", values?.status)
        // edit.append("_method", "put")
        // typeof values.image === "object" && edit.append("image", values?.image)

        dispatch(
          updateProject(
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
        data.append("budget", values?.budget)
        data.append("partner_id", values?.partner_id)
        data.append("end_date", values?.end_date)
        data.append("description", values?.description)
        data.append("title", values?.title)
        data.append("start_date", values?.start_date)
        data.append("status", values?.status)
        data.append("image", values?.image)

        dispatch(
          addProject(
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

  const { projects } = useSelector(store => store?.projects)
  const { partners } = useSelector(store => store?.partners)

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
        Header: "Title",
        accessor: "title",
        filterable: true,
        Cell: cellProps => {
          return <Title {...cellProps} />
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
        Header: "Budget",
        accessor: "budget",
        filterable: true,
        Cell: cellProps => {
          return <Budget {...cellProps} />
        },
      },

      {
        Header: "Start Date",
        accessor: "start_date",
        filterable: true,
        Cell: cellProps => {
          return <StartDate {...cellProps} />
        },
      },
      {
        Header: "End Date",
        accessor: "end_date",
        filterable: true,
        Cell: cellProps => {
          return <EndDate {...cellProps} />
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
    dispatch(getProjects())
    dispatch(getPartenrs())
  }, [dispatch])

  useEffect(() => {
    if (projects && !projects.length) {
      dispatch(getProjects())
      setIsEdit(false)
    }
  }, [dispatch, projects])

  useEffect(() => {
    setContact(projects)
    setIsEdit(false)
  }, [projects])

  useEffect(() => {
    if (!isEmpty(projects) && !!isEdit) {
      setContact(projects)
      setIsEdit(false)
    }
  }, [projects])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const project = arg
    setContact({
      id: project.id,
      budget: project.budget,
      end_date: project.end_date,
      description: project.description,
      title: project.title,
      start_date: project.start_date,
      status: project.status,
      image: project.image,
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

  const onClickDelete = projects => {
    setContact(projects)
    setDeleteModal(true)
  }

  const handleDeleteProject = () => {
    dispatch(
      deleteProject(
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
        onDeleteClick={handleDeleteProject}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects List" breadcrumbItem="All Projects" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={projects}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Project" : "Add Project"}
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
                                : img
                            }
                            onChange={event => {
                              setFilename(
                                prev => event.target.files[0]?.title || ""
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
                              <Label className="form-label">Title</Label>
                              <Input
                                name="title"
                                label="Title"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.title || ""}
                                invalid={
                                  validation.touched.title &&
                                  validation.errors.title
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.title &&
                              validation.errors.title ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.title}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Budget</Label>
                              <Input
                                name="budget"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.budget || ""}
                                invalid={
                                  validation.touched.budget &&
                                  validation.errors.budget
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.budget &&
                              validation.errors.budget ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.budget}
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
                              <Label className="form-label">Partner</Label>
                              <Input
                                name="partner_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.partner_id || ""}
                                invalid={
                                  validation.touched.partner_id &&
                                  validation.errors.partner_id
                                    ? true
                                    : false
                                }
                              >
                                <option selected disabled></option>
                                {partners?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.partner_id &&
                              validation.errors.partner_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.partner_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Start Date</Label>
                              <Input
                                name="start_date"
                                label="Start Date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.start_date || ""}
                                invalid={
                                  validation.touched.start_date &&
                                  validation.errors.start_date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.start_date &&
                              validation.errors.start_date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.start_date}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">End Date</Label>
                              <Input
                                name="end_date"
                                label="End Date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.end_date || ""}
                                invalid={
                                  validation.touched.end_date &&
                                  validation.errors.end_date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.end_date &&
                              validation.errors.end_date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.end_date}
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
                                <option value={"ongoing"}>Ongoing</option>
                                <option value={"completed"}>Completed</option>
                                <option value={"draft"}>Draft</option>
                              </Input>
                              {validation.touched.status &&
                              validation.errors.status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.status}
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

export default withRouter(Projects)
