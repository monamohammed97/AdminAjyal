import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  platform_id: Yup.number().required("Please Select Platform"),
  student_id: Yup.number().required("Please Select Student"),
  group_id: Yup.number().required("Please Select Group"),
  salary: Yup.number().required("Please Enter Salary"),
  job_title: Yup.string().required("Please Enter Job Title"),
  status: Yup.string().required("Please Select Status"),
  job_description: Yup.string().max(
    300,
    "Please Enter Less than 300 character"
  ),
  job_link: Yup.string().max(300, "Please Enter Less than 300 character"),
  client_feedback: Yup.string().max(
    300,
    "Please Enter Less than 300 character"
  ),
  notes: Yup.string().max(300, "Please Enter Less than 300 character"),
})
