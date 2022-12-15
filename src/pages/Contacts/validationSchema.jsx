import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  description: Yup.string().required("Please Enter Your Description"),
  code: Yup.string().required("Please Enter Code"),
  specialty: Yup.string().required("Please Enter Your Specialty"),
  image: Yup.mixed()
    .required("يرجى إدخال اسم  صورة  مستخدم  بطريقة  صحيحة  *")
    .nullable(),
})
