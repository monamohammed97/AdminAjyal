import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  title: Yup.string().required("Please Enter Title"),
  description: Yup.string().required("Please Enter Description"),
  hour_count: Yup.number().required("Please Enter Hour Count"),
  group_id: Yup.number().required("Please Select Group"),
  mentor_id: Yup.number().required("Please Select Mentor"),
  start_date: Yup.date().required("Please Enter Start Date"),
  end_date: Yup.date().required("Please Enter End Date"),
  status: Yup.string().required("Please Select Status"),
  image: Yup.mixed().nullable(),
  // .test(
  //   "fileSize",
  //   "* 11يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
  //   value => !value || (value && value?.size <= 1024 * 1024)
  // )
  // .test(
  //   "fileFormat",
  //   "* يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليوssss بايت",
  //   value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
  // ),
})
