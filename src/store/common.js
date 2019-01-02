import {
  picTokenUrl,
  uploadUrl
} from '@/api/common'
import {
  request
} from '@/util/request'

import axios from 'axios'
import Vue from 'vue'
const {
  $toast
} = Vue.prototype

export default {
  state: {},
  getters: {},
  actions: {
    /**
     * 获取七牛云上传图片token
     */
    async getTokenFn ({
      commit
    }) {
      try {
        const {
          result
        } = await request({
          url: picTokenUrl,
          data: {}
        })
        return Promise.resolve(result)
      } catch ({
        message
      }) {
        $toast(message)
        return Promise.reject(message)
      }
    },
    /**
     * 上传图片
     */
    async uploadImgFn ({
      commit
    }, params) {
      try {
        const data = axios.post(uploadUrl, params)
        return Promise.resolve(data)
      } catch (e) {
        $toast(e)
        // Vue.$vux.toast.text(e, 'middle')
        return Promise.reject(e)
      }
    }
  },
  mutations: {

  }
}
