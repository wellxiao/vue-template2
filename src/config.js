/*
 * @Author: MobileGo
 * @Date: 2018-09-15 13:54:24
 * @Description: 配置
 */
/*eslint-disable */
const ENV = process.env.NODE_ENV
let staticUrl, baseURL
const qiniuDomain = 'https://img.mobilemart.cn/'

if (ENV === 'pre') {
  staticUrl = 'https://h5.mobilemart.cn/app-h5-test/'
  baseURL = 'https://test-api.mobilemart.cn'
  base = '/test-driverAd'
  sensorEnv = 'default'
} else if (ENV === 'production') {
  staticUrl = 'https://h5.mobilemart.cn/app-h5/'
  limoUrl = 'https://h5.xiaojubianli.com/limo/'
  baseURL = 'https://api.mobilemart.cn'
  base = '/driverAd'
  sensorEnv = 'production'
} else {
  staticUrl = 'https://h5.mobilemart.cn/app-h5-dev/'
  // staticUrl = `${window.location.origin}#/`
  // baseURL = 'http://api-yapi.mobilemart.cn/mock/75'
  baseURL = 'https://dev-api.mobilemart.cn'
  base = '/dev-driverAd'
  // base = ''
  sensorEnv = 'default'
  s
}
module.exports = {
  // 基础路径
  baseURL,
  //
  base,
  // Url前缀
  preUrlPath: '',
  staticUrl,
  qiniuDomain,
  sensorEnv,
  expirationTime: 60000,
}
