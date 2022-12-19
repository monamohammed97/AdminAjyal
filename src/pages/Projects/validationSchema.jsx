import * as Yup from "yup"

export const getValidationSchema = isEdit => {
  if (isEdit) {
    return Yup.object({
      title: Yup.string().required("Please Enter Name"),
      description: Yup.string().required("Please Enter Description"),
      status: Yup.string().required("Please Select Status"),
      budget: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    })
  }

  return Yup.object({
    title: Yup.string().required("Please Enter Your Name"),
    description: Yup.string().required("Please Enter Description"),
    status: Yup.string().required("Please Select Status"),
    budget: Yup.number(),
    start_date: Yup.date(),
    end_date: Yup.date(),
    image: Yup.mixed().required("Please Enter Image").nullable(),
  })
}
