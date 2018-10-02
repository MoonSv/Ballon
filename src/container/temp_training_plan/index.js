import React from 'react'
import { Menu } from 'antd'
import {NavLink} from 'react-router-dom'
import axios from'axios'


const SubMenu = Menu.SubMenu;



export default class NavLeft extends React.Component{

    componentWillMount(){
        // const menuTreeNode = this.renderMenu(MenuConfig);
        // this.setState({menuTreeNode})

        axios.get('https://www.easy-mock.com/mock/5b7f7a284a96987699e40630/trainPlan').then(
            res=>{
                if(res.code==200){
                    this.setState(res.data)
                }
            }
        )
    }
    // 菜单渲染
    renderMenu = (data)=>{
        return data.map(item => {
            if(item.children){
                return(
                    <SubMenu title={item.typeName} key={item.id}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return (<Menu.Item title={item.typeName} key={item.key} >
                <NavLink to={item.key}>{ item.typeName }</NavLink>
            </Menu.Item>)
        })
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/vport.png" alt="logo"/>
                </div>
                <Menu theme="dark">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}