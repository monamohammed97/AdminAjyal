import * as Yup from "yup"

export const validationSchema = Yup.object({
  title: Yup.string().required("Please Enter Your Name"),
  description: Yup.string().required("Please Enter Your Description"),
  status: Yup.string().required("Please Select Status"),
  budget: Yup.number(),
  start_date: Yup.date(),
  end_date: Yup.date(),
  image: Yup.mixed().nullable(),
})
