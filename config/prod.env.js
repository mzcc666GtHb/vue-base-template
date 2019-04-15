'use strict'
const buildType = process.argv.slice(2)[0]
console.log('-----------start build buildType---------' + buildType)

let envUrl
switch (buildType) {
  case 'test':
    envUrl = '"测试环境地址"'
    break
  case 'qas':
    envUrl = '"准生产环境地址"'
    break
  case 'pro':
    envUrl = '"正式环境地址"'
    break
  default:
    envUrl = '"测试环境地址"'
}

module.exports = {
  NODE_ENV: '"development"',
  API_ROOT: envUrl
}
