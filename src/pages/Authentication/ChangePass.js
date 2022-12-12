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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { useFormik } from "formik"
import { updateFreelance } from "store/freelance/actions"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "components/Common/notify"
import { FileInput } from "components/Form/FileInput"
import img from "assets/images/img.png"
import {
  getStudents,
} from "store/fetchData/actions"
import { getGroups } from "store/admin/group/actions"
import { getPlatforms } from "store/admin/platform/actions"
import { getFreelancer } from "store/freelance/actions"

const ChangePass = props => {
  //meta title
  document.title = "Change Password"

  const dispatch = useDispatch()


  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // platform_id: filterData[0]?.platform_id,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      var data = new FormData()
      // data.append("platform_id", values?.platform_id)
      dispatch(
        // updateFreelance(
        //   data,
        //   filterData[0].id,
        //   props.history,
        //   () => {
        //     notify("success", "Success")
        //   },
        //   () => {
        //     notify("error", "Failed")
        //   }
        // )
      )
      validation.resetForm()
    },
  })
  const [filename, setFilename] = useState("")

  useEffect(() => {
    // dispatch(getStudents())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Change Password" breadcrumbItem="Change Password" />
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

export default ChangePass
