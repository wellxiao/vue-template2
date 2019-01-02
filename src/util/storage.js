export default {
  setObject(key = '', obj = {}) {
    const objStr = JSON.stringify(obj)
    localStorage.setItem(key, objStr)
  },
  getObject(key = '') {
    const objStr = localStorage.getItem(key)
    return JSON.parse(objStr)
  },
  setSessionObject(key = '', obj = {}) {
    const objStr = JSON.stringify(obj)
    sessionStorage.setItem(key, objStr)
  },
  getSessionObject(key = '') {
    const objStr = sessionStorage.getItem(key)
    return JSON.parse(objStr)
  }
}
