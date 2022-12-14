import React, { useEffect, useState } from "react"

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
} from "reactstrap"

// Form Editor
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import { updateFreelance } from "store/freelance/actions"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "components/Common/notify"
import { FileInput } from "components/Form/FileInput"
import img from "assets/images/img.png"
import { getStudents } from "store/admin/student/actions"
import { getGroups } from "store/admin/group/actions"
import { getPlatforms } from "store/admin/platform/actions"
import { getFreelancer } from "store/freelance/actions"
import { validationSchema } from "./validationSchema"

const EditJob = props => {
  //meta title
  document.title = "Edit Job"

  const dispatch = useDispatch()
  const {
    match: {
      params: { id },
    },
  } = props

  const { students } = useSelector(store => store?.students)
  const { groups } = useSelector(store => store?.groups)
  const { platforms } = useSelector(store => store?.platforms)
  const { freelance } = useSelector(store => store?.freelance)

  const [filterData, setFilterData] = useState(
    // pages.filter(el => el?.id == id)
    []
  )

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      platform_id: filterData[0]?.platform_id,
      student_id: filterData[0]?.student_id,
      group_id: filterData[0]?.group_id,
      job_title: (filterData && filterData[0]?.job_title) || "",
      salary: (filterData && filterData[0]?.salary) || "",
      job_description: (filterData && filterData[0]?.job_description) || "",
      job_link: (filterData && filterData[0]?.job_link) || "",
      status: (filterData && filterData[0]?.status) || "",
      client_feedback: (filterData && filterData[0]?.client_feedback) || "",
      notes: (filterData && filterData[0]?.notes) || "",
      attachment: (filterData && filterData[0]?.attachment) || null,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      var data = new FormData()
      data.append("platform_id", values?.platform_id)
      data.append("student_id", values?.student_id)
      data.append("group_id", values?.group_id)
      data.append("job_title", values?.job_title)
      data.append("salary", values?.salary)
      if (values?.job_link) data.append("job_link", values?.job_link)
      if (values?.job_description)
        data.append("job_description", values?.job_description)

      data.append("status", values?.status)
      if (values?.client_feedback)
        data.append("client_feedback", values?.client_feedback)
      if (values?.notes) data.append("notes", values?.notes)
      if (values?.attachment instanceof File) {
        data.append("attachment", values?.attachment)
      }

      if (values?.attachment instanceof File) {
        data.append("attachment", values?.attachment)
      }
      data.append("_method", "put")

      dispatch(
        updateFreelance(
          data,
          filterData[0].id,
          props.history,
          () => {
            notify("success", "Success")
          },
          null
        )
      )
      validation.resetForm()
    },
  })

  useEffect(() => {
    dispatch(getStudents())
    dispatch(getGroups())
    dispatch(getPlatforms())
    dispatch(getFreelancer())
  }, [dispatch])

  useEffect(() => {
    setFilterData(freelance.filter(el => el?.id == id))
  }, [freelance])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Add New Job" breadcrumbItem="Add New Job" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Student</Label>
                          <Input
                            name="student_id"
                            className="form-control"
                            type="select"
                            disabled
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.student_id || ""}
                            invalid={
                              validation.touched.student_id &&
                              validation.errors.student_id
                                ? true
                                : false
                            }
                          >
                            <option defaultValue disabled></option>
                            {students?.map(el => (
                              <option key={el?.id} value={el.id}>
                                {el.name}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.student_id &&
                          validation.errors.student_id ? (
                            <FormFeedback type="invalid">
                              {validation.errors.student_id}
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
                        <div className="mb-3">
                          <Label className="form-label">Platfrom</Label>
                          <Input
                            name="platform_id"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.platform_id || ""}
                            invalid={
                              validation.touched.platform_id &&
                              validation.errors.platform_id
                                ? true
                                : false
                            }
                          >
                            <option defaultValue disabled></option>
                            {platforms?.map(el => (
                              <option key={el?.id} value={el.id}>
                                {el.name}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.platform_id &&
                          validation.errors.platform_id ? (
                            <FormFeedback type="invalid">
                              {validation.errors.platform_id}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Salary</Label>
                          <Input
                            name="salary"
                            label="Salary"
                            type="number"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.salary || ""}
                            invalid={
                              validation.touched.salary &&
                              validation.errors.salary
                                ? true
                                : false
                            }
                          />
                          {validation.touched.salary &&
                          validation.errors.salary ? (
                            <FormFeedback type="invalid">
                              {validation.errors.salary}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Title</Label>
                          <Input
                            name="job_title"
                            label="text"
                            type="job_title"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.job_title || ""}
                            invalid={
                              validation.touched.job_title &&
                              validation.errors.job_title
                                ? true
                                : false
                            }
                          />
                          {validation.touched.job_title &&
                          validation.errors.job_title ? (
                            <FormFeedback type="invalid">
                              {validation.errors.job_title}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Description</Label>
                          <Input
                            name="job_description"
                            label="Description"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.job_description || ""}
                            invalid={
                              validation.touched.job_description &&
                              validation.errors.job_description
                                ? true
                                : false
                            }
                          />
                          {validation.touched.job_description &&
                          validation.errors.job_description ? (
                            <FormFeedback type="invalid">
                              {validation.errors.job_description}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Link</Label>
                          <Input
                            name="job_link"
                            label="Link"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.job_link || ""}
                            invalid={
                              validation.touched.job_link &&
                              validation.errors.job_link
                                ? true
                                : false
                            }
                          />
                          {validation.touched.job_link &&
                          validation.errors.job_link ? (
                            <FormFeedback type="invalid">
                              {validation.errors.job_link}
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
                            invalid={
                              validation.touched.status &&
                              validation.errors.status
                                ? true
                                : false
                            }
                          >
                            <option defaultValue disabled></option>
                            <option value={"ongoing"}>Ongoing</option>
                            <option value={"completed"}>Completed</option>
                          </Input>
                          {validation.touched.status &&
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Feedback</Label>
                          <Input
                            name="client_feedback"
                            label="Feedback"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.client_feedback || ""}
                            invalid={
                              validation.touched.client_feedback &&
                              validation.errors.client_feedback
                                ? true
                                : false
                            }
                          />
                          {validation.touched.client_feedback &&
                          validation.errors.client_feedback ? (
                            <FormFeedback type="invalid">
                              {validation.errors.client_feedback}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Note</Label>
                          <Input
                            name="notes"
                            label="Note"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.notes || ""}
                            invalid={
                              validation.touched.notes &&
                              validation.errors.notes
                                ? true
                                : false
                            }
                          />
                          {validation.touched.notes &&
                          validation.errors.notes ? (
                            <FormFeedback type="invalid">
                              {validation.errors.notes}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row className="wrapperdiv">
                      <FileInput
                        name="attachment"
                        src={
                          typeof validation.values?.attachment === "object" &&
                          validation.values?.attachment
                            ? URL.createObjectURL(validation.values?.attachment)
                            : typeof validation.values.attachment === "string"
                            ? validation.values.attachment
                            : img
                        }
                        onChange={event => {
                          validation.setFieldValue(
                            "attachment",
                            event.currentTarget.files[0]
                          )
                        }}
                      />
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end my-4">
                          <button
                            name="submit"
                            className="btn btn-success save-user"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  {/* <Form method="post"></Form> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EditJob
