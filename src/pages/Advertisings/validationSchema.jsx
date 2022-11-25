import * as Yup from 'yup'

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]

export const validationSchema=Yup.object({
          title: Yup.string().required("Please Enter title"),
          details: Yup.string().required("Please Enter details"),
          notes: Yup.string().required("Please Enter notes"),
          status: Yup.string().required("Please Enter status"),
          deadline: Yup.string().required("Please Enter deadline"),
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
