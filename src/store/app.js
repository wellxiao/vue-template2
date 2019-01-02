/*
 * @Author: wellxiao
 * @Date: 2019-01-02 14:14:46
 * @Description: app状态
 */
export default {
  state: {
    loading: false
  },
  getters: {
    loading ({ loading }) {
      return loading
    }
  },
  mutations: {
    showLoading (state) {
      state.loading = true
    },
    finishLoading (state) {
      state.loading = false
    }
  }
}
