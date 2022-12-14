export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1])
  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)
  var dw = new DataView(ab)
  for (var i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i))
  }
  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString })
}




export function readFileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  })
  }
