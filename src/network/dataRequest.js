import {request} from "./request";

export function dataRequest (url, method, token, data=null) {
  let p = 'data';
  if (method === 'get') {
    p = 'params'
  }

  if (data) {
    return request({
      url: url,
      method: method,
      [p]: {
        token: token,
        data: data
      }
    })
  }else {
    return request({
      url: url,
      method: method,
      [p]: {
        token: token
      }
    })
  }

}
