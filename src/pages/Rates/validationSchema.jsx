import * as Yup from "yup"

export const validationSchema = Yup.object({
  notes: Yup.string().required("Please Enter Notes"),
  rate: Yup.string().required("Please Select Rate"),
  student_id: Yup.number().required("Please Select Student"),
  course_id: Yup.number().required("Please Select Course"),
})
