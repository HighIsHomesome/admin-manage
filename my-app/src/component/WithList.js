 import React, { FC, useRef } from 'react'
import { Dialog, List, SwipeAction, Toast, Image } from 'antd-mobile'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'

// 配合列表使用
const WithList: FC = (props) => {
	const leftActions: Action[] = [
		{
			key: 'pin',
			text: '置顶',
			color: 'primary',
		},
	]
	const rightActions: Action[] = [
		{
			key: 'unsubscribe',
			text: '取消关注',
			color: 'light',
		},
		{
			key: 'mute',
			text: '免打扰',
			color: 'warning',
		},
		{
			key: 'delete',
			text: '删除',
			color: 'danger',
		},
	]
	const items = props.accounts
	return (
		<List header="记账条目">
			{items.map(item => (
				<SwipeAction
					key={item.id}
					leftActions={leftActions}
					rightActions={rightActions}
				>
					<List.Item prefix={item.category} description={item.date}>{item.subCategory}</List.Item>
					
				</SwipeAction>
			))}
		</List>
	)
}
export default WithList

