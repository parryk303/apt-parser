/* eslint-disable prettier/prettier */
import { toast } from 'react-toastify'
const helpers = {
  DOMAIN: 'https://jarvis_cyberfusion.securonix.net/',
  BASE_URL: process.env.REACT_APP_BASE_URL_P,
  dateFormat: (dateISO) => {
    let date = new Date(dateISO)
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  },
  simpledate: () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    today = mm + '/' + dd + '/' + yyyy
    return today
  },
  setMessage: (msg, code) => {
    let type = code === 200 ? 'success' : 'error'
    toast(msg, { type, autoClose: 10000 })
  },
  HTTP: {
    STATUS: {
      OK: {
        CODE: 200,
        MESSAGE: 'SUCCESS',
      },
      PARTIAL_SUCCESS: {
        CODE: 206,
        MESSAGE: 'PARTIAL_SUCCESS',
      },
      BAD_REQUEST: {
        CODE: 400,
        MESSAGE: 'BAD_REQUEST',
      },
      NOT_AUTHENTICATED: {
        CODE: 401,
        MESSAGE: 'NOT_AUTHENTICATED',
      },
      NOT_AUTHORIZED: {
        CODE: 403,
        MESSAGE: 'NOT_AUTHORIZED',
      },
      NOT_FOUND: {
        CODE: 404,
        MESSAGE: 'NOT_FOUND',
      },
      CONFLICT: {
        CODE: 409,
        MESSAGE: 'CONFLICT',
      },
      UNPROCESSABLE: {
        CODE: 422,
        MESSAGE: 'UNPROCESSABLE',
      },
      INVALID_TOKEN: {
        CODE: 417,
        MESSAGE: 'INVALID_TOKEN',
      },
      ATTEMPT_EXCEEDED: {
        CODE: 429,
        MESSAGE: 'ATTEMPT_EXCEEDED',
      },
      LOCKED: {
        CODE: 423,
        MESSAGE: 'LOCKED',
      },
    },
  },
  onlyUnique: (value, index, self) => {
    return self.indexOf(value) === index
  },
  getRandomColor: () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  },
  camelToSnakeCase: (str) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  },
  camelToNormalCase: (str) => {
    const result = str.replace(/([A-Z])/g, ' $1')
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
    return finalResult
  },
  renameKeys: (obj, newKeys) => {
    const keyValues = Object.keys(obj).map((key) => {
      const newKey = newKeys[key] || key
      return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
  },
  percentageCalc: (num, total) => {
    // console.log(num / total)
    return Math.ceil((num / total) * 100)
  },
  convertToSlug: (Text) => {
    return Text.toLowerCase()
               .replace(/[^\w ]+/g, '')
               .replace(/ +/g, '-');
  }
}

export default helpers
