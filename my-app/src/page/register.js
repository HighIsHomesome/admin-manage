import React, { useState } from 'react'
import Logo from './img/logo.png'
import Title from './img/title.png'
import './less/Login.less'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterApi } from './request/api';
import {
	Form,
	Input,
	Button,
	Dialog,
	Checkbox,
	Space,
	DatePicker,
	Toast,
} from 'antd-mobile'

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
	const navigate = useNavigate()
	const onFinish = (values) => {
		console.log(values)
		RegisterApi({
			username: values.username,
			password: values.password
		}).then((res) => {
			if (res.code === 200) {
				Toast.show({
					content: '注册成功,即将进入登录页面!',
					afterClose: () => {
						navigate('/login')
					},
				})
			} else {
				Toast.show({
					content: res.msg,
				})
			}
		})
	}

	return (
		<Form
			onFinish={onFinish}
			footer={
				<Button block type='submit' color='primary' size='large'>
					注册
				</Button>
			}
		>
			<Form.Header>
				<div id="water">
					<div id="water">
						<span id="first">爱</span>
						<span id="second">记</span>
						<span id="third">注</span>
						<span id="fourth">册</span>
					</div>
				</div>
			</Form.Header>
			<Form.Item
				name='username'
				label='用户名'
				rules={[
					{ required: true },
					{ type: 'string', min: 6 },
				]}
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
				<Input placeholder='请输入密码' />
			</Form.Item>
			<Form.Item
			    name="confirm"
				label='请再次输入密码'
			    dependencies={['password']}
			    hasFeedback
			    rules={[
			        {
			            required: true,
			            message: '请再次输入密码!',
			        },
			        ({ getFieldValue }) => ({
			            validator(_, value) {
			                if (!value || getFieldValue('password') === value) {
			                    return Promise.resolve();
			                }
			                return Promise.reject(new Error('密码输入不一致,请重新输入!'));
			            },
			        }),
			    ]}
			>
			    <Input placeholder='请再次输入密码' 
			                    type="password"/>
			</Form.Item>
			<Form.Item>
				<Link  style={{ textDecoration:'none'}} to="/login">已有账号？立即登录！</Link>
			</Form.Item>
		</Form>
	)
}