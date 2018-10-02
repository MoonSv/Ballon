import React from 'react'
import { message, Modal } from 'antd'
import { connect } from 'react-redux'
import NavTop from '../../component/navTop'
import Advertisement from '../../component/advertisement'
import LoginForm from './../login/login'
import './index.less'

@connect(
    state=>state.user,
    {}
)
export default class Home extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            loginVisible: false
        }
    }

    render(){
        return(

            <div>
                {/*{this.props.username? message.success(this.props.username):null}*/}
                {/*<NavTop></NavTop>*/}
                <Modal title={null}
                       footer={null}
                       closable={false}
                       visible={this.state.loginVisible}
                       onOk={this.handleLoginOk}
                       onCancel={this.handleLoginCancel}
                       wrapClassName='modal-login'
                >
                    <LoginForm ref="getFormValue"/>
                </Modal>
                    <Advertisement></Advertisement>

            </div>
        )
    }
}