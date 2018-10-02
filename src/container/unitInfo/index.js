import React from 'react'
import './index.less'
import { Modal, Button, Row, Col, Avatar, Icon, DatePicker, Form, InputNumber, message, Input } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { orderUnit, showUnit } from '../../redux/unit.redux'
import moment from "moment/moment";

const { RangePicker } = DatePicker;

@withRouter
@connect(
    state=>({
        buyer: state.user.user_id,
        unit_info:state.unit.unit_info,
        unitFacilities: state.unit.unitFacilities,
        orderDetail: state.unit.orderDetail,
        isOrdered: state.unit.isOrdered
    }),
    { showUnit, orderUnit }
)
class UnitInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            totalPriceL: 0
        }
    }

    componentWillMount(){
        this.props.showUnit(this.props.match.params.unitId)
    }

    renderFacilities(data){
        return data.map(facility=>{
            return (
                <li><Icon type="tag" style={{color: '#99c8e8'}}></Icon>  {facility}</li>
            )
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    onDateChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        let duration = moment.duration(dates[0].diff(dates[1]));
        let days = Math.floor(-duration._milliseconds/1000/3600/24);
        this.setState({
            totalPriceL: days * this.props.unit_info.price,
            date_start: dateStrings[0],
            date_end: dateStrings[1]
        })
    }

    onSubmitOrder = () => {
        this.props.form.validateFields((err, values)=>{
            if(!err){

                let toBackEnd = {};
                toBackEnd["unit_id"] = this.props.unit_info.unit_id;
                toBackEnd["date_start"] = this.state.date_start;
                toBackEnd["date_end"] = this.state.date_end;
                toBackEnd["buyer"] = this.props.buyer;
                toBackEnd["remark"] = values.remark;
                toBackEnd["price"] = this.state.totalPriceL;
                console.log('order信息...')
                console.log(toBackEnd);
                this.setState({
                    visible: false,
                });
                this.props.orderUnit(toBackEnd)
                this.showMsg()
                // console.log(days);
            }
        })
        this.props.history.push(`/payment/${this.props.orderDetail.order_id}`)
    }
    showMsg = ()=>{
        message.config({
            top: 100
        })
        message.success('Successfully Booked for your next travel')
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/*{this.props.isOrdered?this.props.history.push(`/payment/${this.props.orderDetail.order_id}`):null}*/}
                {/*{this.props.isOrdered?<Redirect to={`/payment/${this.props.orderDetail.order_id}`}></Redirect>:null}*/}
                <div className="title-image-top">
                    <Row gutter={16} style={{width:'100%', margin:'0 auto', height: "600px"}} >
                        <Col span={8} className='title-left'>
                            {/*<div style={{width:'100%', height:'700px', backgroundColor:"grey"}}></div>*/}
                            <p style={{textAlign:'center', fontSize:45, padding:'0.8em', marginTop:40}}>{this.props.unit_info.title}</p>
                            <p style={{textAlign:'center', fontSize:35}}>{this.props.unit_info.address}</p>
                            <div className="unit-price">
                                <span style={{fontSize:25}}>${this.props.unit_info.price}</span><span style={{fontSize:15, color:'grey'}}> / NIGHT</span>
                            </div>
                        </Col>
                        <Col span={16} className='image-right'>
                            {/*<img className="unitImage" src="https://cdn.torontolife.com/wp-content/uploads/2017/08/toronto-house-for-sale-53-burnhamthorpe-crescent-1-803x603.jpg" alt="img"/>*/}
                            <img className="unitImage" src={this.props.unit_info.image} alt="img"/>
                        </Col>
                    </Row>
                </div>
                <div className="detail-wrap">
                    <Row gutter={16} style={{padding:30}}>
                        <Col span={13} className="unit-description">
                            <p className="desc">{this.props.unit_info.description}</p>
                            <ul>
                                <li>{this.props.unit_info.capacity} guests</li>
                                <li>2 bedroom</li>
                            </ul>
                        </Col>
                        <Col span={7} offset={4} className="host">
                            <Avatar size='large' icon="user"></Avatar>
                            <p className="host-name">{this.props.unit_info.owner_name}, your host</p>
                            <Button type="primary" style={{borderRadius:5}} onClick={this.showModal}>REQUEST TO BOOK</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row gutter={16} style={{padding:30}}>
                        <p style={{
                            fontSize:16,
                            fontWeight:600
                        }}>Facilities</p>
                        <ul>
                            {this.renderFacilities(this.props.unitFacilities)}
                        </ul>
                    </Row>
                    <Modal title="Book"
                           width={300}
                           visible={this.state.visible}
                           onOk={this.onSubmitOrder}
                           okText="REQUEST TO BOOK"
                           confirmLoading={this.state.confirmLoading}
                           onCancel={this.handleCancel}
                    >
                        <Form>
                            <Form.Item label="Dates">
                                {
                                    getFieldDecorator('dates', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "please input date"
                                            },
                                        ]
                                    })(
                                        <RangePicker
                                            size="large"
                                            // onChange={(dates, dateStrings)=>{this.setState({check_in:dateStrings[0], check_out:dateStrings[1]})}}
                                            // onChange={(dates, dateStrings) => this.onChangeDatePicker(dates, dateStrings)}
                                            ranges={{
                                                Today: [moment(), moment()],
                                                'This Week': [moment(), moment().endOf('week')],
                                                'This Month': [moment(), moment().endOf('month')]
                                            }}
                                            className="datePicker"
                                            onChange={this.onDateChange}
                                        >
                                        </RangePicker>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="Guests">
                                {
                                    getFieldDecorator('guests', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "please input the number of guests"
                                            },
                                        ]
                                    })(
                                        <InputNumber
                                            min={1}
                                            style={{width:'100%'}}
                                        >

                                        </InputNumber>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="Remark">
                                {
                                    getFieldDecorator('remark', {
                                        rules: [

                                        ]
                                    })(
                                        <Input

                                            style={{width:'100%'}}
                                        >

                                        </Input>
                                    )
                                }
                            </Form.Item>
                        </Form>

                        <div className="show-price">
                            <span style={{float: 'left', fontSize:15, fontWeight:600}}>Total</span><span className="total-price" style={{float: 'right', fontWeight:600, fontSize:15}}>${this.state.totalPriceL}</span>
                        </div>
                    </Modal>
                </div>

            </div>
        )
    }
}
export default Form.create()(UnitInfo)