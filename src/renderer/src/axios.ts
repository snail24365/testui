import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import './assets/main.css'

export const client = (() => {
  return axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
      Accept: 'application/json, text/plain, */*'
    },
    withCredentials: true
  })
})()

const api = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response
    return data
  }

  const onError = function (error: AxiosError) {
    window.api.Alert(JSON.stringify(error.response?.data as any))

    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
      data: error.response?.data ?? null
    })
  }

  return client(options).then(onSuccess).catch(onError)
}

export default api
