import React, { CSSProperties,useRef } from 'react'
import { List, Image,Tag,SwipeAction,Dialog,Toast} from 'antd-mobile'
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'
import '../assets/AutoFunction.less'
import {payConfig} from '../customConfig/payConfig'
export default (props) => {
  
  function getPayName(pay){
  	for (const payItem of payConfig) {
  	  if (payItem.payEn === pay) {
  	    return payItem.payCn;
  	  }
  	}
  }
  function getPayColor(pay){
  	for (const payItem of payConfig) {
  	  if (payItem.payEn === pay) {
  	    return payItem.color;
  	  }
  	}
  }
  function rowRenderer({
    index,
    key,
    style,
  }: {
    index: number,
    key: string,
    style: CSSProperties
  }) {
    const item = props.accounts[index]
	//console.log(props.accounts)
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
				<Tag className='tag' round color={getPayColor(item.pay)}>
						  {getPayName(item.pay)}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.description==''?'无描述':item.description}
				</Tag>

			</List.Item>

    )
  }

  return (
    <List header='结合 react-virtualized 实现长列表'>
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => (
          <VirtualizedList
            rowCount={props.accounts.length}
            rowRenderer={rowRenderer}
            width={width}
            height={480}
            rowHeight={60}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </List>
  )
}