/*
 * @Author: chengfei
 * @Date: 2018-03-12 19:17:25
 */
/* eslint-disable no-mixed-operators */
export default {
  /**
   * 默认时间30天
   * @param {*} key
   * @param {*} value
   */
  setCookie (key, value) {
    const Days = 30
    const exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`
  },
  /**
   *  获取cookie
   * @param {*} key
   */
  getCookie (key) {
    let arr
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`) // 正则匹配
    /* eslint-disable no-cond-assign */
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    }
    return null
  },
  /**
   * 删除cookie
   * @param {*} key
   */
  delCookies (key) {
    const self = this
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = self.getCookie(key)
    if (cval != null) {
      document.cookie = `${key}=${cval};expires=${exp.toGMTString()}`
    }
  },
  /**
   * 存储cookie
   * @param {*} key
   * @param {*} value
   * @param {*} second
   */
  setCookieAndTime (key, value, second) {
    const exp = new Date()
    exp.setTime(exp.getTime() + second * 1000)
    document.cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`
  }
}
