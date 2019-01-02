import Vue from 'vue'
import Router from 'vue-router'
import {
  helloWorld
} from './HelloWorld'
import {
  base
} from '@/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes: [{
    path: '/',
    name: 'HelloWorld',
    meta: {
      title: '欢迎世界！'
    },
    component: helloWorld
  }]
})
