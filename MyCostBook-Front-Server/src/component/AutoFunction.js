import React, { CSSProperties,useRef } from 'react'
import { List, Image,Tag,SwipeAction,Dialog,Toast} from 'antd-mobile'
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'
import '../assets/AutoFunction.less'
import {payConfig} from '../customConfig/payConfig'
export default class AutoFunction extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			initialClientX: 0,
			finalClientX: 0,
		}
	}

	handleTouchStart(event) {
		console.log(event)
		this.setState({
			initialClientX: event.nativeEvent.touches[0].clientX
		});
	}

	handleTouchMove(event) {
		this.setState({
			finalClientX: event.nativeEvent.touches[0].clientX
		});
	}

	handleTouchEnd() {
		if (this.state.finalClientX < this.state.initialClientX) {
			console.log('swipe left')
		}

		this.setState({
			initialClientX: 0,
			finalClientX: 0
		});
	}
  //在componentDidMount，进行scroll事件的注册，绑定一个函数，让这个函数进行监听处理
   componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, true);
	    // window.addEventListener('scroll', this.handleTouchMove, true);
	    // window.addEventListener('scroll', this.handleTouchEnd, true);
	    // window.addEventListener('scroll', this.handleTouchStart, true);
   }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
	  window.addEventListener('scroll', this.handleScroll, true);
	  // window.addEventListener('scroll', this.handleTouchMove, true);
	  // window.addEventListener('scroll', this.handleTouchEnd, true);
	  // window.addEventListener('scroll', this.handleTouchStart, true);
  }
  
  handleScroll=(event)=>{
  	console.log('开始滚动了')
  }
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
  actions=()=>{
	  console.log('开始拖动了了')
  }
  rowRenderer=({
    index,
    key,
    style,
  }: {
    index: number,
    key: string,
    style: CSSProperties
  })=>{
    const item = this.props.accounts[index]
	console.log(this.props.accounts)
    return (
			  <List.Item
				key={key}
				style={style}
				prefix={
				 item.category
				}
			  >
				<Tag className='tag' round color='#2db7f5'>
						  {item.subCategory}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.value}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.date}
				</Tag>
				<Tag className='tag' round color={this.getPayColor(item.pay)}>
						  {this.getPayName(item.pay)}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.description==''?'无描述':item.description}
				</Tag>

			</List.Item>
    )
  }
  render(){
	  return (
	    <List header='账单列表'>
	      <AutoSizer disableHeight>
	        {({ width }: { width: number }) => (
	          <VirtualizedList
	            rowCount={this.props.accounts.length}
	            rowRenderer={this.rowRenderer}
	            width={width}
	            height={520}
	            rowHeight={65}
	            overscanRowCount={10}
	          />
	        )}
	      </AutoSizer>
	    </List>
	  )
  }
  
}