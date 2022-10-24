import React from 'react'
import { Form,NavBar, Input,NumberKeyboard,Cascader,Popup,Calendar,CapsuleTabs,Tabs,Button,Toast } from 'antd-mobile'
import {Category} from  '../customConfig/catConfig'
import './less/todo.less'
import { Tab } from 'antd-mobile/es/components/tabs/tabs'
import {AddAccount} from './request/api'
export default class Todo extends React.Component{
  state={
	  numKeyboardVisiable:false,
	  accountValue:'',
	  categoryVisiable:false,
	  categories:'',
	  dateVisiable:false,
	  dateRange:'',
	  paymethod:'wechat',
	  description:''
  }
  openKeyboard=()=>{
	  this.setState({
		  numKeyboardVisiable:true
	  })
  }
  addAccount=()=>{
	  const {categories} = this.state
	  let category = categories.split(' - ')[0]
	  let subCategory = categories.split(' - ')[1]
	  const {description} = this.state
	  const {dateRange} = this.state
	  const {paymethod} = this.state
	  let userid = localStorage.getItem('userid')
	  const {accountValue} = this.state
	  AddAccount({
		  'type':0,
		  'category':category,
		  'subCategory':subCategory,
		  'description':description,
		  'value':accountValue,
		  'date':dateRange,
		  'pay':paymethod,
		  'userid':userid
	  }).then(res=>{
		  Toast.show({
		  	content: res.msg,
		  }) 
		  if(res.code===200){
			  this.forceUpdate()
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
  render(){
	  return (
	    <>
		  <NavBar onBack={this.back}>新增账单</NavBar>
		  <div className="form">
		  <Form  mode='card'>
	        <Form.Header>新增账单信息</Form.Header>
	        <Form.Item label='消费金额'>
	          <Input placeholder='请输入金额'   onFocus={this.openKeyboard} value={this.state.accountValue}/>
	        </Form.Item>
	        <Form.Item label='账单类别'>
	          <Input placeholder='请选择账单类别'  onFocus={()=>{this.setState({categoryVisiable:true,numKeyboardVisiable:false})}} value={this.state.categories}/>
	        </Form.Item>
	        <Form.Item label='账单日期'>
	          <Input placeholder='请选择账单日期'  onFocus={()=>{this.setState({dateVisiable:true,numKeyboardVisiable:false})}} value={this.state.dateRange}/>
	        </Form.Item>
	        <Form.Item label='账单描述'>
	          <Input placeholder='请输入账单详细描述' onChange={(val)=>{this.setState({description:val})}} value={this.description}/>
	        </Form.Item>
			<Form.Header>付款方式</Form.Header>
	        <Form.Item >
	          <CapsuleTabs ref='paymethod'  defaultActiveKey='wechat' onChange={(val)=>{this.setState({paymethod:val})}}>
	            <CapsuleTabs.Tab  title='微信付' key='wechat' />
	            <CapsuleTabs.Tab  title='支付宝' key='alipay' />
	            <CapsuleTabs.Tab  title='工商卡' key='ICBC' />
			    <CapsuleTabs.Tab  title='农行卡' key='ABC' />
			    <CapsuleTabs.Tab  title='招商卡' key='CMB' />
			  </CapsuleTabs>
			</Form.Item>
			<Form.Header/>
			<Form.Item >
				<Button block color='primary' size='large' onClick={this.addAccount}>
					新增记账
				</Button>
			</Form.Item>
	      </Form>
		  </div>
	      
		   <NumberKeyboard
		          visible={this.state.numKeyboardVisiable}
		          onClose={()=>{this.setState({numKeyboardVisiable:false})}}
				  onDelete={()=>{
					  let {accountValue} = this.state
					  accountValue = accountValue.substring(0,accountValue.length-1)
					  this.setState({
					  	accountValue:accountValue
					  })
				  }}
				  onInput={(val)=>{
					  const {accountValue} = this.state
					  this.setState({
						  accountValue:accountValue+val
					  })
				  }}
		          customKey={['.']}
		          confirmText='确定'
		        />
		   <Cascader
		     options={Category}
		     visible={this.state.categoryVisiable}
		     onClose={() => {
		       this.setState(
		   		{categoryVisiable:false}
		   	)
		     }}
		     value={this.state.value}
		     onConfirm={
		   	  () => {
		   	    this.setState(
		   	  	{categoryVisiable:false})
		     }}
		     onSelect={(val, extend) => {this.setState({categories:val[0] +' - '+ val[1]})}}
		   >
		   </Cascader>
		   <Popup
		     visible={this.state.dateVisiable}
		     onMaskClick={() => {
		   	 this.setState({
		   		dateVisiable:false
		   	})
		     }}
		     bodyStyle={{
				borderTopLeftRadius: '8px',
				borderTopRightRadius: '8px',
				minHeight: '40vh',
		     }}
		   >
		     <Calendar
			  selectionMode='single'
		   	  minPage={{ year: 2021, month: 8 }}
		   	  maxPage={{ year: 2025, month: 12 }}
		   	  onChange={(val)=>{ 
		   		  this.setState({
		   			  dateRange:val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate()
		   		  })
		   	  }}
		   	/>
		   </Popup>
		   
	    </>
	  
  
  )
  }
}