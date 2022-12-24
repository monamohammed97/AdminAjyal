import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter Title"),
      description: Yup.string().required("Please Enter Description"),
      project_id: Yup.number().required("Please Enter Project"),
      activity_type_id: Yup.string().required("Please Enter Activity Type"),
      date: Yup.date().required("Please Enter Date"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter Title"),
    description: Yup.string().required("Please Enter Description"),
    project_id: Yup.number().required("Please Enter Project"),
    activity_type_id: Yup.string().required("Please Enter Activity Type"),
    date: Yup.date().required("Please Enter Date"),
    image: Yup.mixed().required("Please Enter Image").nullable(),
  })
}
