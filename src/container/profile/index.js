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
                    <Form layout='horizontal' style={{width:700,float:'left', padding:20, border:'1px solid grey', borderRadius: 15, marginLeft:30}} className="form">
                        {this.props.msg?message.warn(`${this.props.msg}`):null}

                        <FormItem label="First Name">
                            {
                                getFieldDecorator('first_name', {
                                    initialValue: this.props.first_name?this.props.first_name:null,
                                })(
                                    <Input name='first_name' prefix={<Icon type='edit'></Icon>} type='text' placeholder='first name' onChange={this.handleOnchange.bind(this)}/>
                                )
                            }
                        </FormItem>
                        <FormItem label="Last Name">
                            {
                                getFieldDecorator('last_name', {
                                    initialValue: this.props.last_name?this.props.last_name:null
                                })(
                                    <Input name='last_name' prefix={<Icon type='edit'></Icon>} type='text' placeholder="last name" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }

                        </FormItem>
                        <FormItem label="WHere You Live">
                            {
                                getFieldDecorator('address', {
                                    initialValue: this.props.address?this.props.address:null
                                })(
                                    <Input name='address' prefix={<Icon type='home'></Icon>} placeholder="address" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }
                        </FormItem>
                        <FormItem label="Phone Number">
                            {
                                getFieldDecorator('phone_number', {
                                    initialValue: this.props.phone_number?this.props.phone_number:null
                                })(
                                    <Input name='phone_number' prefix={<Icon type='phone'></Icon>} type='number' placeholder="phone number" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='Gender'>
                            {
                                getFieldDecorator('gender', {

                                })(
                                    <RadioGroup name='gender' onChange={this.handleOnchange.bind(this)} >
                                    <Radio value="1" >male</Radio>
                                    <Radio value="2" >female</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='User Photo'>
                            {
                                getFieldDecorator('image', {

                                })(
                                    <Upload
                                        name='image'
                                        listType='picture-card'
                                        showUploadList={false}
                                        action='/user/edit_image/'
                                    >
                                        <p className='uploadImg'>+</p>
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}
                                    style={{borderRadius:15, margin:'0 auto'}}
                            >Submit</Button>
                        </FormItem>
                    </Form>
                    <ProfileMenu profilePage="editUser">

                    </ProfileMenu>
                </div>
            </div>
        )
    }
}
export default Form.create()(FormUpdateUser)