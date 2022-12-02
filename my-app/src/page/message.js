import React, {useEffect, useState} from "react";
import { Pie} from '@ant-design/plots';
import Columns from '../component/Columns'
import {getAccountsSumValueGroupByDate}  from './request/api'
import {
	Grid,
	Toast, NavBar,
} from 'antd-mobile';
import './less/message.less'
import { GetAccounts } from './request/api';
export default function Index(){
	const [start,setStart] = useState("")
	const [end,setEnd] = useState("")
	const [category,setCategory] = useState("")
	const [accountsData,setAccountsData] = useState([]);
	useEffect(()=>{
		console.log(start)
		console.log(end)
		console.log(category)
		getAccountsByDates()
	})
	const getAccountsByDates = () => {
		getAccountsSumValueGroupByDate({
			userId:localStorage.getItem('userid'),
			start:start,
			end:end,
		}).then(resp=>{
			if(resp.code===200){
				setAccountsData(resp.obj)
			}
		})
	}
	const data = [
		{
			type: '分类一',
			value: 27,
		},
		{
			type: '分类二',
			value: 25,
		},
		{
			type: '分类三',
			value: 18,
		},
		{
			type: '分类四',
			value: 15,
		},
		{
			type: '分类五',
			value: 10,
		},
		{
			type: '其他',
			value: 5,
		},
	];
	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		label: {
			type: 'inner',
			offset: '-30%',
			content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 14,
				textAlign: 'center',
			},
		},
		interactions: [
			{
				type: 'element-active',
			},
		],
	};
    return(
		<>
			<NavBar onBack={()=>{
				Toast.show({
					content: '即将跳转上一个页面',
					duration: 1000,
					afterClose:()=>{
						window.history.back(-1);
					}
				})
			}}>分析中心</NavBar>
			<div>
				<Grid columns={3} gap={3}>
					<Grid.Item span={2}>
						<div className='grid-demo-item-block-pie'>
							<Grid columns={2} gap={4}>
								<Grid.Item>
										<input placeholder="开始时间" onInput={(val)=>{
											setStart(start+val.nativeEvent.data)

											console.log(start)
										}} className='grid-demo-item-block-pie-date-left'/>
								</Grid.Item>
								<Grid.Item>

										<input placeholder="结束时间" onChange={(val)=>{
											setEnd(end+val.nativeEvent.data)
										}} className='grid-demo-item-block-pie-date-right'/>

								</Grid.Item>
							</Grid>
						</div>
					</Grid.Item>
					<Grid.Item>
						<div className='grid-demo-item-block-pie'>
							<input placeholder="类别" onChange={(val)=>{
								setCategory(category+val.nativeEvent.data)
							}} className='grid-demo-item-block-pie-date-left'/>
						</div>
					</Grid.Item>
					<Grid.Item>
						<Columns></Columns>

					</Grid.Item>

				</Grid>
			</div>

			<Columns data={accountsData}></Columns>
			<Pie className='pie' {...config} />
		</>
       
    )
}