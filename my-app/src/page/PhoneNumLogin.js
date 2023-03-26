import React, {useState, useRef, useEffect} from 'react'
import './less/Login.less'
import { LoginPhoneApi } from './request/api';
import {getCode} from "./request/api";
import {
	Form,
	Input,
	Button,
	Dialog,
	Toast, NoticeBar,
} from 'antd-mobile'
import {Link} from "react-router-dom";

export default () => {

	const [form] = Form.useForm()
	const onSubmit = () => {
		const values = form.getFieldsValue()
		Dialog.alert({
			content: <pre>{JSON.stringify(values, null, 2)}</pre>,
		})
	}

	return (
		<>
			<WarningOnlyDemo />
		</>
	)
}

const WarningOnlyDemo = () => {
	// 验证码倒计时
	let count = 60
	// 手机号
	const [phone,setPhone]=useState("")
	const [block,setBlock]=useState(false)
	const { Link, useNavigate } = require('react-router-dom')
	const navigate = useNavigate()
	const getLabel = useRef(null)

	useEffect(()=>{
		setInterval(()=>{

			if(getLabel.current!=null&&count>0&&block){
				console.log(getLabel.current)
				getLabel.current.innerHTML = "剩余"+count+"秒"
				count=count-1
			}
			if(count===0 && block){

				setBlock(false)
				getLabel.current.innerHTML = "发送验证码"
			}
		},1000)
	})

	const onFinish = (values: any) => {
		console.log(values)
		LoginPhoneApi({
			phone: values.phoneNum,
			code: values.code
		}).then((res: any) => {
			if (res.code === 200) {
				console.log(res.obj.user)
				localStorage.setItem('token',res.obj.tol_token)
				localStorage.setItem('userid',res.obj.user.id)
				localStorage.setItem('username',res.obj.user.username)
				localStorage.setItem('profile_photo',res.obj.user.profile_photo)
				Toast.show({
					content: '登录成功,即将进入主页!',
					afterClose: () => {
						navigate('/home')
					},
				})
				// 跳到登录页面
				setTimeout(() => { navigate('/home') }, 1500);
			} else {
				Toast.show({
					content: res.msg,
				})
			}
		})
	}

	return (

		<div>
			<NoticeBar content='手机号如果未注册则登录操作之后自动注册' color='info' />
			<Form className="loginFormContainer"
				onFinish={onFinish}
				footer={
					<Button block type='submit' color='primary' size='large'>
						登录
					</Button>
				}
			>
				<Form.Header>
					<div id="water">
						<span id="first">爱</span>
						<span id="second">记</span>
						<span id="third">登</span>
						<span id="fourth">录</span>
					</div>
				</Form.Header>
				<Form.Item label='手机号' name='phoneNum'  rules={[{ required: true },{pattern:/^1[3-9]\d{9}$/,message:'手机号格式不正确'}]}>
					<Input placeholder='请输入手机号' onChange={(val)=>{
						setPhone(val)
						console.log(phone)
					}}/>
				</Form.Item>
				<Form.Item  label='短信验证码' extra={<a ref={getLabel} onClick={()=>{
					console.log(phone)
					if(block){
						return false
					}
					getCode({
						'phone':phone
					}).then(resp=>{
						if(resp){
							if(resp.code === 200){

								setBlock(true)
								Toast.show({
									content: "验证码已发送成功,请注意查收!",
								})
							}else{
								Toast.show({
									content: resp.msg,
								})
							}
						}
					})
				}}>发送验证码</a>} name='code' rules={[{ required: true },{pattern:/[0-9]{4}/,message:'验证码格式不正确'}]}>
					<Input placeholder='请输入验证码' />
				</Form.Item>
				<Form.Item>
					<Link  style={{ textDecoration:'none'}} to="/login">账号密码登录</Link>
				</Form.Item>
				<Form.Item>
					<Link  style={{ textDecoration:'none'}} to="/register">没有账号？立即注册！</Link>
				</Form.Item>
			</Form>
		</div>

	)
}