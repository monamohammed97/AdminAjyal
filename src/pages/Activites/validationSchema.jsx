import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter Title"),
      description: Yup.string().required("Please Enter Your Description"),
      project_id: Yup.number().required("Please Enter Code"),
      activity_type_id: Yup.string().required("Please Enter Your Specialty"),
      date: Yup.date().required("Please Enter Date"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter Title"),
    description: Yup.string().required("Please Enter Your Description"),
    project_id: Yup.number().required("Please Enter Code"),
    activity_type_id: Yup.string().required("Please Enter Your Specialty"),
    date: Yup.date().required("Please Enter Date"),
    image: Yup.mixed()
      .required("Please Enter Image")
      .nullable()
      .test(
        "fileSize",
        "* 11يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
        value => !value || (value && value?.size <= 1024 * 1024)
      )
      .test(
        "fileFormat",
        "* يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
        value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
  })
}