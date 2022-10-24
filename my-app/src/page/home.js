import React, {Props,useState} from 'react'
import {InfiniteScroll,NavBar,List,SwipeAction,Tag,Form,Input,Cascader,Popup,Calendar,Empty,Toast,Button} from 'antd-mobile'
import {mockRequest} from './mock-request'
import {GetAccountsByCondition,GetAccounts} from './request/api';
import {Action,SwipeActionRef} from 'antd-mobile/es/components/swipe-action'
import AutoFunction from '../component/AutoFunction'
import {payConfig} from '../customConfig/payConfig'
import './less/home.less'
import {Category} from  '../customConfig/catConfig'
import {Link} from "react-router-dom";

export default class Home extends React.Component < {
	navList ? : any
}, {
	accounts ? : any
} > {
	state = {
		accounts: [],
		visiable:false,
		visiable_date:false,
		value:[],
		setValue:[],
		categories:'',
		dateRange:'',
		keyword:'',
		sum:0
	};
	leftActions: Action[] = [
		{
			key: 'pin',
			text: '置顶',
			color: 'primary',
		},
	]
	rightActions: Action[] = [
		{
			key: 'mute',
			text: '修改',
			color: 'warning',
		},
		{
			key: 'delete',
			text: '删除',
			color: 'danger',
		},
	]
	getPayName=(pay)=>{
		for (const payItem of payConfig) {
		  if (payItem.payEn === pay) {
		    return payItem.payCn;
		  }
		}
	}
	getPayColor=(pay)=>{
		for (const payItem of payConfig) {
		  if (payItem.payEn === pay) {
		    return payItem.color;
		  }
		}
	}
	changeCategory=()=>{
		this.setState({
			visiable:true
		})
		console.log("你正在输入。。。。",this.state.visiable)
	}
	changeDateRange=()=>{
		this.setState({
			visiable_date:true
		})
		console.log("你正在输入。。。。",this.state.visiable_date)
	}
	selectCategory=(val, extend) => {
		this.setState({
			categories:val[0] +' - '+ val[1]
		})						
		console.log(this.state.categories)
	}
	// selectDateRange=(val)=>{
	// 	this.setState({
	// 		dateRange:val
	// 	})						
	// 	console.log(this.state.dateRange)
	// }
	componentDidMount(){
		
	}
	componentWillMount() {

		const startDate = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/1'
		const endDate = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/' + new Date().getDate()
		this.setState({dateRange:startDate+' - '+endDate})
		GetAccountsByCondition({
			'startDate':startDate,
			'endDate':endDate,
			'keyword':'',
			'category':'',
			'subCategory':''
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					accounts: res.obj
				},()=>{
					this.getAccountsSumValue()
				})
				console.log('qwe',this.state.accounts)
			}else{
				Toast.show({
					content: res.msg,
				})
			}
		})
	}
	
	getAccountsSumValue=()=>{
		let sum = 0;
		let {accounts} = this.state;
		for(var i = 0; i < accounts.length; i++){
			sum += accounts[i].value
		}
		sum = sum.toFixed(2)
		this.setState({sum:sum})
	}
	
	getAccountsByCondition=()=>{
		console.log(this.state)
		const startDate = this.state.dateRange.split(' - ')[0]
		const endDate = this.state.dateRange.split(' - ')[1]
		const category = this.state.categories.split(' - ')[0]
		const subCategory = this.state.categories.split(' - ')[1]
		const keyword = this.state.keyword
		console.log(this.state,keyword)
		GetAccountsByCondition({
			'startDate':startDate,
			'endDate':endDate,
			'keyword':keyword,
			'category':category,
			'subCategory':subCategory
		}).then((res: any) => {
			console.log('请求状态:',res.code)
			if (res.code === 200) {
				this.setState({
					accounts: res.obj
				},()=>{this.getAccountsSumValue()})
			}else{
				Toast.show({
					content: res.msg,
				})
			}
		})
	}
	back = () =>
	    Toast.show({
	      content: '即将跳转上一个页面',
	      duration: 1000,
	    		afterClose:()=>{
	    			window.history.back(-1);
	    		}
	    })
	render() {
		const {accounts,visiable} = this.state
		console.log(visiable)
		return ( 
			<>	
				<NavBar onBack={this.back}>账单一览</NavBar>
				<div className="accountsHeader" >
					<Form layout='horizontal' mode='card'>
					        
					        <Form.Item label='类别'>
					          <Input placeholder='请选择类别' onFocus={this.changeCategory} value={this.state.categories}/>
							  </Form.Item>
					        <Form.Item label='日期'>
					          <Input placeholder='请选择日期区间' onFocus={this.changeDateRange} value={this.state.dateRange}/>
					        </Form.Item>
							<Form.Item label='关键字'>
							  <Input placeholder='请输入关键字' onChange={(e)=>{
								  this.setState({ keyword: e})
							  }}
							   onEnterPress={(val)=>{
								  this.getAccountsByCondition()
							  }}/>
							</Form.Item>
							<Form.Item label='合计消费'>
								<Input placeholder='请输入内容' value={this.state.sum} readOnly />
							</Form.Item>
							
					        <Form.Header />
					        <Form.Item className="accountsFormItem">
					        	{accounts.length>0?(<AutoFunction className='list_accounts' accounts={accounts} ></AutoFunction>):(
									<div>
										<Empty className='emptyData' description='暂无数据' />
										<Link style={{ textDecoration:'none'}} to="/login">
											<Button size='large' block color='primary' fill='outline'>快去登录吧！</Button>
										</Link>

									</div>)}
					        </Form.Item>
					</Form>
					<Cascader
					  options={Category}
					  visible={this.state.visiable}
					  onClose={() => {
					    this.setState(
							{visiable:false}
						)
					  }}
					  value={this.state.value}
					  onConfirm={
						  () => {
						    this.setState(
						  	{visiable:false},()=>{
								this.getAccountsByCondition()
							})
					  }}
					  onSelect={this.selectCategory}
					>
					</Cascader>
					<Popup
					  visible={this.state.visiable_date}
					  onMaskClick={() => {
						this.setState({
							visiable_date:false
						})
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
						  selectionMode='range'
						  onChange={(val)=>{ 
							  this.setState({
								  dateRange:val[0].getFullYear()+'/'+(val[0].getMonth()+1)+'/'+val[0].getDate()+' - '+
								  val[1].getFullYear()+'/'+(val[1].getMonth()+1)+'/'+val[1].getDate()
							  },()=>{
								this.getAccountsByCondition()})
						  }}
						/>
					</Popup>
				</div>
				
			</>
		);
	}

}
