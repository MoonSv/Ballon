import React from 'react'
import './index.less'
import { Card, Row, Col, Icon, message, Tabs } from 'antd'
import { connect } from 'react-redux'
import { orderUnit, showUnit, showOrders } from '../../redux/unit.redux'

const TabPane = Tabs.TabPane;

@connect(
    state=>({
        user_id: state.user.user_id,
        payedOrders: state.unit.payedOrders,
        canceledOrders: state.unit.canceledOrders
    }),
    { showUnit, orderUnit, showOrders }
)
export default class ViewOrder extends React.Component{
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
        this.props.showOrders(this.props.user_id)

    }

    renderOrders = (data) => {
        return data.map(order=> {
            return (
                <Col span={8}>
                    <Card
                        title="Order detail"
                        style={{margin:'10px 0', width:300}}
                        // cover={<img src={order.unit_image} alt=""/>}
                        cover={<img src="http://164.52.34.210:8000/media/upload/50.jpg" alt=""/>}
                    >
                        <div className="showDates">
                            <Icon type="calendar" theme="outlined" /> {`${order.date_start}`.replace(/T.*/, "")} <Icon type="arrow-right" theme="outlined" /> {`${order.date_end}`.replace(/T.*/, "")}
                        </div>

                        <hr/>
                        <div className="show-price">
                            <span style={{float: 'left', fontSize:15, fontWeight:600}}>Total</span><span className="total-price" style={{float: 'right', fontWeight:600, fontSize:15}}>${order.price}</span>
                            <p></p>
                        </div>
                        <hr/>
                        <div style={{padding: '20px 0 0 0'}}>
                            <h3>Remark</h3>
                            <span>{order.remark}</span>
                        </div>
                    </Card>
                </Col>

            )
        })
    }

    showMsg = ()=>{
        message.config({
            top: 100
        })
        message.success('Successfully Booked for your next travel')
    }

    render(){
        return (
            <div className="show-order-wrap">
                <Row gutter={16}>
                    {/*<Col span={12}>*/}
                        {/*<h2>Payed Order:</h2>*/}
                        {/*{this.renderOrders(this.props.payedOrders)}*/}
                    {/*</Col>*/}
                    {/*<Col span={12}>*/}
                        {/*<h2>Canceled Order:</h2>*/}
                        {/*/!*{this.props.canceledOrders!==[]?this.renderOrders(this.props.canceledOrders): <p>No Data</p>  }*!/*/}
                        {/*{this.props.canceledOrders.length!=0?this.renderOrders(this.props.canceledOrders): <p>No Data</p>  }*/}
                    {/*</Col>*/}
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Payed Order" key="1">
                            <Row gutter={16}>
                                {this.props.payedOrders.length!=0?this.renderOrders(this.props.payedOrders):
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Card
                                                style={{margin:'10px 0', width:300}}
                                                loading={true}
                                            >
                                            </Card>
                                        </Col><Col span={8}>
                                        <Card
                                            style={{margin:'10px 0', width:300}}
                                            loading={true}
                                        >
                                        </Card>
                                    </Col><Col span={8}>
                                        <Card
                                            style={{margin:'10px 0', width:300}}
                                            loading={true}
                                        >
                                        </Card>
                                    </Col>
                                    </Row>
                                }
                            </Row>
                            </TabPane>
                        <TabPane tab="Canceled Order" key="2">
                            <Row gutter={16}>
                                {this.props.canceledOrders.length!=0?this.renderOrders(this.props.canceledOrders): <p>No Data</p>  }
                            </Row>
                        </TabPane>
                        <TabPane tab="Waited Order" key="3">
                            <Row gutter={16}>
                                {this.props.canceledOrders.length!=0?this.renderOrders(this.props.canceledOrders): <p>No Data</p>  }
                            </Row>
                        </TabPane>
                        <TabPane tab="Finished Order" key="4">
                            <Row gutter={16}>
                                {this.props.canceledOrders.length!=0?this.renderOrders(this.props.canceledOrders): <p>No Data</p>  }
                            </Row>
                        </TabPane>
                    </Tabs>
                </Row>
            </div>
        )
    }
}
