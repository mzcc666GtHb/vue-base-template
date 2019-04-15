# vue-template

> 基于vue-cli的 单页面应用模板

##  启动

1.先安装node.js ,node官网(https://nodejs.org/en/) 建议安装 LTS 版本

2.安装依赖,node安装好之后,在命令行工具中进入根目录,执行`npm install`

3.本地启动,依赖安装完成之后,执行 `npm run dev`,就可以在浏览器中通过localhost访问了,默认端口8080,ip和端口可以在config目录中的index.js中更改

4.打包,执行`npm run build` 会在根目录中生成dist目录,把该文件部署到服务器上就可了


##  目录结构

该模板是基于vue-cli脚手架改造而来,根目录结构保持不变,对于脚手架原有的配置进行了少许调整,下文会对改动的地方进行说明

###  根目录

```
├── build               // 主要是webpack的配置(如果对webpack不熟悉就不需要改动了,基本上都配置好了)
├── config              // 项目配置
├── node_modules        // 依赖文件
├── src                 // 项目核心文件
├── static              //不被webpack打包处理的文件
├──  ...
├──index.html          //index.html如其他html一样，一般只定义一个空的根节点，在main.js里面定义的实例将挂载在根节点下，内容都通过vue组件来填充
└── ...

```

###  config 目录

```
config
├── dev.env.js          // 开发环境配置
├── index.js            // 项目主要配置
├── prod.env.js         // 生产环境配置
```
####  index.js
```
proxyTable: {
      '/api': {
        target: 'http://api.douban.com/v2',
        // secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
```
由于本demo 中调用的是豆瓣的api存在跨域问题 所以在这里进行了配置

比如:我们要调用 '/in_theaters'这个接口,只要在前面加上'/api'就可以了,直接调用'/api/in_theaters'就可以进行跨域访问了

原理是通过浏览器打开页面，当发起请求时：本地服务器的地址（通常是localhost:8080或者127.0.0.1:8080）会收到这个请求，

接下来发现这个请求地址中含有字符串 /api，那么本地服务器会将请求地址变为 http://api.douban.com/v2 （配置地址） +/in_theaters（调用方法处的详细地址）

如果不存在跨域把proxyTable字段中的配置删除或者注释
####  dev.env.js
```
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"测试地址"'
})
```
####  prod.env.js
```
module.exports = {
      NODE_ENV: '"production"',
      API_ROOT: '"正式地址"'
}
```

在这两个文件中我们增加了`API_ROOT`字段 来区分开发环境和生产环境的baseURL,

比如:我们启动本地服务npm run dev 这个时候使用的就是 `测试环境地址`

如果打包 npm run build 使用的就是 `正式环境地址`

注意这里的写法是 两个引号 `' " " '`

###  src 项目核心文件

```
src
├── assets          // 资源目录 图片,样式存放
├── components      // vue组件目录
├── filter          // 全局过滤器
├── plugins         // 所有需要挂载到VUE原型上的插件,由此来安装
├── `router`        // 路由配置
├── `service`       // 请求配置
├── store           // 如果使用vuex 统一放在这里
├── utils           // 工具类
```

#### service 目录
```
service
├── apiConfig.js     // 接口配置
├── axiosConfig.js   // axios 配置封装
├── interceptor.js   // axios 请求拦截器
```
apiConfig.js  对于接口我们按照领域模型抽离,也就是加个命名空间,统一在apiConfig.js管理
```
export default {
  search: [
    {
      name: 'search',
      method: 'GET',
      path: '/movie/search',
      params: {
        '123123': '123123123'
      }
    }
  ],
  filmList: [
    {
      name: 'in_theaters',
      method: 'GET',
      path: '/movie/in_theaters'
    }
  ]
}
```

axiosConfig.js  对axios 进行了封装,增加了拦截器,配置了接口的调用方式,这样更加方便我们调用接口
通过 `plugins/inject.js`挂载到 `Vue 原型`上，

```js
import axios from  '@/service/axiosConfig'

export default {
    install: (Vue, options) => {
        Vue.prototype.$http = axios
        // 需要挂载的都放在这里
    }
}
```

在`业务中`调用方式：

```js
// .vue 中
export default {
    methods: {
        test() {
            this.$http['filmList/in_theaters']({
                a: 1,
                b: 2
            })
        }
    }
}
```
在`业务之外`也可以使用：

```js
import api from '@/service/axiosConfig.js'

api['filmList/in_theaters']({
    a: 1,
    b: 2
})

```
请求拦截器 统一放在Interceptor.js中
```
export function requestSuccessFunc (config) {
  //请求之前可在这里更改默认配置
  alert('请求之前')
  return config
}

export function requestFailFunc (requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  // ...
  return Promise.reject(requestError);
}

export function responseSuccessFunc (responseObj) {
  alert('请求之后')
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // ...
  // 假设我们请求体为
  // {
  //     code: 1010,
  //     msg: 'this is a msg',
  //     data: null
  // }

  let resData =  responseObj.data
  let {code} = resData

  switch(code) {
    case 0: // 如果业务成功，直接进成功回调
      return resData.data;
    case 1111:
      // 如果业务失败，根据不同 code 做不同处理
      // 比如最常见的授权过期跳登录
      // 特定弹窗
      // 跳转特定页面等
      return;
    default:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      return Promise.reject(resData);
  }
}

export function responseFailFunc (responseError) {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  // ...
  return Promise.reject(responseError);
}

```

####  router目录
该目录主要是配置路由,路由表统一管理,全局路由拦截器
index.js 实例化路由,注入路由表

```
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

```
router.js 配置路由表
```
export default [{
  name: "film",
  path: "/",
  component: resolve => require(['@/components/film'], resolve)
}]

```
interceptor.js 全局路由钩子
```
export function routerBeforeEach(to, from, next) {
  //路由全局钩子
  next()
}

```
