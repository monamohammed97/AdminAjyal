import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter title"),
      details: Yup.string().required("Please Enter details"),
      notes: Yup.string().required("Please Enter notes"),
      status: Yup.string().required("Please Enter status"),
      attachment: Yup.string().required("Please Enter attachment"),
      deadline: Yup.string().required("Please Enter deadline"),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter title"),
    details: Yup.string().required("Please Enter details"),
    notes: Yup.string().required("Please Enter notes"),
    status: Yup.string().required("Please Enter status"),
    attachment: Yup.string().required("Please Enter attachment"),
    deadline: Yup.date().required("Please Enter deadline"),
    image: Yup.mixed()
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
