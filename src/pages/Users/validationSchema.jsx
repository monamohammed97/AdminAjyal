import * as Yup from "yup"

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      first_name: Yup.string().required("Please Enter First Name"),
      last_name: Yup.string().required("Please Enter Last Name"),
      email: Yup.string().email().required("Please Enter Email"),
      phone: Yup.number().required("Please Enter Phone"),
      gender: Yup.string().required("Please Select Gender"),
      position_description: Yup.string().required(
        "Please Enter Your Position Description"
      ),
    })
  }

  return Yup.object({
    first_name: Yup.string().required("Please Enter First Name"),
    last_name: Yup.string().required("Please Enter Last Name"),
    email: Yup.string().email().required("Please Enter Email"),
    password: Yup.string().required("Please Enter Email"),
    phone: Yup.number().required("Please Enter Phone"),
    gender: Yup.string().required("Please Select Gender"),
    overview: Yup.string(),
    position_description: Yup.string().required(
      "Please Enter Your Position Description"
    ),
    image: Yup.mixed().nullable(),
  })
}
