import React, { useEffect } from "react"

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Label,
  Input,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "components/Common/notify"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { getAboutus, addAboutus } from "store/admin/landingpage/actions"

const AboutUs = props => {
  //meta title
  document.title = "About Us"

  const aboutUs = useSelector(store => store?.landingPage?.aboutUS)

  const dispatch = useDispatch()
  const [selectedFiles, setselectedFiles] = useState([])
  const [images, setImages] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      content: aboutUs?.content || "",
      images: [],
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Please Enter Your Name"),
    //   content: Yup.string().required("Please Enter Your Description"),
    // }),
    onSubmit: values => {
      let data = new FormData()
      data.append("content", values?.content)
      if (values?.images instanceof Array) {
        values?.images?.forEach(image => {
          data.append("images[]", image)
        })
      }

      dispatch(
        addAboutus(
          data,
          () => {
            notify("success", "success")
          },
          () => {
            notify("error", "failed")
          }
        )
      )
    },
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
    validation.setFieldValue("images", files)
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  useEffect(() => {
    dispatch(getAboutus())
    // setImages(aboutUs?.[]||[])
  }, [dispatch])

  // const handleDelete = img => {
  //   setImages([]?.filter(src => src != img))
  // }

  const handleDelete = img => {
    const filterData = selectedFiles?.filter(src => src?.preview != img)
    setselectedFiles(filterData)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="About us" breadcrumbItem="About us" />
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <div className="mb-3">
              {/* <Label className="form-label">Description</Label> */}
              <Input
                dir="rtl"
                name="content"
                label="About us"
                type="textarea"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation?.values?.content || ""}
                invalid={
                  validation.touched.content && validation.errors.content
                    ? true
                    : false
                }
              />
              {validation.touched.content && validation.errors.content ? (
                <FormFeedback type="invalid">
                  {validation.errors.content}
                </FormFeedback>
              ) : null}
            </div>
            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles)
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone mt-4">
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
            <div className="dropzone-previews mt-3" id="file-previews">
              {selectedFiles?.map((f, i) => {
                return (
                  <Card
                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                    key={i + "-file"}
                  >
                    <div className="p-2 d-flex justify-content-between align-items-center">
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
                          <Link to="#" className="text-muted font-weight-bold">
                            {f.name}
                          </Link>
                          <p className="mb-0">
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </Col>
                      </Row>
                      <Link
                        to="#"
                        className="text-danger pe-3"
                        onClick={() => {
                          handleDelete(f.preview)
                        }}
                      >
                        <i
                          className="mdi mdi-delete font-size-18"
                          id="deletetooltip"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltip"
                        >
                          Delete
                        </UncontrolledTooltip>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
            {/* <div className="dropzone-previews mt-3" id="file-previews">
              {[]?.map((f, i) => {
                return (
                  <Card
                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                    key={i + "-file"}
                  >
                    <div className="p-2 d-flex justify-content-between align-items-center">
                      <Row className="align-items-center col-11">
                        <Col className="col-auto">
                          <img
                            data-dz-thumbnail=""
                            height="80"
                            className="avatar-sm rounded bg-light"
                            alt={f.name}
                            src={f}
                          />
                        </Col>
                      </Row>
                      <Link
                        to="#"
                        className="text-danger pe-3"
                        onClick={() => {
                          handleDelete(f)
                        }}
                      >
                        <i
                          className="mdi mdi-delete font-size-18"
                          id="deletetooltip"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltip"
                        >
                          Delete
                        </UncontrolledTooltip>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div> */}
            <Row>
              <Col>
                <div className="text-end my-4">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-success save-user"
                  >
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AboutUs
