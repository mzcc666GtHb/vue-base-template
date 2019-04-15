
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
