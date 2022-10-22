import React, { useState } from 'react'
import { Cascader, Button, Space, Toast } from 'antd-mobile'
import {Category} from '../customConfig/catConfig'

// 渲染所选值
export default function Categorys(props) {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState([])
  return (
    <Space align='center'>
    
      <Cascader
        options={Category}
        visible={props.visible}
        onClose={() => {
          setVisible(false)
        }}
        value={value}
        onConfirm={setValue}
        onSelect={(val, extend) => {
          console.log('onSelect', val, extend.items)
        }}
      >
        {items => {
          if (items.every(item => item === null)) {
            return '未选择'
          } else {
            return items.map(item => item?.label ?? '未选择').join('-')
          }
        }}
      </Cascader>
    </Space>
  )
}
