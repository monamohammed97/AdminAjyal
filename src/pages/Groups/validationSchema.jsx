import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Description"),
      project_id: Yup.number().required("Please Enter Project"),
      category_id: Yup.number().required("Please Enter Category"),
      end_date: Yup.date().required("Please Enter End Date"),
      start_date: Yup.date().required("Please Enter Start Date"),
      hour_count: Yup.number().required("Please Enter Hour Count"),
      participants_count: Yup.number().required(
        "Please Enter Participants Count"
      ),
      status: Yup.string().required("Please Enter Status"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter Your Name"),
    description: Yup.string().required("Please Enter Your Description"),
    project_id: Yup.string().required("Please Enter Project"),
    category_id: Yup.string().required("Please Enter Category"),
    end_date: Yup.string().required("Please Enter End Date"),
    start_date: Yup.string().required("Please Enter Start Date"),
    hour_count: Yup.number().required("Please Enter Hour Count"),
    participants_count: Yup.number().required(
      "Please Enter Participants Count"
    ),
    status: Yup.string().required("Please Enter Status"),
    image: Yup.mixed().required("Please Enter Image").nullable(),
    // .test(
    //   "fileSize",
    //   "* 11يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
    //   value => !value || (value && value?.size <= 1024 * 1024)
    // )
    // .test(
    //   "fileFormat",
    //   "* يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
    //   value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    // ),
  })
}
