export const BASE_URL = ''
export const TimeOut = 10000

/**
 * 跨域
 */
const MODE = import.meta.env.MODE
export const rabbit_URL = MODE == 'development' ? '/rabbit' : 'http://47.102.117.116:7001/api'
// export const rabbit_URL = 'http://47.102.117.116:7001/api'

// 开发环境请求本地代理，生产环境请求域名
// 开发环境在接口面前自动加上 api，配合 本地代理使用，无需在每个接口前写 /api