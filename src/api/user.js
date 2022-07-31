import request from '@/utils/request'

// axios做了封装，post请求 自动加 Content-Type  application/json
// params 查询参数传参：'baseURL+url?name=zs'
// data 请求体传参：请求体当中携带

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeApi = (mobile) => {
  return request({
    // 路径参数 写法
    url: `/v1_0/sms/codes/${mobile}`
  })
}
