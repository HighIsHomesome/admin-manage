import React from "react";
import './less/Search.less';
import { Input } from 'antd';
const {Search} = Input;

export default function means(){
	const search = () =>{
		alert(1)
	}
    return( 
        <div className='search'>
			<div className='search_box'>
				<Search id='search_input' placeholder="请输入工具名称" enterButton="搜索" size="large" onSearch={search}/>
			</div>
		</div>
    )
}