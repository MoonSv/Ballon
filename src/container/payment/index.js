import React from 'react'
import './index.less'
import { Button, Row, Col, Card, Icon, Radio } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { orderUnit, showUnit, payOrder } from '../../redux/unit.redux'
import moment from "moment/moment";

const RadioGroup = Radio.Group;

@withRouter
@connect(
    state=>({
        buyer: state.user.user_id,
        unit_info:state.unit.unit_info,
        unitFacilities: state.unit.unitFacilities,
        orderDetail: state.unit.orderDetail,
    }),
    { showUnit, orderUnit, payOrder }
)
export default class Payment extends React.Component{
    constructor(){
        super();
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            totalPriceL: 0
        }
    }
    onSubmitPayment = () => {
        this.props.payOrder(this.props.orderDetail.order_id);
        this.props.history.push('/viewOrder')

    }
    render(){

        return (
            <div>
                <div className="payment-wrap">
                    <Row gutter={16} >
                        <Col span={11} className="order-detail-wrap">
                            <Card title="Order detail">
                                <div className="showDates">
                                    <Icon type="calendar" theme="outlined" /> {`${this.props.orderDetail.date_start}`.replace(/T.*/, "")} <Icon type="arrow-right" theme="outlined" /> {`${this.props.orderDetail.date_end}`.replace(/T.*/, "")}
                                </div>

                                <hr/>
                                <div className="show-price">
                                    <span style={{float: 'left', fontSize:15, fontWeight:600}}>Total</span><span className="total-price" style={{float: 'right', fontWeight:600, fontSize:15}}>${this.props.orderDetail.price}</span>
                                    <p></p>
                                </div>
                                <hr/>
                                <div style={{padding: '20px 0'}}>
                                    <h3>Flexible — free cancellation</h3>
                                    <span>Cancel within 48 hours of booking to get a full refund. More details</span><span style={{color: '#a61d55'}}>More details</span>
                                </div>
                            </Card>
                        </Col>
                        <Col span={13}>
                            <Card title="Payment Methods">
                                <RadioGroup style={{width:'100%'}} defaultValue={1}>
                                    <Radio style={{display: 'block', padding:'20px 0'}} value={1}><Icon type="idcard" theme="outlined" checked={true}/> Credit Card</Radio>
                                    {/*<hr style={{width: '100%'}}/>*/}
                                    <Radio style={{display: 'block', padding:'20px 0'}} value={2}><Icon type="alipay-circle" theme="outlined" /> Alipay</Radio>

                                </RadioGroup>
                                <Button type="primary" style={{marginTop:10}} onClick={this.onSubmitPayment}>Make Payment</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}