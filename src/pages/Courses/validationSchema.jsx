import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  title: Yup.string().required("Please Enter Title"),
  description: Yup.string().required("Please Enter Description"),
  hour_count: Yup.number().required("Please Enter Hour Count"),
  group_id: Yup.number().required("Please Select Group"),
  mentor_id: Yup.number().required("Please Select Mentor"),
  start_date: Yup.date(),
  end_date: Yup.date(),
  status: Yup.string().required("Please Select Status"),
  image: Yup.mixed().nullable(),
})
