import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import app from './app'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const plugins = []
if (debug) plugins.push(createLogger())

export default new Vuex.Store({
  modules: {
    common,
    app
  },
  strict: debug,
  plugins
})
