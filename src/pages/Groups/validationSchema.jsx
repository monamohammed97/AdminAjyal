import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter Title"),
      description: Yup.string().required("Please Enter Description"),
      project_id: Yup.number(),
      category_id: Yup.number().required("Please Enter Category"),
      end_date: Yup.date(),
      start_date: Yup.date(),
      hour_count: Yup.number().required("Please Enter Hour Count"),
      participants_count: Yup.number().required(
        "Please Enter Participants Count"
      ),
      status: Yup.string().required("Please Enter Status"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter Title"),
    description: Yup.string().required("Please Enter Description"),
    project_id: Yup.number(),
    category_id: Yup.number().required("Please Enter Category"),
    end_date: Yup.date(),
    start_date: Yup.date(),
    hour_count: Yup.number().required("Please Enter Hour Count"),
    participants_count: Yup.number().required(
      "Please Enter Participants Count"
    ),
    status: Yup.string().required("Please Enter Status"),
    image: Yup.mixed().required("Please Enter Image").nullable(),
  })
}
