import React from 'react'
import './index.less'
import { Menu, Dropdown, Icon, Avatar, Input, Row, Col, DatePicker, Slider, Button, Switch, Card, Tag, Select } from 'antd'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logout } from "../../redux/user.redux";
import { test_unit, clearRedirect } from '../../redux/unit.redux'
import MultiSearch from './../multiSearch'
import moment from "moment/moment";

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
@withRouter
@connect(
    state => ({
        username:state.user.username,
        user_id: state.user.user_id,
        facilities: state.unit.facilities,
        image: state.user.image,
        searchRedirectTo: state.unit.redirectTo
    }),
    { logout, test_unit, clearRedirect }
)
export default class NavTop extends React.Component{
    constructor(){
        super();
        this.state={
            city:"waterloo",
            check_in: "",
            check_out: "",
            capacity: '',
            price_low: '',
            price_high: '',
            facilities:[],
            tags:[]
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
        // this.props.test_unit(this.state);
    };
    onSubmitSearch = (e) =>{
        console.log('搜索提交信息...');
        console.log(this.state);
        this.props.test_unit(this.state);
        this.props.history.push('/searchResult');
    };
    onChangePrice =(value)=>{
        this.setState({price_low: value[0], price_high: value[1]});
        this.props.test_unit(this.state);
    };
    onChangeFacilities = (value)=>{
        this.setState({facilities:value});
        console.log(this.state);
        this.props.test_unit(this.state);
    };
    onChangeDatePicker = (dates, dateStrings)=>{
        this.setState({check_in:dateStrings[0], check_out:dateStrings[1]});
        this.props.test_unit(this.state);
    };
    onChangeCapacity = (value)=>{
        this.setState({capacity: value});
        this.props.test_unit(this.state);
    };
    getFilters = ()=>{
        let rst = [];
        for(let i=0; i<filters.length; i++){
            rst.push(<Option key={i} value={filters[i][i+1]}>{filters[i][i+1]}</Option>)
            //     if(filters[i][i+1].indexOf(input) > -1){
            //         rst.push(filters[i][i+1])
            //     }
        }

        return rst;
    };
    componentDidMount(){
        this.props.clearRedirect();
    }

    render(){
        console.log(this.props.history);
        // {this.props.searchRedirectTo?this.props.history.push(this.props.searchRedirectTo):null}

        const userMenu = (
            <Menu style={{padding:15}}>
                <NavLink to='/editUser'>
                    <Menu.Item key='0'>
                        <p>Edit Profile</p>
                    </Menu.Item>
                </NavLink>
                <Menu.Divider/>
                <NavLink to='/viewOrder'>
                    <Menu.Item key='1'>
                        <p>View order</p>
                    </Menu.Item>
                </NavLink>
                <Menu.Divider/>
                <Menu.Item key='2' onClick={this.logOut}>
                    <p>Log out</p>
                </Menu.Item>
            </Menu>
        );
        const advancedSearchBar = (
            <div className='search-items'>
                <div className="multiSeach-wrap">
                    <Row>

                        <Col span={5} offset={1} className="datePicker-wrap">
                            <RangePicker
                                size="large"
                                // onChange={(dates, dateStrings)=>{this.setState({check_in:dateStrings[0], check_out:dateStrings[1]})}}
                                onChange={(dates, dateStrings) => this.onChangeDatePicker(dates, dateStrings)}
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Week': [moment(), moment().endOf('week')],
                                    'This Month': [moment(), moment().endOf('month')]
                                }}
                                className="datePicker"
                            >

                            </RangePicker>
                        </Col>

                        <Col span={3} offset={1}>
                            <div className='person'>
                                <Row><h4>Person</h4></Row>
                                <Row>
                                    <Slider
                                        min={1}
                                        max={10}
                                        // onChange={(value)=>{this.setState({capacity: value})}}
                                        onChange={(value) => this.onChangeCapacity(value)}

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
                                        onChange={(value) => {
                                            this.onChangePrice(value)
                                        }}
                                        // onChange={(value)=>{this.setState({price_low: value[0], price_high: value[1]})}}
                                    />
                                </Row>
                            </div>
                        </Col>
                        <Col span={7} offset={1}>
                            <Select
                                size="large"
                                mode="tags"
                                placeholder="filter your like"
                                style={{width: '100%', position: 'relative'}}
                                className="filters"
                                dropdownStyle={{position: 'fixed'}}
                                // onChange={(value)=>{this.setState({facilities:value})}}
                                onChange={(value) => {
                                    this.onChangeFacilities(value)
                                }}
                            >
                                {this.getFilters()}
                            </Select>

                        </Col>
                        <Col span={3}>
                        </Col>
                    </Row>
                </div>
            </div>
        )

