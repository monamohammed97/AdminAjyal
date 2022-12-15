import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      name: Yup.string().required("Please Enter First Name"),
      description: Yup.string().required("Please Enter Last Name"),
      link: Yup.string().url("Please Enter Link"),
    })
  }

  return Yup.object({
    name: Yup.string().required("Please Enter First Name"),
    description: Yup.string().required("Please Enter Last Name"),
    link: Yup.string().url("Please Enter Link"),
    logo: Yup.mixed().required("Please Enter Logo").nullable(),
  })
}
