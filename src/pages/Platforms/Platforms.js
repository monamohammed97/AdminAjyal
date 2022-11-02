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

import { Name, JobCount } from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import { getPlatforms } from "store/fetchData/actions"
import { addPlatform, deletePlatform, updatePlatform } from "store/admin/platform/actions"
import { notify } from "components/Common/notify"

const Platforms = props => {
  //meta title
  const [filename, setFilename] = useState("")

  document.title = "Platforms"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      jobs_count: (contact && contact.jobs_count) || "",
      image: (contact && contact.image) || "",
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("name", values?.name)
        edit.append("_method", "put")
        edit.append("jobs_count", values?.jobs_count)
        edit.append("image", values?.image)

        console.log(values)
        dispatch(
          updatePlatform(edit, contact.id,() => {
            notify("success", "Success")
          },
          () => {
            notify("error", "Failed")
          })
        )
        setIsEdit(false)
        validation.resetForm()
        toggle()
      } else {
        var data = new FormData()
        data.append("name", values?.name)
        data.append("jobs_count", values?.jobs_count)
        data.append("image", values?.image)

        dispatch(addPlatform(data,() => {
          notify("success", "Success")
        },
        () => {
          notify("error", "Failed")
        }))
        validation.resetForm()
        toggle()
      }
    },
  })

  const { platforms } = useSelector(store => store?.data)

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
        Header: "Job Count",
        accessor: "jobs_count",
        filterable: true,
        Cell: cellProps => {
          return <JobCount {...cellProps} />
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
    dispatch(getPlatforms())
  }, [dispatch])

  useEffect(() => {
    if (platforms && !platforms.length) {
      dispatch(getPlatforms())
      setIsEdit(false)
    }
  }, [dispatch, platforms])

  useEffect(() => {
    setContact(platforms)
    setIsEdit(false)
  }, [platforms])

  useEffect(() => {
    if (!isEmpty(platforms) && !!isEdit) {
      setContact(platforms)
      setIsEdit(false)
    }
  }, [platforms])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const platform = arg
    setContact({
      id: platform.id,
      name: platform.name,
      jobs_count: platform.jobs_count,
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

  const onClickDelete = platforms => {
    setContact(platforms)
    setDeleteModal(true)
  }

  const handleDeletePlatform = () => {
    dispatch(deletePlatform(contact,() => {
      notify("success", "Success")
    },
    () => {
      notify("error", "Failed")
    }))
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
        onDeleteClick={handleDeletePlatform}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Platforms List" breadcrumbItem="All Platforms" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={platforms}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Platform" : "Add Platform"}
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
                              <Label className="form-label">Jobs Count</Label>
                              <Input
                                name="jobs_count"
                                label="Jobs Count"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.jobs_count || ""}
                                invalid={
                                  validation.touched.jobs_count &&
                                  validation.errors.jobs_count
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.jobs_count &&
                              validation.errors.jobs_count ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.jobs_count}
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

export default withRouter(Platforms)
