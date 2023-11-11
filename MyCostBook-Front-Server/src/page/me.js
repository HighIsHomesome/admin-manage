import React, {useEffect, useState} from "react";
import {Grid, Avatar, Modal, Slider, Input, Toast, NavBar,Tag} from 'antd-mobile'
import './less/me.less'
import {Category} from  '../customConfig/catConfig'
import {shareAccount,removeShareAccount,setQuota} from "./request/api";

export default function Index(){
    let shared = ''
    let removeShared=''
    let map = new Map()
    useEffect(()=>{
        Category.map(item=>{
            map.set(item.value,0)
        })

    })
    // const [share,setShare] = useState("")
    // const [removeShare,setRemoveShare] = useState("")
    const {useNavigate } = require('react-router-dom')
    const navigate = useNavigate()
    return(
        <div>
            <NavBar onBack={()=>{
                Toast.show({
                    content: '即将跳转上一个页面',
                    duration: 1000,
                    afterClose:()=>{
                        window.history.back(-1);
                    }
                })
            }}>个人中心</NavBar>
            <div className="main-header">
                <Grid columns={5} gap={5}>
                    <Grid.Item>
                        <div className="grid-demo-item-block avatar-container">
                            <Avatar className="avatar" src='' />
                        </div>
                    </Grid.Item>
                    <Grid.Item span={4}>
                        <div className="grid-demo-item-block">
                           <div>
                               {localStorage.getItem('username')===null?<a onClick={()=>{
                                   Toast.show({
                                       content: "即将跳转登录页面!",
                                       position: 'middle',
                                   })
                                   setTimeout(() => { navigate('/login') }, 1500);
                               }
                               }>暂未登录,请前往登录！</a>:localStorage.getItem('username')}
                           </div>
                            <div>
                                <span>昵称:</span>
                                <span>{localStorage.getItem('nickname')===null?"暂无昵称":localStorage.getItem('nickname')}</span>
                            </div>
                        </div>

                    </Grid.Item>

                </Grid>
            </div>
           <div className="main-body">
               <Grid columns={1} gap={5}>

                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main">
                           个人信息
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main" onClick={()=>{
                           if(localStorage.getItem('username')===null){
                               Toast.show({
                                   content: "请登录后再试!",
                                   position: 'middle',
                               })
                               return false
                           }
                           Modal.confirm({
                               title: '共享账号',
                               content:
                                   <div>
                                       <Input onChange={(val)=>{
                                                shared = val
                                                console.log(shared)
                                            }
                                       } className="grid-demo-item-block-share" placeholder='请输入用户名' clearable />
                                   </div>,
                               onConfirm: async () => {
                                   console.log(shared)
                                   shareAccount({
                                       phone:shared
                                   }).then((resp)=>{
                                       // if(resp.code===200){
                                       //
                                       // }
                                       Toast.show({
                                           content: resp.msg,
                                           position: 'middle',
                                       })
                                   })

                               },
                           })
                       }}>
                           共享记账
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main" onClick={()=>{
                           if(localStorage.getItem('username')===null){
                               Toast.show({
                                   content: "请登录后再试!",
                                   position: 'middle',
                               })
                               return false
                           }
                           Modal.confirm({
                               title: '解除共享',
                               content:
                                   <div>
                                       <Input onChange={(val)=>{

                                           removeShared = val

                                           console.log(removeShared)
                                       }
                                       } className="grid-demo-item-block-share" placeholder='请输入用户名' clearable />
                                   </div>,
                               onConfirm: async () => {
                                   console.log(removeShared)
                                   removeShareAccount({
                                       phone:removeShared
                                   }).then((resp)=>{
                                       // if(resp.code===200){
                                       //
                                       // }
                                       Toast.show({
                                           content: resp.msg,
                                           position: 'middle',
                                       })
                                   })

                               },
                           })
                       }}>
                           解除共享
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main" onClick={()=>{
                           if(localStorage.getItem('username')===null){
                               Toast.show({
                                   content: "请登录后再试!",
                                   position: 'middle',
                               })
                               return false
                           }
                           Modal.confirm({
                               title: '额度设置',
                               content:
                                   <div>
                                       {Category.map((item,index,index1)=>
                                           <div>
                                               <Tag key={index1} color='#2db7f5'>{item.value}</Tag>
                                               <Slider
                                                   key={index}
                                                   step={100}
                                                   min={0}
                                                   max={3000}
                                                   ticks
                                                   onAfterChange={(value)=>{
                                                       Toast.show(`当前选中值为：${value}`)
                                                       map.set(item.value,value)
                                                   }}
                                               />
                                           </div>
                                       )}
                                   </div>,
                               onConfirm: async () => {
                                   console.log(map)
                                   let obj = Object.create(null)
                                   for(let[k,v] of map){
                                       obj[k] = v
                                   }
                                   console.log(obj)
                                   setQuota({
                                       obj:obj
                                   }).then((resp)=>{
                                       // if(resp.code===200){
                                       //
                                       // }
                                       Toast.show({
                                           content: resp.msg,
                                           position: 'middle',
                                       })
                                   })

                               },
                           })
                       }}>
                           额度设置
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main">
                           敬请期待
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main">
                           敬请期待
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main">
                           敬请期待
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main" onClick={()=>{
                           if(localStorage.getItem('username')===null){
                               Toast.show({
                                   content: "请登录后再试!",
                                   position: 'middle',
                               })
                               return false
                           }
                           localStorage.clear()
                           Toast.show({
                               content: "退出成功,即将跳转登录页面!",
                               position: 'middle',
                           })
                           setTimeout(() => { navigate('/login') }, 1500);
                       }}>
                           退出登录
                       </div>
                   </Grid.Item>
               </Grid>
           </div>

        </div>
    )
}