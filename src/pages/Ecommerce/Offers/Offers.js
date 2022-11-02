import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  InputGroup,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { Title, Description, Price, Clinic, Expier } from "./contactlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  addNewOffer as onAddNewOffer,
  updateOffer as onUpdateOffer,
  deleteOffer as onDeleteOffer,
} from "store/contacts/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import { FileInput } from "components/Form/FileInput"
import img2 from "../../../assets/images/users/avatar-1.jpg"
import { getClinics, getOffers } from "store/doctors/actions"
import { notify } from "components/Common/notify"
import Dropzone from "react-dropzone"

const Offers = props => {
  //meta title
  document.title = "Offers | ABHA"
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ]

  const { isSuccess } = useSelector(store => store?.contacts)
  const { updateSucces } = useSelector(store => store?.contacts)

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [filename, setFilename] = useState("")

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (contact && contact.title) || "",
      description: (contact && contact.description) || "",
      price: (contact && contact.price) || "",
      clinic: (contact && contact.clinic) || "",
      expier: (contact && contact.expier) || "",
      image: (contact && contact.image) || img2,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Designation"),
      price: Yup.string().required("Please Enter price"),
      clinic: Yup.string().required("Please Enter Your "),
      expier: Yup.string().required("Please Enter Your "),
      image: Yup.mixed()
        .required("يرجى إدخال اسم  صورة  مستخدم  بطريقة  صحيحة  *")
        .nullable()
        .test(
          "fileSize",
          "* 11يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
          value => !value || (value && value?.size <= 1024 * 1024)
        )
        .test(
          "fileFormat",
          "* يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليوssss بايت",
          value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
    }),
    onSubmit: values => {
      if (isEdit) {
        var edit = new FormData()
        contact.title !== values.title && edit.append("title", values?.title)
        contact.description !== values.description &&
          edit.append("description", values?.description)
        contact.price !== values.price && edit.append("price", values?.price)
        contact.clinic !== values.clinic &&
          edit.append("clinic", values?.clinic)
        contact.expier !== values.expier &&
          edit.append("expier", values?.expier)
        typeof values.image === "object" && edit.append("image", values?.image)

        // update user
        dispatch(
          onUpdateOffer(
            edit,
            contact?.id,
            () => {
              //  should  be  chnage  the  text  info

              notify("success", "Success")
            },
            () => {
              //  should  be  chnage  the  text  info
              notify("error", "Failed")
            }
          )
        )
        setselectedFiles([])
        validation.resetForm()
        setIsEdit(false)
      } else {
        var newOffer = new FormData()
        newOffer.append("title", values?.title)
        newOffer.append("description", values?.description)
        newOffer.append("price", values?.price)
        newOffer.append("clinic", values?.clinic)
        newOffer.append("expier", values?.expier)
        newOffer.append("image", values?.image)

        // save new user
        dispatch(
          onAddNewOffer(
            newOffer,
            () => {
              //  should  be  chnage  the  text  info

              notify("success", "Success")
            },
            () => {
              //  should  be  chnage  the  text  info
              notify("error", "Failed")
            }
          )
        )
        setselectedFiles([])
        validation.resetForm()
      }
      toggle()
    },
  })

  const [selectedFiles, setselectedFiles] = useState([])
  const { offers } = useSelector(store => store?.doctors)
  const { clinics } = useSelector(store => store?.doctors)

  console.log(clinics)

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
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
        Header: "Price",
        accessor: "price",
        filterable: true,
        Cell: cellProps => {
          return <Price {...cellProps} />
        },
      },
      {
        Header: "Clinic",
        accessor: "clinic",
        filterable: true,
        Cell: cellProps => {
          return <Clinic {...cellProps} />
        },
      },
      {
        Header: "Expier",
        accessor: "expier",
        filterable: true,
        Cell: cellProps => {
          return <Expier {...cellProps} />
        },
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
                <i
                  className="fas fa-eye-slash font-size-14"
                  id="deletetooltip"
                />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Hide
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  useEffect(() => {
    dispatch(getClinics())
  }, [dispatch])

  useEffect(() => {
    if (offers && !offers.length) {
      dispatch(getOffers())
      setIsEdit(false)
    }
  }, [dispatch, offers])

  // useEffect(() => {
  //   // console.log(isSuccess || deleteSuccess || updateSucces)
  //   if (isSuccess || updateSucces) {
  //     dispatch(getOffers())
  //   }
  // }, [dispatch, isSuccess, updateSucces])

  useEffect(() => {
    setContact(offers)
    setIsEdit(false)
  }, [offers])

  useEffect(() => {
    if (!isEmpty(offers) && !!isEdit) {
      setContact(offers)
      setIsEdit(false)
    }
  }, [offers])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setContact({
      id: user.id,
      title: user.title,
      description: user.description,
      price: user.price,
      clinic: user.clinic,
      expier: user.expier,
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

  const onClickDelete = offers => {
    setContact(offers)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(
      onDeleteOffer(
        contact,
        () => {
          //  should  be  chnage  the  text  info

          notify("success", "Success")
        },
        () => {
          //  should  be  chnage  the  text  info
          notify("error", "Failed")
        }
      )
    )
    dispatch(getOffers())
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
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Offers" breadcrumbItem="Offers" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={offers}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Offer" : "Add New Offer"}
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
                              <Label className="form-label">Title</Label>
                              <Input
                                name="title"
                                type="text"
                                label="Title"
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
                              <Label className="form-label">Description</Label>
                              <Input
                                name="description"
                                label="Description"
                                type="text;"
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
                              <Label className="form-label">Price</Label>
                              <InputGroup>
                                <Input
                                  name="price"
                                  label="Price"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.price || ""}
                                  invalid={
                                    validation.touched.price &&
                                    validation.errors.price
                                      ? true
                                      : false
                                  }
                                />
                                <div className="input-group-text">SAR</div>
                              </InputGroup>
                              {validation.touched.price &&
                              validation.errors.price ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.price}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Clinic</Label>
                              <Input
                                name="clinic"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.clinic || ""}
                                invalid={
                                  validation.touched.clinic &&
                                  validation.errors.clinic
                                    ? true
                                    : false
                                }
                              >
                                <option selected disabled></option>
                                {clinics?.map(el => (
                                  <option
                                    key={el?.clinicCode}
                                    value={el.clinicName}
                                  >
                                    {el.clinicName}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.clinic &&
                              validation.errors.clinic ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.clinic}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Expier</Label>
                              <Input
                                name="expier"
                                label="Expier"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.expier || ""}
                                invalid={
                                  validation.touched.expier &&
                                  validation.errors.expier
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.expier &&
                              validation.errors.expier ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.expier}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row className="wrapperdiv">
                          <Dropzone
                            multiple={false}
                            name="image"
                            onDrop={acceptedFiles => {
                              setFilename(prev => acceptedFiles[0]?.name || "")

                              validation.setFieldValue(
                                "image",
                                acceptedFiles[0]
                              )

                              setselectedFiles([
                                {
                                  preview: URL.createObjectURL(
                                    acceptedFiles[0]
                                  ),
                                  formattedSize: formatBytes(
                                    acceptedFiles[0].size
                                  ),
                                },
                              ])
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick mt-2"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles?.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              )
                            })}
                          </div>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user mx-2"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setModal(false)}
                              >
                                Cancel
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

export default withRouter(Offers)
