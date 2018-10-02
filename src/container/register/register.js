import React from 'react'
import { Form, Input, Button, message, Icon } from 'antd'
import { Redirect } from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import { register, delMsg } from "../../redux/user.redux";

const FormItem = Form.Item;

@connect(
    state=>state.user,
    {register, delMsg}
)
class FormRegister extends React.Component{

    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            email:''
        }
    }
    handleOnchange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log(this.state)
    };
    handleSubmit = ()=>{
        // console.log(this.state);
        this.props.form.validateFields((err, values)=>{
            if(!err){
                this.props.register(this.state);
            }
        })
    };
    render(){

        const { getFieldDecorator } = this.props.form;
        this.props.delMsg();
        return(
            <div className="signup-wrap">
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect>:null}
                {this.props.msg?message.warn(`${this.props.msg}`):null}
                {/*{}*/}
                <div className="wrap">
                    <Form layout='horizontal' style={{width: 300, margin: "0px auto", backgroundColor: '#577eafde', padding:25, borderRadius: 15}} className="form">


                        <FormItem>
                            {
                                getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "please input your email"
                                        },
                                        {
                                            pattern: /^\w+@.*$/g,
                                            message: 'unrecognized email format'
                                        }
                                    ]
                                })(
                                    <Input name='email' prefix={<Icon type='mail'></Icon>} type='email' placeholder="email" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: "please input password"
                                    }]
                                })(
                                    <Input name='password' prefix={<Icon type='lock'></Icon>} type='password' placeholder="password" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    rules: [{
                                        required: true,
                                        message: "please input username"
                                    }]
                                })(
                                    <Input name='username' prefix={<Icon type='user'></Icon>} placeholder="username" onChange={this.handleOnchange.bind(this)}/>
                                )
                            }

                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}
                                    style={{borderRadius:15, margin:'0 auto'}}
                            >Save</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        )
    }
}
export default Form.create()(FormRegister)