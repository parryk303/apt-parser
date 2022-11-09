/* eslint-disable prettier/prettier */
const validation = {
  isValidObject: (value) => {
    if (typeof value === 'object' || value instanceof Object) {
      return true
    } else {
      return false
    }
  },
}

export default validation
