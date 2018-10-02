import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from "../../redux/user.redux";

@withRouter
@connect(
    null,
    {loadData}
)
export default class AuthRoute extends React.Component{
    componentDidMount(){

        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        // console.log(this.props)
        // 获取用户信息

        axios.get('/user/info').then(
            res=>{
                if(res.status == 200) {
                    if(res.data.code==0){
                        // 有登录信息了
                        console.log('有登陆信息，信息为：');
                        console.log(res.data.data)
                        this.props.loadData(res.data.data);
                    }else{
                        console.log('无登录信息');
                        this.props.history.push('/home')
                    }
                }else{
                    console.log('无登录信息');
                    this.props.history.push('/home')
                }
            }
        )
        // 是否登录？
        // 现在的url地址  （login页面是不需要跳转的本身的）
        // 用户的身份
        // 用户是否完善信息(选择头像 个人简介)
    }
    render(){
        return(
            null
        )
    }
}