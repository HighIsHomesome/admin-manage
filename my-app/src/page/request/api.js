import request from './request'

// 注册
export const RegisterApi = (params)=>request.post('/user/register',params)
// 登录
export const LoginApi = (params)=>request.post('/user/login',params)
// 获取记账条目
export const GetAccounts = (params)=>request.get('/account/getAccounts?userId='+ params.userId )
// 根据条件获取记账条目
export const GetAccountsByCondition = (params)=>request.post('/account/getAccountsByCondition',params)
// 新增记账条目
export const AddAccount = (params)=>request.post('/account/addAccount',params)