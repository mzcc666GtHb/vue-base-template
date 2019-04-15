import Vue from 'vue'
import Router from 'vue-router'
import ROUTES from './routes'
import {routerBeforeEach} from './Interceptor'
const ROUTER_DEFAULT_CONFIG ={
  //路由默认配置项目
}
Vue.use(Router)

//创建实例,注入路由表
let routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes:ROUTES
})

// 注入拦截器
routerInstance.beforeEach(routerBeforeEach)

export default routerInstance
