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
// 删除记账条目
export const delAccount = (params)=>request.post('/account/delete/item',params)
// 修改记账条目
export const updateAccount = (params)=>request.post('/account/modify/item',params)
// 获取验证码
export const getCode = (params)=>request.get('/user/getCode?phone='+params.phone)
// 根据手机号登录
export const LoginPhoneApi = (params)=>request.get('/user/phoneLog?phone='+params.phone+'&code='+params.code)
// 共享账号
export const shareAccount = (params)=>request.get('/user/shareAccount?phone='+params.phone)
// 解除共享
export const removeShareAccount = (params)=>request.get('/user/removeShareAccount?phone='+params.phone)
// 根据date区间获取记账条目
export const getAccountsSumValueGroupByDate = (params)=>request.post('/account/getAccountsSumValueGroupByDate',params)
// 根据类目获取记账条目
export const getAccountsSumValueByCategory = (params)=>request.post('/account/getAccountsSumValueByCategory',params)
// 额度设置
export const setQuota = (params)=>request.post('/quota/setQuota',params)
// 获取额度
export const getQuota = (params)=>request.post('/quota/getQuota',params)