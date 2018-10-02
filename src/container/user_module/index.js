import React from 'react'
import {Form, Input, Button, message, Icon, Radio, Menu, Upload} from 'antd'
import ProfileMenu from '../../component/profileMenu'
import './index.less'
import { connect } from 'react-redux'
import { updateUser } from "../../redux/user.redux";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(
    state=>state.user,
    {updateUser}
)
class FormUpdateUser extends React.Component{

    constructor(){
        super();
        this.state={
            first_name:'',
            last_name:'',
            address:'',
            phone_number:'',
            gender:'',
        }
    }

    handleOnchange(e){
        let userInfo = this.props.form.getFieldsValue();
        // console.log(userInfo)
        // if(key=='sex'){
        //     console.log('改变了sex')
        //     this.setState({
        //         sex: val
        //     })
        // }
        // if(key=='type'){
        //     console.log('改变了type')
        //     this.setState({
        //         type: val
        //     })
        // }
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    };
    handleSubmit = ()=>{
        this.props.form.validateFields((err, values)=>{
            if(!err){
                console.log('提交更新数据...');
                console.log(this.state);
                this.props.updateUser(this.state);

            }
        })
    };
    render(){

        const { getFieldDecorator } = this.props.form;
        return(

            <div className="profile-wrap">
                <div className="wrap">

                    {this.props.children}

                    <ProfileMenu profilePage="editUser">
                    </ProfileMenu>
                </div>
            </div>
        )
    }
}
export default Form.create()(FormUpdateUser)