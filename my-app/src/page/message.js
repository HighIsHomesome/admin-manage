import React, {useEffect, useState} from "react";
import {Column,Pie,Line} from '@ant-design/plots';
import {getAccountsSumValueGroupByDate,getAccountsSumValueByCategory}  from './request/api'
import {Category} from  '../customConfig/catConfig'
import {
	Grid,
	Toast, NavBar, Cascader, Calendar, Popup, Empty, Dropdown,Radio,Space
} from 'antd-mobile';
import './less/message.less'

export default function Index(){
	const [start,setStart] = useState(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/01')
	const [count,setCount] = useState(0)
	const [end,setEnd] = useState(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate())
	const [category,setCategory] = useState("")
	const [subCategory,setSubCategory] = useState("")
	const [categoryVisiable,setCategoryVisiable] = useState(false)
	const [startDateVisiable,setStartDateVisiable] = useState(false)
	const [endDateVisiable,setEndDateVisiable] = useState(false)
	const [data,setData] = useState([]);
	const [graphical,setGraphical] = useState("default")
	const config = {
		data,
		xField: 'date',
		yField: 'cost',
		xAxis: {
			label: {
				autoRotate: true,
			},
		},
		scrollbar: {
			type: 'horizontal',
		},
	}
	const config2 = {
		data,
		padding: 'auto',
		xField: 'date',
		yField: 'cost',
		xAxis: {
			// type: 'timeCat',
			tickCount: 5,
		},
	};
	const config1 = {
		appendPadding: 10,
		data,
		angleField: 'cost',
		colorField: 'category',
		radius: 0.8,
		label: {
			type: 'outer',
			content: '{name} {percentage}',
			rotate: 10,
			style: {
				opacity: 0.6,
				fontSize: 10
			},
		},
		legend: {
			position: 'top'
		},
		interactions: [
			{
				type: 'pie-legend-active',
			},
			{
				type: 'element-active',
			},
		],
	};
	useEffect(()=>{

		if(new Date(start)>new Date(end)){
			Toast.show({
				content: "开始日期不能大于结束日期！",
			})
		}else if(new Date(start)<new Date(end) && start !== '' && end !== '' && count === 0){
			console.log(graphical)
			if(graphical==='default'){
				getAccountsByDates()
			}else if(graphical==='nearest'){
				if(category==='' && subCategory === ''){
					getAccountsByCategory()
				}else{
					Toast.show({
						content: "饼图不能选择类别！",
					})
				}

			}else{
				getAccountsByDates()
			}

		}

	})
	const getAccountsByCategory = () => {
		getAccountsSumValueByCategory({
			userId:localStorage.getItem('userid'),
			startDate:start,
			endDate:end,
		}).then(resp=>{
			if(resp.code===200 && resp.obj !== null){
				setCount(count+1)
				// for(var i = 0; i < resp.obj.length;i++){
				// 	console.log(resp.obj[i].date.split(' 00:00:00')[0].split('-')[1]+'/'+resp.obj[i].date.split(' 00:00:00')[0].split('-')[2])
				// 	resp.obj[i].date = resp.obj[i].date.split(' 00:00:00')[0].split('-')[1]+'/'+resp.obj[i].date.split(' 00:00:00')[0].split('-')[2]
				// }

			}
			setData(resp.obj)
			console.log(data)
			Toast.show({
				content: resp.msg,
			})
		})
	}
	const getAccountsByDates = () => {
		console.log('category',category)

		getAccountsSumValueGroupByDate({
			userId:localStorage.getItem('userid'),
			startDate:start,
			endDate:end,
			category:category,
			subCategory:subCategory
		}).then(resp=>{
			if(resp.code===200 && resp.obj !== null){
				setCount(count+1)
				for(var i = 0; i < resp.obj.length;i++){
					console.log(resp.obj[i].date.split(' 00:00:00')[0].split('-')[1]+'/'+resp.obj[i].date.split(' 00:00:00')[0].split('-')[2])
					resp.obj[i].date = resp.obj[i].date.split(' 00:00:00')[0].split('-')[1]+'/'+resp.obj[i].date.split(' 00:00:00')[0].split('-')[2]
				}

			}
			setData(resp.obj)
			Toast.show({
				content: resp.msg,
			})
		})
	}

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
			<div className="statistics_content">
				<Grid columns={2} gap={3}>
					<Grid.Item span={2}>
						<div className='grid-demo-item-block-pie'>
							<Grid columns={2} gap={4}>
								<Grid.Item>
										<input placeholder="开始时间" value={start} onFocus={()=>{
											setStartDateVisiable(true)
											setEndDateVisiable(false)
										}} className='grid-demo-item-block-pie-date-left'/>
								</Grid.Item>
								<Grid.Item>

										<input placeholder="结束时间" onFocus={()=>{
											setStartDateVisiable(false)
											setEndDateVisiable(true)

										}} value={end} className='grid-demo-item-block-pie-date-right'/>

								</Grid.Item>
							</Grid>
						</div>
					</Grid.Item>
					<Grid.Item span={2}>

						<Grid columns={2} gap={4}>
							<Grid.Item>
								<div className='grid-demo-item-block-pie'>
									<Dropdown>
										<Dropdown.Item key='sorter' title='统计图' >
											<div style={{ padding: 12 }}>
												<Radio.Group defaultValue='default' onChange={(val)=> {
													setGraphical(val)
													setCount(0)
												}}>
													<Space direction='vertical' block>
														<Radio block value='default'>
															柱形图
														</Radio>
														<Radio block value='nearest'>
															饼图
														</Radio>
														<Radio block value='top-rated'>
															折线图
														</Radio>
													</Space>
												</Radio.Group>
											</div>
										</Dropdown.Item>
									</Dropdown>
								</div>
							</Grid.Item>
							<Grid.Item>
								<div className='grid-demo-item-block-pie grid-demo-item-block-content'>
									<input placeholder="类别" onFocus={()=>{
										setCategoryVisiable(true)
									}} value={category+'-'+subCategory} className='grid-demo-item-block-pie-date-left'/>
								</div>
							</Grid.Item>
						</Grid>

					</Grid.Item>

				</Grid>
				<div style={{marginTop:'8vh'}}>
					{data===null?(<Empty className='emptyData' description='暂无数据' />):(graphical==='default'?<Column {...config} />:graphical==='top-rated'?<Line {...config2} />:<Pie {...config1} />)}
				</div>

			</div>
			<Cascader
				options={Category}
				visible={categoryVisiable}
				onClose={() => {
					setCount(0)
					setCategoryVisiable(false)
				}}
				onSelect={(val)=>{
					if(val[0] === undefined){
						setCategory('')
					}else{
						setCategory(val[0])
					}
					if(val[1] === undefined){
						setSubCategory('')
					}else{
						setSubCategory(val[1])
					}



				}}
			>
			</Cascader>
			<Popup
				visible={startDateVisiable===true?startDateVisiable:endDateVisiable}
				onMaskClick={() => {
					setCount(0)
					if(startDateVisiable){
						setStartDateVisiable(false)
					}
					if(endDateVisiable){
						setEndDateVisiable(false)
					}
				}}
				bodyStyle={{
					borderTopLeftRadius: '8px',
					borderTopRightRadius: '8px',
					minHeight: '40vh',
				}}
			>
				<Calendar
					minPage={{ year: 2021, month: 8 }}
					maxPage={{ year: 2025, month: 12 }}
					selectionMode='single'
					onChange={(val)=>{
						console.log(val)
						if(startDateVisiable && !endDateVisiable){
							setStart(val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate())
						}
						if(!startDateVisiable && endDateVisiable){
							setEnd(val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate())
						}
					}}
				/>
			</Popup>

		</>
       
    )
}