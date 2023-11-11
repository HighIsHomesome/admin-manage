import React, { FC } from 'react'
import { NavBar, TabBar ,SwipeAction,List} from 'antd-mobile'
import {
	Route,
	Routes,
	useNavigate,
	Outlet,
	useLocation,
	
	MemoryRouter as Router,
} from 'react-router-dom'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'
import {
	AppOutline,
	MessageOutline,
	UnorderedListOutline,
	UserOutline,
} from 'antd-mobile-icons'

import "./App.less"

const Bottom: FC = () => {
	const history = useNavigate()
	const location = useLocation()
	const { pathname } = location

	const setRouteActive = (value) => {
		console.log(value)
		history(value)
	}

	const tabs = [
		{
			key: '/home',
			title: '首页',
			icon: <AppOutline />,
		},
		{
			key: '/todo',
			title: '新增记账',
			icon: <UnorderedListOutline />,
		},
		{
			key: '/message',
			title: '统计分析',
			icon: <MessageOutline />,
		},
		{
			key: '/me',
			title: '我的',
			icon: <UserOutline />,
		},
	]

	return (
		<>
			<div className='app'>
				<div className='body'>
					<Outlet></Outlet>
				</div>
				<div className='bottom'>
					<TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
						{tabs.map(item => (
							<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
						))}
					</TabBar>
				</div>
			</div>


		</>
	)
}

export default Bottom