import axios from 'axios'

export function request(conf) {
  const instance = axios.create({
    baseURL: 'http://${host}:8090',
    timeout: 5000
  })

  // instance.interceptors.request.use(conf => {
  //   return conf
  // }, err => {
  //   console.log(err)
  // })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(conf)
}
