import React from "react";
import {
	Form,
	Input,
	Button,
	Dialog,
	Checkbox,
	Space,
	DatePicker,
	Toast,
} from 'antd-mobile';
import { GetAccounts } from './request/api';
export default function Index(){
    return(
		<> 
			<div>消息</div>
			<Button
			            onClick={() => {
			             GetAccounts({userId:'oEQmR5AESPbHS8vtRVSLS2ZSgg0g'}).then((res:any)=>{
			             	  console.log(res)
			             }).catch(err => console.log(err))
			            }}
			          >
			            Default
			          </Button>
		</>
       
    )
}