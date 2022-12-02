import React, { useState } from 'react'
import Logo from './img/logo.png'
import Title from './img/title.png'
import './less/Login.less'
import { LoginApi } from './request/api';
import {Background} from '../component/Background'
import {
	Form,
	Input,
	Button,
	Dialog,
	NoticeBar,
	Toast,
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
			{/*<div className="background">*/}
			{/*	<Background></Background>*/}
			{/*</div>*/}

			<WarningOnlyDemo />
		</>
	)
}

const WarningOnlyDemo = () => {
	const { Link, useNavigate } = require('react-router-dom')
	const navigate = useNavigate()
	const onFinish = (values: any) => {
		console.log(values)
		LoginApi({
			username: values.username,
			password: values.password
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
				<Form.Item
					name='username'
					label='用户名'
					rules={[{ required: true }, { type: 'string', min: 6 },]}
				>
					<Input placeholder='请输入用户名' />
				</Form.Item>
				<Form.Item
					name='password'
					label='密码'
					rules={[
						{ required: true },
						{ type: 'string', min: 1 },
					]}
				>
					<Input type='password' placeholder='请输入密码' />
				</Form.Item>
				<Form.Item>
					<Link  style={{ textDecoration:'none'}} to="/phoneNumLogin">手机号码登录</Link>
				</Form.Item>
				<Form.Item>
					<Link  style={{ textDecoration:'none'}} to="/register">没有账号？立即注册！</Link>
				</Form.Item>
			</Form>
		</div>

	)
}