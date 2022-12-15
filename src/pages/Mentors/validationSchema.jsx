import * as Yup from "yup"


export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      first_name: Yup.string().required("Please Enter First Name"),
      last_name: Yup.string().required("Please Enter Last Name"),
      email: Yup.string().email().required("Please Enter Email"),
      phone: Yup.number().required("Please Enter Phone"),
      gender: Yup.string().required("Please Enter Select Gender"),
      overview: Yup.string(),
    })
  }

  return Yup.object({
    first_name: Yup.string().required("Please Enter First Name"),
    last_name: Yup.string().required("Please Enter Last Name"),
    password: Yup.string().required("Please Enter Password"),
    email: Yup.string().email().required("Please Enter Email"),
    phone: Yup.number().required("Please Enter Phone"),
    gender: Yup.string().required("Please Enter Select Gender"),
    overview: Yup.string(),
    image: Yup.mixed().nullable(),
  })
}
