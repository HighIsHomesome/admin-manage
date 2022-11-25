import React, {useEffect, useState} from "react";
import { Grid,Avatar,Modal,Form,Input,Toast} from 'antd-mobile'
import './less/me.less'
import {shareAccount,removeShareAccount} from "./request/api";


export default function Index(){
    let shared = ''
    let removeShared=''
    const [share,setShare] = useState("")
    const [removeShare,setRemoveShare] = useState("")
    const {useNavigate } = require('react-router-dom')
    const navigate = useNavigate()
    return(
        <div>
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
                               {localStorage.getItem('username')}
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
                       <div className="grid-demo-item-block-main">
                           敬请期待
                       </div>
                   </Grid.Item>
                   <Grid.Item span={3}>
                       <div className="grid-demo-item-block-main" onClick={()=>{
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