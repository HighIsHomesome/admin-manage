import { sleep } from 'antd-mobile/es/utils/sleep'
import { GetAccounts } from './request/api';
let count = 0
let item:any = []
export async function mockRequest() {
  if (count >= 1) {
    return []
  }
  count++

  GetAccounts({'userId':'oEQmR5AESPbHS8vtRVSLS2ZSgg0g'}).then((res:any)=>{
	  if(res.code == 200){
		  item = res.obj
	  }
  })
  return item;
}