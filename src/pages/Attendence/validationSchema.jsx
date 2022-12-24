import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  course_id: Yup.string().required("Please Enter Course"),
  date: Yup.string().required("Please Enter Date"),
})
