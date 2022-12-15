import * as Yup from "yup"

export const validationSchema = Yup.object({
  question: Yup.string().required("Please Enter Question"),
  answer: Yup.string().required("Please Enter Answer"),
})
