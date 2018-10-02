import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
const MenuItem = Menu.Item;

@connect(
    state=>state.user,
    {}
)
export default class ProfileMenu extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    judgePage(){
        switch (this.state.profilePage){
            case 'editUser':
                return '1';
            case 'editUnit':
                return '2';
        }
    }

    render(){
        return(
            <Menu
                style={{width:300, float:'right'}}
                defaultSelectedKeys={['1']}
            >

                <MenuItem key='1'>
                    <NavLink to='/editUser'>
                        Edit Profile
                    </NavLink>
                </MenuItem>


                <MenuItem key='2'>
                    <NavLink to='/editUnit'>
                        Edit Unit
                    </NavLink>
                </MenuItem>
            </Menu>
        )
    }
}

