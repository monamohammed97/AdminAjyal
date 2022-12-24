import * as Yup from "yup"

export const validationSchema = Yup.object({
  title: Yup.string().required("Please Enter Title"),
  description: Yup.string(),
  image: Yup.mixed().nullable(),
})
