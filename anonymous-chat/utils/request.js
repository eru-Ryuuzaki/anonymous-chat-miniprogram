import {
  baseUrl
} from '../myconfig.js'
export const request = (options = {
  url,
  method,
  data,
  contentType
}) => {
  let header = {
    'Content-Type': options.contentType || 'application/json; charset=utf-8',
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method: options.method || "GET",
      data: options.data,
      header: header,
      timeout: 10000,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}