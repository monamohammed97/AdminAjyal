import * as Yup from 'yup'

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema=Yup.object({
          name: Yup.string().required("Please Enter Your Name"),
          description: Yup.string().required("Please Enter Your Description"),
          link: Yup.string().required("Please Enter URL"),
          logo: Yup.mixed()
            .required("choose image")
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
