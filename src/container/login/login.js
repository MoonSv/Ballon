import React from 'react'
import {Form, Input, Button, message, Icon, Checkbox} from 'antd'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import './index.less'
import {login, delMsg} from './../../redux/user.redux'

const FormItem = Form.Item;

@connect(
    state=>state.user,
    {login, delMsg}
    )
class FormLogin extends React.Component{

    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            history:''
        }
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleSubmit = ()=>{
        this.props.form.validateFields((err, values)=>{
            if(!err){
                this.props.login(this.state);
            }
        })
    };

    showMsg = ()=>{
        if(this.props.msg&&this.props.code===1) {
            message.success(`Welcome, ${this.props.username}`)
        } else if(this.props.msg&&this.props.code===0){
            message.warn(this.props.msg)
        }
    };

    render(){

        const { getFieldDecorator } = this.props.form;
        this.showMsg();
        this.props.delMsg();
        return(
            <div className="login-wrap">
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                {/*{this.props.msg? message.warn(this.props.msg):null}*/}

                <div className="wrap">
                    <Form layout='horizontal' style={{width: 300, margin: "0px auto", backgroundColor: '#577eafde', padding:25, borderRadius: 15}} className="form">
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "please input username"
                                        },
                                        // {
                                        //     min:5, max:10,
                                        //     message: 'length should between 5 - 10'
                                        // },
                                        {
                                            pattern: /^\w+$/g,
                                            message: 'username should begin with letter'
                                        }
                                    ]
                                })(
                                    <Input name="username" prefix={<Icon type='user'></Icon>} placeholder="username" onChange={this.onChange}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                // 这里用来识别formfiled的各项参数名字
                                getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: "please input password"
                                    }]
                                })(
                                    <Input name="password" prefix={<Icon type='lock'></Icon>} type='password' placeholder="password" onChange={this.onChange}/>
                                )
                            }

                        </FormItem>
                        <FormItem style={{float: 'left'}}>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked', // checkbox的初始化
                                    initialValue: true,
                                })(
                                    <Checkbox className="remember-name">remember username</Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}
                                    style={{borderRadius:15, float:'right'}}
                            >Login</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create()(FormLogin)