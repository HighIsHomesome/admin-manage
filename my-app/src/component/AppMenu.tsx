import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	MenuFoldOutlined,
	SearchOutlined,
	MenuUnfoldOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu,Button } from 'antd';
import { useState } from 'react';
import "../assets/SliderMenu.less"
const { Sider } = Layout;

function getItem(label: any, key: any, icon: any, children: any) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem('工具搜索', '1', <SearchOutlined />, ''),
	getItem('Option 2', '2', <DesktopOutlined />, ''),
	getItem('User', 'SubMenu1', <UserOutlined />, [
		getItem('Tom', '3', '', ''),
		getItem('Bill', '4', '', ''),
		getItem('Alex', '5', '', ''),
	]),
	getItem('Team', 'SubMenu2', <TeamOutlined />, [getItem('Team 1', '6', '', ''), getItem('Team 2', '8', '', '')]),
	getItem('Files', '9', <FileOutlined />, ''),
];



function AppMenu(props: any) {
	// const [collapsed, setCollapsed] = useState(false);
	// const toggleCollapsed = () => {
	// 	setCollapsed(!collapsed);
	// };
	return (
		<Layout
			style={{
				minHeight: '90vh',
			}}
		>
			<Sider collapsed={props.collapsed}>

				<div className="logo" />
				<Button type="primary" onClick={()=>props.toggleCollapsed()} style={{ marginTop: 16 }}>
					{props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
				<Menu theme="dark"  mode="inline" items={items} />
			</Sider>
		</Layout>
	);
};

export default AppMenu;