        return(
            <div className="ballon-nav">
                {/*{this.props.searchRedirectTo?<Redirect to={this.props.searchRedirectTo}></Redirect>:null}*/}

                <nav className='nav-top'>
                    <NavLink to="/home">
                        <div className="logo">
                            <Icon type='home' className='homeIcon' ></Icon>
                        </div>
                    </NavLink>


                    <a className="search-bar" href="#">
                            <img src="" alt="" className="search"></img>
                        <Input

                            placeholder={"Try Waterloo"}
                            prefix={<Icon type='search'></Icon>}
                            onChange={this.onChangeCity}
                            onPressEnter={this.onSubmitSearch}
                            className="form-input"
                        />

                    </a>
                    {this.props.username?<Dropdown overlay={userMenu} trigger={['click']}>
                        <div className="userInfo">
                            <a><Avatar size="large" src={this.props.image} /></a>

                            {/*<li onClick={this.logOut}><a href="">Log out</a></li>*/}
                            {/*<img src="" alt="avatar"/>*/}
                        </div>
                    </Dropdown>:null}
                    {/*{this.props.username?*/}
                    {/*<Avatar size="large" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbkRJeFCVJkma35FYVR6D-feCjspyV_bSMIW9edSbSKe8ajLW'/>*/}
                    {/*:null}*/}
                    <div className="others">
                        <ul>

                            <NavLink to='/editUnit'>
                            <li><a href="#">Become a host</a></li>
                            </NavLink>
                            <NavLink to='/explore'>
                            <li><a href="#">Explore</a></li>
                            </NavLink>

                            {this.props.username?null:
                                <div>
                                <NavLink to='/register'>
                                    <li className="nav-signup"><a href="#">Sign up</a></li>
                                </NavLink>
                                <NavLink to='/login'>
                                <li className="nav-login"><a href="#">Log in</a></li>
                                </NavLink>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
                {this.props.history.location.pathname=='/searchResult'?advancedSearchBar:null}
                {/*高级搜索框*/}
                {/*<div className='search-items'>*/}
                    {/*<div className="multiSeach-wrap">*/}
                        {/*<Row>*/}

                            {/*<Col span={5} offset={1} className="datePicker-wrap">*/}
                                {/*<RangePicker*/}
                                    {/*size="large"*/}
                                    {/*// onChange={(dates, dateStrings)=>{this.setState({check_in:dateStrings[0], check_out:dateStrings[1]})}}*/}
                                    {/*onChange={(dates, dateStrings)=>this.onChangeDatePicker(dates, dateStrings)}*/}
                                    {/*ranges={{*/}
                                        {/*Today: [moment(), moment()],*/}
                                        {/*'This Week': [moment(), moment().endOf('week')],*/}
                                        {/*'This Month': [moment(), moment().endOf('month')]*/}
                                    {/*}}*/}
                                    {/*className="datePicker"*/}
                                {/*>*/}

                                {/*</RangePicker>*/}
                            {/*</Col>*/}

                            {/*<Col span={3} offset={1}>*/}
                                {/*<div className='person'>*/}
                                    {/*<Row><h4>Person</h4></Row>*/}
                                    {/*<Row>*/}
                                        {/*<Slider*/}
                                            {/*min={1}*/}
                                            {/*max={10}*/}
                                            {/*// onChange={(value)=>{this.setState({capacity: value})}}*/}
                                            {/*onChange={(value)=>this.onChangeCapacity(value)}*/}

                                        {/*/>*/}
                                    {/*</Row>*/}
                                {/*</div>*/}
                            {/*</Col>*/}
                            {/*<Col span={3}>*/}
                                {/*<div className='price'>*/}
                                    {/*<Row><h4>Price</h4></Row>*/}
                                    {/*<Row>*/}
                                        {/*<Slider*/}
                                            {/*range*/}
                                            {/*min={0}*/}
                                            {/*max={1000}*/}
                                            {/*step={1}*/}
                                            {/*defaultValue={[200, 700]}*/}
                                            {/*onChange={(value)=>{this.onChangePrice(value)}}*/}
                                            {/*// onChange={(value)=>{this.setState({price_low: value[0], price_high: value[1]})}}*/}
                                        {/*/>*/}
                                    {/*</Row>*/}
                                {/*</div>*/}
                            {/*</Col>*/}
                            {/*<Col span={7} offset={1}>*/}
                                {/*<Select*/}
                                    {/*size="large"*/}
                                    {/*mode="tags"*/}
                                    {/*placeholder="filter your like"*/}
                                    {/*style={{width:'100%', position:'relative'}}*/}
                                    {/*className="filters"*/}
                                    {/*dropdownStyle={{position:'fixed'}}*/}
                                    {/*// onChange={(value)=>{this.setState({facilities:value})}}*/}
                                    {/*onChange={(value)=>{this.onChangeFacilities(value)}}*/}
                                {/*>*/}
                                    {/*{this.getFilters()}*/}
                                {/*</Select>*/}

                            {/*</Col>*/}
                            {/*<Col span={3}>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}


