import React from 'react'
import './index.less'
import { Row, Col, DatePicker, Slider, Menu, Dropdown, Button, Switch, Card, Icon, Input, Tag, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logout } from "../../redux/user.redux";
import {test_unit, updateSearchInfo} from "../../redux/unit.redux";
import moment from 'moment'

const Option = Select.Option;
const { RangePicker } = DatePicker;
const MenuItem = Menu.Item;
const filters =  [{
    "1": "wifi"
}, {
    "2": "park"
}, {
    "3": "24h check-in"
}, {
    "4": "individual bathroom"
}, {
    "5": "pet"
}, {
    "6": "hair drier"
}, {
    "7": "wash machine"
}, {
    "8": "breakfast"
}, {
    "9": "heater"
}, {
    "10": "air-condition"
}, {
    "11": "kitchen"
}, {
    "12": "private kitchen"
}, {
    "13": "smoke"
}, {
    "14": "hot water"
}];


@connect(
    state=>state.unit,
    { test_unit, updateSearchInfo }
)
export default class MultiSearch extends React.Component{
    constructor(){
        super();
        this.state={
            city:"",
            check_in: "",
            check_out: "",
            capacity: 1,
            price_low:200,
            price_high:700,
            facilities:[],
            tags:[],
            visible:false
        }
    }

    logOut = ()=>{
        this.props.logout();
        browserCookie.erase('sessionid');
        if(this.props.isAuth === false){
            console.log('已登出，跳转中...')
            window.location.href = window.location.href;
        }
        // window.location.href = window.location.href;
    }
    onChangeCity = (e) =>{
        this.setState({ city:e.target.value });
    }
    onChangeDate = (date, dateString) =>{
        console.log(dateString[0])
        console.log(dateString[1])
        // this.setState({ check_in:e.target.value });
    }

    onSubmitSearch = () =>{

    }
    handleMenuClick = (e)=> {
        if (e.key === '3') {
            this.setState({ visible: false });
        }
    }
    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    getFilters = ()=>{
        let rst = [];
        for(let i=0; i<filters.length; i++){
            rst.push(<Option key={i} value={filters[i][i+1]}>{filters[i][i+1]}</Option>)
        //     if(filters[i][i+1].indexOf(input) > -1){
        //         rst.push(filters[i][i+1])
        //     }
        }

        return rst;
    }
    handleFilterOnChange = ()=>{
        console.log(123);
    }
    // renderFilterTags = (data)=>{
    //     return data.map(filter=>{
    //         return Tag
    //     })
    // }
    componentDidMount(){
        console.log('didMount')
        {this.props.city?this.setState({city:this.props.city}):null}
    }

    render(){

        const menu = (
            <Menu onClick={this.handleMenuClick} style={{width:400, position:'fixed'}}>
                <MenuItem key="1">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}><h4 className="filterName">Wifi: </h4></Col>
                        <Col span={4}><Switch className="filterSwitch"></Switch></Col>
                    </Row>
                </MenuItem>
                <MenuItem key="2">

                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}><h4 className="filterName">Hot Water: </h4></Col>
                        <Col span={4}><Switch className="filterSwitch"></Switch></Col>
                    </Row>
                </MenuItem>
                <MenuItem key="3">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}><h4 className="filterName">24h check-in</h4></Col>
                        <Col span={4}><Switch className="filterSwitch"></Switch></Col>
                    </Row>
                </MenuItem>
                <MenuItem key="4">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}><h4 className="filterName">Individual bathroom</h4></Col>
                        <Col span={4}><Switch className="filterSwitch"></Switch></Col>
                    </Row>
                </MenuItem>
                <MenuItem key="5">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}><h4 className="filterName">Pet:</h4></Col>
                        <Col span={4}><Switch className="filterSwitch"></Switch></Col>
                    </Row>
                </MenuItem>
            </Menu>
        )

        return(
            <div className="multiSeach-wrap">
                <Row>
                    <Col span={1}></Col>
                    <Col span={5} className="datePicker-wrap">
                        <RangePicker
                            size="large"
                            onChange={(dates, dateStrings)=>{this.setState({check_in:dateStrings[0], check_out:dateStrings[1]})}}
                            ranges={{
                                Today: [moment(), moment()],
                                'This Week': [moment(), moment().endOf('week')],
                                'This Month': [moment(), moment().endOf('month')]
                            }}
                            className="datePicker"
                        >

                        </RangePicker>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <div className='person'>
                            <Row><h4>Person</h4></Row>
                            <Row>
                                <Slider
                                    min={1}
                                    max={10}
                                    onChange={(value)=>{this.setState({capacity: value})}}
                                    // onChange={(value)=>{this.props.updateSearchInfo('capacity', value)}}
                                    updateSearchInfo
                                />
                            </Row>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div className='price'>
                            <Row><h4>Price</h4></Row>
                            <Row>
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    step={1}
                                    defaultValue={[200, 700]}
                                    onChange={(value)=>{this.setState({price_low: value[0], price_high: value[1]})}}
                                />
                            </Row>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7} >
                            <Select
                                size="large"
                                mode="tags"
                                placeholder="filter your like"
                                style={{width:'100%', position:'relative'}}
                                className="filters"
                                dropdownStyle={{position:'fixed'}}
                                onChange={(value)=>{this.setState({facilities:value})}}
                            >
                                {this.getFilters()}
                            </Select>

                    </Col>
                    <Col span={3}>
                    </Col>
                </Row>
            </div>
        )
    }
}


