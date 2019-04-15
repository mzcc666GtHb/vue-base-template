import axios from 'axios'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import {assert} from '@/utils'
import API_CONFIG from '@/api/apiConfig'
import DEFAULT_CONFIG from '@/api/defaultConfig'

import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from './Interceptor'

//baseURL
const BASE_URL = process.env.API_ROOT

//axios 默认配置
const AXIOS_DEFAULT_CONFIG = DEFAULT_CONFIG

let axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 响应拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

const API_DEFAULT_CONFIG = {
  debug: true,
  sep: '/'
}


class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder({
               sep = '|',
               config = {},
               debug = false,
             }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }

  _apiSingleBuilder({
                      namespace,
                      sep = '|',
                      config = {},
                      debug = false,
                    }) {
    config.forEach(api => {
      let {name, method, params, path, baseURL} = api
      let apiname = `${namespace}${sep}${name}`,
        url = path
      debug && assert(name, `${url} :接口name属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)
      Object.defineProperty(this.api, apiname, {
        value(outerParams, outerOptions) {
          let _data = _isEmpty(outerParams) ? params : _assign({}, params, outerParams)
          let _options = baseURL ? {url, baseURL, method} : {url, method}
          return axiosInstance(_normoalize(_assign(_options, outerOptions), _data))
        }
      })
    })
  }
}

function _normoalize(options, data) {
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
