import React from 'react'
import { Button, Space } from 'antd-mobile'

export default () => {
  return (
    <>

        <Space wrap>
          <Button color='primary' fill='solid'>
            Solid
          </Button>
          <Button color='primary' fill='outline'>
            Outline
          </Button>
          <Button color='primary' fill='none'>
            None
          </Button>
        </Space>


        <Button block color='primary' size='large'>
          Block Button
        </Button>



        <Space wrap align='center'>
          <Button size='mini' color='primary'>
            Mini
          </Button>
          <Button size='small' color='primary'>
            Small
          </Button>
          <Button size='middle' color='primary'>
            Middle
          </Button>
          <Button size='large' color='primary'>
            Large
          </Button>
        </Space>



        <Space wrap>
          <Button
            onClick={() => {
              alert('hello.')
            }}
          >
            Default
          </Button>
          <Button color='primary'>Primary</Button>
          <Button color='success'>Success</Button>
          <Button color='danger'>Danger</Button>
          <Button color='warning'>Warning</Button>
        </Space>

    </>
  )
}