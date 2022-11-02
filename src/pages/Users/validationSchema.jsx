import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Please Enter Your first name"),
  last_name: Yup.string().required("Please Enter Your last name"),
  password: Yup.string().required("Please Enter password"),
  email: Yup.string().email().required("Please Enter Your email"),
  phone: Yup.string().required("Please Enter Your phone"),
  gender: Yup.string().required("Please Enter Your gender"),
  overview: Yup.string().required("Please Enter Your overview"),
  position_description: Yup.string().required("Please Enter Your position_description"),
  image: Yup.mixed()
    .required("يرجى إدخال اسم  صورة  مستخدم  بطريقة  صحيحة  *")
    .nullable()
    .test(
      "fileSize",
      "* 11يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليو بايت",
      value => !value || (value && value?.size <= 1024 * 1024)
    )
    .test(
      "fileFormat",
      "* يجب ان تكون الصورة أكبر من 500* 500 بيكسل وبحجم لا يتجاوز 300 كليوssss بايت",
      value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
})
