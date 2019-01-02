/*
 * @Author: chengfei
 * @Date: 2018-03-12 19:27:46
 */
import Vue from 'vue'
import instance from './instance'
import cookie from './cookie'
import router from '@/router'
const {$toast} = Vue.prototype
const timeStamp = new Date().getTime()

const showLoading = commit => {
  commit('showLoading', null, {
    root: true
  })
}

const finishLoading = commit => {
  commit('finishLoading', null, {
    root: true
  })
}

const fetch = options => {
  const {
    method = 'get', url, data, timeout, responseType, headers = {}
  } = options

  // 当cookie中有token时塞入token
  const openId = cookie.getCookie('openid')
  const Token = cookie.getCookie('centerToken') || cookie.getCookie('X-AuthToken-With') || ''
  if (openId && Token) {
    headers['X-AuthToken-With'] = Token
    headers.openId = openId
  }

  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(url, {
        params: data,
        headers,
        responseType,
        timeout
      })
    case 'delete':
      return instance.delete(url, {
        params: data,
        headers,
        responseType,
        timeout
      })
    case 'post':
      return instance.post(url, data, {
        headers,
        responseType,
        timeout
      })
    case 'put':
      return instance.put(url, data, {
        headers,
        responseType,
        timeout
      })
    case 'patch':
      return instance.patch(url, data, {
        headers,
        timeout
      })
    default:
      return instance(options)
  }
}
/**
 * http
 * @param {*} method
 * @param {*} url
 * @param {*} obj
 * @returns {*} obj 返回参数  { message: '', statusCode: 0, result }
 */
export const request = async ({
  commit,
  responseType,
  ...config
}) => {
  if (commit) showLoading(commit)
  try {
    /* eslint-disable camelcase */
    const {
      data,
      headers
    } = await fetch({ ...config,
      responseType
    })
    if (commit) finishLoading(commit)
    // 兼容下载
    if (responseType && responseType === 'blob') {
      return Promise.resolve({
        result: data,
        headers
      })
    }
    const {
      error_code,
      err_msg
    } = data
    switch (error_code) {
      case 0:
        return Promise.resolve({
          message: err_msg || '',
          statusCode: error_code || 0,
          result: data.data
        })
      case -4:
        $toast('登陆失效')
        console.log('relogin')
        window.mgoNativeClient('reLogin', {})
        return
      case -5:
        router.push(`/cert-entry?channel=ad&timeStamp=${timeStamp}`)
        return
      default:
        const err = new Error(err_msg)
        err.statusCode = error_code
        return Promise.reject(err)
    }
    // if (error_code === 0) {
    // return Promise.resolve({
    //   message: err_msg || '',
    //   statusCode: error_code || 0,
    //   result: data.data
    // })
    // }
    // if (error_code === -5) {
    //  router.push(`/cert-entry?channel=ad&timeStamp=${timeStamp}`)
    //  return
    // }
    // if (error_code !== null && error_code !== 0) {
    // const err = new Error(err_msg)
    // err.statusCode = error_code
    // return Promise.reject(err)
    // }
  } catch (error) {
    if (commit) finishLoading(commit)
    const {
      response
    } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const {
        data,
        statusText
      } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return Promise.reject(
      new Error({
        statusCode,
        message: msg
      })
    )
  }
}
