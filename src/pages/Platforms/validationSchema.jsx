import * as Yup from "yup"

export const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter Name"),
  jobs_count: Yup.string().required("Please Enter Jobs Count"),
  image: Yup.mixed().nullable(),
})
