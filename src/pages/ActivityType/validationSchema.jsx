import * as Yup from 'yup'

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema=Yup.object({
          name: Yup.string().required("Please Enter Activity"),
        })
