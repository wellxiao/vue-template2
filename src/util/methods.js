import Clipboard from 'clipboard'
import Vue from 'vue'
import cookie from '@/util/cookie'
// import router from '@/router'
import {
  staticUrl
} from '@/config'

const {
  $toast
} = Vue.prototype
/**
 * sessionStorage
 * @param {*} key
 * @param {*} value
 */
export const session = (key, value) => {
  /* eslint-disable no-void */
  if (value === void 0) {
    const lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    }
    return lsVal
  }
  if (typeof value === 'object' || Array.isArray(value)) {
    value = `autostringify-${JSON.stringify(value)}`
  }
  return sessionStorage.setItem(key, value)
}

/**
 * 生成随机数
 * @param {*} len
 */
export const getUUID = len => {
  len = len || 6
  len = parseInt(len, 10)
  len = isNaN(len) ? 6 : len
  const seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
  const seedLen = seed.length - 1
  let uuid = ''
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)]
  }
  return uuid
}
/**
 * 深拷贝
 * @param {*} source
 */
export const deepcopy = source => {
  if (!source) {
    return source
  }
  const sourceCopy = source instanceof Array ? [] : {}
  /* eslint-disable */
  for (const item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

/**
 * 页面刷新
 */
export const updateUrl = (url, key) => {
  var key = (key || 't') + '='; //默认是"t"
  var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028
  var timestamp = +new Date();
  if (url.indexOf(key) > -1) { //有时间戳，直接更新
    return url.replace(reg, key + timestamp);
  } else { //没有时间戳，加上时间戳
    if (url.indexOf('\?') > -1) {
      var urlArr = url.split('\?');
      if (urlArr[1]) {
        return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
      } else {
        return urlArr[0] + '?' + key + timestamp;
      }
    } else {
      if (url.indexOf('#') > -1) {
        return url.split('#')[0] + '?' + key + timestamp + location.hash;
      } else {
        return url + '?' + key + timestamp;
      }
    }
  }
}

/**
 * ajax错误处理
 * @param {*} error
 */
export const catchError = async (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        $toast({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error',
        })
        const {
          isDidi,
          isApp,
          isWeixin
        } = environment()
        cookie.delCookies('wx_openId')
        cookie.delCookies('wx_code')
        if (isDidi) {
          window.location.href = 'didiudriver://'
        }
        if (isApp) {
          window.location.href = 'www.h5.xiaojubianli.com://'
        }
        if (isWeixin) {
          window.location.href = updateUrl(staticUrl)
        }
        break
      default:
        $toast({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error',
        })
    }
  }
  return Promise.reject(error)
}

/**
 *  从url中截取参数
 */
const getQueryStringFromHash = name => {
  var after = window.location.hash.split('?')[1]
  if (after) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
}

/**
 *  从url中截取参数
 */
const getQueryStringFromSearch = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
/**
 * 从url获取参数
 * @param {*} name
 */
export const getQueryString = name => {
  let param
  param = getQueryStringFromHash(name)
  if (!param || param == null) {
    param = getQueryStringFromSearch(name)
  }
  return param
}

/**
 *  正则表达式校验手机号 1开头11位数
 */
export const checkMobile = mobile => {
  // 获取需要打印的内容
  const reg = /^1[0-9]{10}$/
  return reg.test(mobile)
}

/**
 *  获取n天前0点时间戳
 */
export const getNdaysAgoTimeStamp = n => {
  const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
  const minuend = 86400 * 1000 * n
  return timeStamp - minuend
}

/**
 *  下载文件
 */
export const createAFordownLoad = (fileName, steam) => {
  if (!steam) {
    return
  }
  let url = window.URL.createObjectURL(new Blob([steam]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}

const isDev = process.env.NODE_ENV === 'development'
/**
 * 日志打印
 * @param {*} level 日志等级 默认为 log
 * @description 与原生功能一致
 * @example logger('error', 'a的值：', 2, 'b的值：', 3)
 */
export const logger = (level, ...record) => {
  if (!isDev) {
    return
  }
  if (console.hasOwnProperty(level)) {
    console[level](...record)
  } else {
    console.log(level, ...record)
  }
}

// 格式化请求参数
const parseParams = function (obj) {
  var str = ''
  Object.keys(obj).map(function (key) {
    if (obj[key]) {
      str += '&' + key + '=' + obj[key]
    }
  })
  return str.substring(1)
}

/**
 *  复制内容到剪贴板
 * @param className
 * @param success
 * @param fail
 * @constructor
 */
export const clipboard = (className, success, fail) => {
  let clipboard = new Clipboard(className)
  clipboard.on('success', function (e) {
    e.clearSelection()
    typeof success == 'function' && success()
    $toast({
      message: '已复制到剪贴板',
    })
  })
  clipboard.on('error', function (e) {
    typeof fail == 'function' && fail()
    $toast({
      message: '复制失败',
    })
  })
}

/**
 *  环境
 */
export const environment = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isAndroid = userAgent.indexOf('android') != -1
  const isIos = userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipad') != -1
  const isWeixin = userAgent.indexOf('micromessenger') != -1
  const isDidi = userAgent.indexOf('didi') != -1 || userAgent.indexOf('ddudriver') != -1
  const isApp = userAgent.indexOf('mgoapp') != -1
  return {
    isAndroid,
    isIos,
    isWeixin,
    isDidi,
    isApp,
  }
}

/**
 * 载入script
 * @param {*} src
 * @param {*} cb
 */
export const loadScript = (src, cb) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.charset = 'utf-8'
  // 异步载入
  script.async = true
  script.onload = () => {
    typeof cb === 'function' && cb()
  }
  script.src = src
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
}

export const isAuthority = () => {
  const token = cookie.getCookie('centerToken')
  const openId = cookie.getCookie('openid')
  if (token && openId) {
    return true
  }
  return false
}


export const urlQueryObject = (fullUrl) => {
  if (!fullUrl) {
    throw new Error('variable fullUrl required but not set')
  }
  const [ url, query ] = fullUrl.split('?')
  const result = {
    url: null,
    queryObj: {}
  }
  if (url) {
    result.url = url
  }
  if (query) {
    const mapStrAry = query.split('&')
    for (let i = 0; i < mapStrAry.length; i++) {
      const mapStr = mapStrAry[i]
      if (mapStr) {
        const [ key, value = null ] = mapStr.split('=')
        const { queryObj } = result
        if (key) {
          queryObj[key] = value
        }
      }
    }
  }
  return result
}

/**
 * @function
 * @param {*} pathUrl
 * @param {*} name
 * @description 获取url参数
 */
export const getQueryStrings = (pathUrl, name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const pathUrls = decodeURIComponent(pathUrl)
  const r = pathUrls
    .slice(pathUrls.indexOf('?'))
    .substr(1)
    .match(reg)
  if (r != null) return unescape(r[2])
  return null
}
