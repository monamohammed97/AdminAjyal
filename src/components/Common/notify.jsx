import toastr from "toastr"
import "toastr/build/toastr.min.css"
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
}

export const notify = (toastType, message, title) => {
  if (toastType === "info") toastr.info(message, title)
  else if (toastType === "warning") toastr.warning(message, title)
  else if (toastType === "error") toastr.error(message, title)
  else toastr.success(message, title)
}
