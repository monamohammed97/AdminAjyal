export function getKeyByValue(object, value) {
  return object?.find(i => Object.keys(i)[0] === value)
}
