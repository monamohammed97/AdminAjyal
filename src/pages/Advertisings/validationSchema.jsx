import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter title"),
      details: Yup.string().required("Please Enter details"),
      notes: Yup.string(),
      status: Yup.string().required("Please Enter status"),
      attachment: Yup.string(),
      deadline: Yup.string().required("Please Enter deadline"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter title"),
    details: Yup.string().required("Please Enter details"),
    notes: Yup.string(),
    status: Yup.string().required("Please Enter status"),
    attachment: Yup.string(),
    deadline: Yup.date().required("Please Enter deadline"),
    image: Yup.mixed().nullable(),
  })
}
