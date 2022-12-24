import React, { useEffect } from "react"

import {
  Form,
  Card,
  Col,
  Row,
  Container,
  Input,
  Label,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "components/Common/notify"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import {
  getLandingPageContent,
  addLandingPageContent,
} from "store/admin/landingpage/actions"
import * as Yup from "yup"

//please don't rename these variables or keys
const staticLandingPageKeys = [
  {
    key: "aboutUs",
    label: "About Us",
    hasImages: true,
    hasText: true,
    imageNumber: 4,
  },
  {
    key: "hero",
    label: "Hero",
    hasImages: true,
    hasText: false,
    imageNumber: 1,
  },
  {
    key: "overview",
    label: "Overview",
    hasImages: true,
    hasText: true,
    imageNumber: 1,
  },
  {
    key: "ourGoals",
    label: "Our Goals",
    hasImages: true,
    hasText: true,
    imageNumber: 1,
  },
  {
    key: "facebook_link",
    label: "Facebook Link",
    hasImages: false,
    hasText: true,
    imageNumber: 0,
  },
  {
    key: "email",
    label: "Email",
    hasImages: false,
    hasText: true,
    imageNumber: 0,
  },
  {
    key: "phone",
    label: "Phone",
    hasImages: false,
    hasText: true,
    imageNumber: 0,
  },
  {
    key: "telephone",
    label: "Telephone",
    hasImages: false,
    hasText: true,
    imageNumber: 0,
  },
]

const AboutUs = props => {
  //meta title
  document.title = "Landing Page Content"

  const dispatch = useDispatch()
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectedSection, setSelectedSection] = useState(
    staticLandingPageKeys[0]?.key || null
  )
  const [section, setSection] = useState(null)
  const landingPageContent = useSelector(store => store?.landingPage)

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: landingPageContent?.[section?.key]?.content || "",
      images: [],
    },
    validationSchema: Yup.object({
      content: section?.hasText
        ? Yup.string().required(`Please Enter ${section?.label}`)
        : Yup.string(),
    }),
    onSubmit: values => {
      let data = new FormData()
      if (values?.content) data.append("content", values?.content)

      if (values?.images.length == section?.imageNumber && section?.hasImages) {
        if (values?.images instanceof Array) {
          values?.images?.forEach(image => {
            data.append("images[]", image)
          })
        }
        dispatch(
          addLandingPageContent(
            section?.key,
            data,
            () => {
              notify("success", "success")
            },
            null
          )
        )
      } else if (!section.hasImages) {
        dispatch(
          addLandingPageContent(
            section?.key,
            data,
            () => {
              notify("success", "success")
            },
            null
          )
        )
      } else {
        notify("error", `Please Enter ${section?.imageNumber} Images`)
      }
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
    dispatch(getLandingPageContent())
  }, [dispatch])

  useEffect(() => {
    setSection(
      staticLandingPageKeys.find(item => item?.key === selectedSection)
    )
  }, [selectedSection])

  const handleDelete = img => {
    const filterData = selectedFiles?.filter(src => src?.preview != img)
    setselectedFiles(filterData)
  }
  const handleSectionChange = event => {
    setSelectedSection(event.target.value)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="mb-3">
            <Label className="form-label">Section</Label>
            <Input
              name="section_key"
              className="form-control"
              type="select"
              onChange={handleSectionChange}
              value={selectedSection}
            >
              {staticLandingPageKeys?.map((el, index) => (
                <option key={el?.key} value={el.key}>
                  {el?.key}
                </option>
              ))}
            </Input>
          </div>
          <Breadcrumbs title={section?.label} breadcrumbItem={section?.label} />
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            {section?.hasText ? (
              <div className="mb-3">
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
            ) : null}
            {section?.hasImages ? (
              <>
                {/* <Row className="align-items-center">
              {aboutUs?.images &&
                aboutUs?.images.map((img, index) => (
                  <Col key={index} className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      src={img}
                    />
                  </Col>
                ))}
            </Row> */}

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
                        {validation?.values.images?.length !=
                        section?.imageNumber ? (
                          <h6>
                            <span className="text-danger" htmlFor={"image"}>
                              Please Enter Just {section?.imageNumber} Images
                            </span>
                          </h6>
                        ) : null}
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
              </>
            ) : null}

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
