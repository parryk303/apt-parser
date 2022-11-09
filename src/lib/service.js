/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import Helpers from './helper'

export default {
  get: get,
  post: post,
  postV2: postV2,
  put: put,
  putV2: putV2,
  delete: deleteApi,
}

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = 'bearer ' + token
  return config
})

async function get(url, message = false) {
  try {
    const response = await axios.get(Helpers.BASE_URL + url)
    // console.log(response)
    if(message) Helpers.setMessage(response.data.message, response.data.code)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      if(message) Helpers.setMessage(error.response.data.message, error.response.data.code)
    } else {
      if(message) Helpers.setMessage(error.message, error.code)
    }
    return false
  }
}

async function post(url, body, message = false) {
  try {
    const response = await axios.post(Helpers.BASE_URL + url, body)
    console.log(response)
    if(message) Helpers.setMessage(response.data.message, response.data.code)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      if(message) Helpers.setMessage(error.response.data.message, error.response.data.code)
      return error.response.data
    } else {
      if(message) Helpers.setMessage(error.message, error.code)
      return error
    }
  }
}

async function put(url, body, message = false) {
  try {
    const response = await axios.put(Helpers.BASE_URL + url, body)
    // console.log(response)
    if(message) Helpers.setMessage(response.data.message, response.data.code)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      if(message) Helpers.setMessage(error.response.data.message, error.response.data.code)
    } else {
      if(message) Helpers.setMessage(error.message, error.code)
    }
    return false
  }
}

async function deleteApi(url, message = false) {
  try {
    const response = await axios.delete(Helpers.BASE_URL + url)
    // console.log(response)
    if(message) Helpers.setMessage(response.data.message, response.data.code)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      if(message) Helpers.setMessage(error.response.data.message, error.response.data.code)
    } else {
      if(message) Helpers.setMessage(error.message, error.code)
    }
    return false
  }
}

async function postV2(url, body) {
  try {
    const response = await axios.post(Helpers.BASE_URL + url, body)
    return response.data
  } catch (error) {
    console.log('error', error)
    return error.response.data
  }
}

async function putV2(url, body) {
  try {
    const response = await axios.put(Helpers.BASE_URL + url, body)
    return response.data
  } catch (error) {
    console.log('error', error.response)
    return error.response.data
  }
}
