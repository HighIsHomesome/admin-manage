import React, {FC, useRef, useState} from 'react'
import {
	Dialog,
	List,
	SwipeAction,
	Toast,
	Popup,
	Tag,
	NavBar,
	Form,
	Input,
	CapsuleTabs,
	Button,
	NumberKeyboard, Cascader, Calendar
} from 'antd-mobile'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'
import {payConfig} from "../customConfig/payConfig";
import {delAccount,updateAccount} from "../page/request/api"
import {Category} from  '../customConfig/catConfig'


// 配合列表使用
const WithList: FC = (props) => {
	const [visiable,setVisiable] = useState(false)
	const [numKeyboardVisiable,setNumKeyboardVisiable] = useState(false)
	const [accountValue,setAccountValue] = useState(0)
	const [id,setId] = useState(0)
	const [categoryVisiable,setCategoryVisiable] = useState(false)
	const [categories,setCategories] = useState("")
	const [dateVisiable,setDateVisiable] = useState(false)
	const [date,setDate] = useState("")
	const [description,setDescription] = useState("")
	const [paymethod,setPaymethod] = useState("")
	const getPayName=(pay)=>{
		for (const payItem of payConfig) {
			if (payItem.payEn === pay) {
				return payItem.payCn;
			}
		}
	}
	const getPayColor=(pay)=>{
		for (const payItem of payConfig) {
			if (payItem.payEn === pay) {
				return payItem.color;
			}
		}
	}

	const items = props.accounts
	return (
		<div style={{height:"52vh",overflowY:"auto"}}>
			{items.map(item=>(
				<SwipeAction
					key={item.id}

					rightActions={
					[
						{
							key: 'mute',
							text: '修改',
							color: 'warning',
							onClick: async () => {
								setVisiable(true)
								setPaymethod(item.pay)
								setDescription(item.description)
								setDate(item.date)
								setAccountValue(item.value)
								setCategories(item.category+'-'+item.subCategory)
								setId(item.id)
							}
						},
						{
							key: 'delete',
							text: '删除',
							color: 'danger',
							onClick: async () => {
								console.log(item)
								await Dialog.confirm({
									confirmText:'确认删除',
									cancelText:'取消删除',
									content: '是否确认删除！',
									onConfirm: async () => {
										delAccount({
											"id":item.id
										}).then((res)=>{
											console.log(res)
											if(res.code===200){
												setTimeout(() => {
													Toast.show({
														icon: 'success',
														content: '删除成功',
														position: 'middle',
													},
													props.getAccountsByCondition()
													) }, 500);
											}else{
												Toast.show({
														icon: 'fail',
														content: '删除失败,请刷新后再进行删除',
														position: 'middle',
													},

												)
											}
										})
									},
								})
							},
						},
					]}
				>
				<List.Item prefix={item.category}>

					<Tag className='tag' round color='#2db7f5'>
						{item.subCategory}
					</Tag>
					<Tag className='tag' round color='#2db7f5'>
						{item.value}
					</Tag>
					<Tag className='tag' round color='#2db7f5'>
						{item.date}
					</Tag>
					<Tag className='tag' round  color={getPayColor(item.pay)}>
						{getPayName(item.pay)}
					</Tag>
					<Tag className='tag' round color='#2db7f5'>
						{item.description===''?'无描述':item.description}
					</Tag>
				</List.Item>
				</SwipeAction>

			))}
			<Popup
				showCloseButton
				visible={visiable}
				onClose={()=>{
					setVisiable(false)
				}}
				onMaskClick={() => {
					setVisiable(false)
				}}
				position='right'
				bodyStyle={{ width: '100vw',background:'#D3DFEC',height:'90vh' }}
			>
				<div style={{paddingTop: 30 }}>

					<div className="form">
						<Form  mode='card'>
							<Form.Header>修改账单信息</Form.Header>
							<Form.Item label='消费金额'>
								<Input placeholder='请输入金额'  onFocus={()=>{setNumKeyboardVisiable(true)}} value={accountValue}/>
							</Form.Item>
							<Form.Item label='账单类别'>
								<Input placeholder='请选择账单类别'  onFocus={
									()=>{setCategoryVisiable(true);setNumKeyboardVisiable(false)}} value={categories}/>
							</Form.Item>
							<Form.Item label='账单日期'>
								<Input placeholder='请选择账单日期'  onFocus={()=>{setDateVisiable(true);setNumKeyboardVisiable(false)}} value={date}/>
							</Form.Item>
							<Form.Item label='账单描述'>
								<Input placeholder='请输入账单详细描述' onChange={(val)=>{setDescription(val)}} value={description}/>
							</Form.Item>
							<Form.Header>付款方式</Form.Header>
							<Form.Item >
								<CapsuleTabs defaultActiveKey={paymethod} onChange={(val)=>{setPaymethod(val)}}>
									<CapsuleTabs.Tab  title='微信付' key='wechat' />
									<CapsuleTabs.Tab  title='支付宝' key='alipay' />
									<CapsuleTabs.Tab  title='农行卡' key='ABC' />
									<CapsuleTabs.Tab  title='招商卡' key='CMB' />
								</CapsuleTabs>
							</Form.Item>
							<Form.Header/>
							<Form.Item >
								<Button block color='primary' size='large' onClick={()=>{
									updateAccount({
										"id":id,
										"value":accountValue,
										"pay":paymethod,
										"description":description,
										"date":date,
										"category":categories.split("-")[0].replace(' ',''),
										"subCategory":categories.split("-")[1].replace(' ','')
									}).then(resp=>{
										if(resp.code===200){
											setTimeout(() => {
												Toast.show({
														icon: 'success',
														content: '更新成功',
														position: 'middle',
													},
													props.getAccountsByCondition()
												) }, 500);
											setVisiable(false)
										}else{
											Toast.show({
													icon: 'fail',
													content: '修改失败,请刷新后再进行修改',
													position: 'middle',
												},

											)
										}
									})
								}}>
									修改记账信息
								</Button>
							</Form.Item>
						</Form>
						<NumberKeyboard
							visible={numKeyboardVisiable}
							onClose={()=>{setNumKeyboardVisiable(true)}}
							onDelete={()=>{
								setAccountValue(accountValue.substring(0,accountValue.length-1))
							}}
							onInput={(val)=>{
								setAccountValue(accountValue+val)
							}}
							customKey={['.']}
							confirmText='确定'
						/>
						<Cascader
							options={Category}
							visible={categoryVisiable}
							onClose={() => {
								setCategoryVisiable(false)
							}}
							// value={this.state.value}
							onConfirm={
								() => {
									setCategoryVisiable(false)
								}
							}
							onSelect={
								(val, extend) =>
								{
									setCategories(val[0] +' - '+ val[1])
								}
							}
						>
						</Cascader>
						<Popup
							visible={dateVisiable}
							onMaskClick={() => {
								setDateVisiable(false)
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
									setDate(val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate())
								}}
							/>
						</Popup>

					</div>
				</div>

			</Popup>

		</div>

	)
}

export default WithList

