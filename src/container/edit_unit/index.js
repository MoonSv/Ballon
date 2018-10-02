import React from 'react'
import { Form, Spin, Row, Col, Card, Icon, Drawer, Button, Input, Select, InputNumber, Popconfirm, Upload } from 'antd'
import ProfileMenu from '../../component/profileMenu'
import './index.less'
import {connect} from 'react-redux'
import { getUserUnitList, getFacilities, getCities, deleteUnit, delMsg, showUnit, delUnitInfo, addUnit, updateUnit } from '../../redux/unit.redux'
import {message} from "antd/lib/index";

const { Option } = Select;
const {Meta} = Card;

@connect(
    state => ({
        unitList: state.unit.unitList,
        user_id: state.user.user_id,
        facilities: state.unit.facilities,
        cities: state.unit.cities,
        unit_info: state.unit.unit_info,
        unitFacilities: state.unit.unitFacilities
    }),
    { getUserUnitList, getFacilities, getCities, deleteUnit, delMsg, showUnit, delUnitInfo, addUnit, updateUnit }
)
class EditUnit extends React.Component {

    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            address: '',
            phone_number: '',
            gender: '',
            unitId: ['111', '222', '333'],
            drawer: false,
            addDrawer: false
        }
    }

    onClose = () => {
        this.setState({
            drawer: false,
        });
        this.props.delUnitInfo();
    };
    onAddClose = () => {
        this.setState({
            addDrawer: false,
        });
        this.props.delUnitInfo();
    };

    handleOnchange(e) {
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

    onDeleteUnit = (id)=>{
        this.props.deleteUnit(id);
        // 刷新页面
    }
    showMsg = ()=>{
        if(this.props.msg&&this.props.code===1) {
            message.success(this.props.msg)
        } else if(this.props.msg&&this.props.code===0){
            message.warn(this.props.msg)
        }
    };

    renderUnitList = (data) => {
        // console.log('render收到如下...');
        // console.log(data);
        return data.map(unit => {
            return (
                <Col span={8}>
                    <Card
                        style={{marginBottom: 16}}
                        cover={<img src={unit["image"]} alt="image"/>}
                        // cover={<Icon type='plus'></Icon>}
                        actions={[
                            <Icon type="edit" onClick={() => this.onEditUnit(unit["unit_id"])}/>,
                            <Popconfirm title="Are you sure delete this unit?" onConfirm={()=>this.onDeleteUnit(unit["unit_id"])} okText="Yes" cancelText="No">
                                <Icon type="delete"></Icon>
                            </Popconfirm>

                        ]}
                        // loading={true}
                    >
                        <Meta
                            title={unit["title"]}
                            description={`${unit["city"]}`}
                        />
                    </Card>
                </Col>
            )
        })
    }

    onEditUnit = (id) => {
        console.log(id)
        this.props.showUnit(id)
        this.setState({
            drawer: true,
        });
        // this.props.getUserUnitList(id)
    }
    onAddUnit = () => {
        this.setState({
            addDrawer: true,
        });
    }

    componentWillMount() {
        this.props.getUserUnitList(this.props.user_id); //改成user_id
        this.props.getFacilities();
        this.props.getCities();
        console.log('WillMount');
        console.log(this.props.unitList);
        console.log(this.props.user_id);
    }

    componentDidMount() {
        console.log('DidMount');
        console.log(this.props.unitList);
    }

    renderFilters = (filters)=>{
        let rst = [];
        for(let i=0; i<filters.length; i++){
            rst.push(<Option key={i+1}>{filters[i][i+1]}</Option>)
        }
        return rst;
    }
    renderCities = (cities)=>{
        let rst = [];
        for(let i=0; i<cities.length; i++){
            rst.push(<Option key={i} value={cities[i]}>{cities[i]}</Option>)
        }
        return rst;
    };
    onSubmitEditUnit = ()=>{
        this.props.form.validateFields((err, values)=>{
            if(!err){
                values.owner=this.props.user_id;
                values.unit_id=this.props.unit_info.unit_id;
                console.log('edit的信息...');
                console.log(values);
                this.props.updateUnit(values);
            }
        })
        this.props.delUnitInfo();
        window.location.href = window.location.href;
    }
    onSubmitAddUnit = ()=>{
        this.props.form.validateFields((err, values)=>{
            if(!err){
                values.owner=this.props.user_id;
                console.log('add的信息...');
                console.log(values);
                this.props.addUnit(values);
            }
        })
        this.props.delUnitInfo();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        this.showMsg();
        this.props.delMsg();
        return (

            <div className="profile-wrap">
                {this.props.unitList?null:<Spin/>}

                <Row gutter={16} className="wrap">
                    <Col span={17}>
                        <Row gutter={16}>
                            {this.renderUnitList(this.props.unitList)}
                            {/*<Col span={2} offset={3}>*/}
                                {/*<Button icon='plus' shape='circle' size='large' onClick={this.onAddUnit}></Button>*/}
                            {/*</Col>*/}
                        </Row>
                    </Col>
                    <Col span={4} offset={3}>
                        <ProfileMenu profilePage="editUnit">
                        </ProfileMenu>
                        <Button icon='plus' type='primary' size='large' onClick={this.onAddUnit}>Unit</Button>
                    </Col>
                </Row>


                <Drawer
                    title="Edit Unit"
                    width={720}
                    placement="right"
                    onClose={this.onClose}
                    maskClosable={true}
                    visible={this.state.drawer}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Title">
                                    {getFieldDecorator('title', {
                                        initialValue: this.props.unit_info?this.props.unit_info.title:null,
                                        rules: [{required: true, message: 'please enter unit name'}],
                                    })(<Input placeholder="unit name"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Price">
                                    {getFieldDecorator('price', {
                                        initialValue: this.props.unit_info?this.props.unit_info.price:null,
                                        rules: [{required: true, message: 'please enter price'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            placeholder="price per day"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Address">
                                    {getFieldDecorator('address', {
                                        initialValue: this.props.unit_info?this.props.unit_info.address:null,
                                        rules: [{required: true, message: 'Please enter address'}],
                                    })(
                                        <Input placeholder="address">
                                        </Input>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City">
                                    {getFieldDecorator('city', {
                                        initialValue: this.props.unit_info?this.props.unit_info.city:null,
                                        rules: [{required: true, message: 'Please enter city'}],
                                    })(
                                        <Select showSearch searchPlaceholder="select city">
                                            {this.renderCities(this.props.cities)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Country">
                                    {getFieldDecorator('country', {
                                        initialValue: this.props.unit_info?this.props.unit_info.country:null,
                                        rules: [{required: true, message: 'Please enter country'}],
                                    })(
                                        <Input placeholder="country">
                                        </Input>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Post code">
                                    {getFieldDecorator('post_code', {
                                        initialValue: this.props.unit_info?this.props.unit_info.post_code:null,
                                        rules: [{required: true, message: 'Please enter post code'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            placeholder="post code"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Facilities">
                                    {getFieldDecorator('facilities', {
                                        initialValue: this.props.unit_info?this.props.unitFacilities:null,
                                        rules: [{required: true, message: 'Please enter facilities'}],
                                    })(
                                        <Select
                                            mode="tags"
                                            placeholder="facilities"
                                            style={{width:'100%', position:'relative'}}
                                            className="filters"
                                            dropdownStyle={{position:'fixed'}}
                                            // onChange={(value)=>{this.setState({facilities:value})}}
                                            // onChange={(value)=>{this.onChangeFacilities(value)}}
                                        >
                                            {this.renderFilters(this.props.facilities)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Capacity">
                                    {getFieldDecorator('capacity', {
                                        initialValue: this.props.unit_info?this.props.unit_info.capacity:null,
                                        rules: [{required: true, message: 'Please enter capacity'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            placeholder="capacity"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        initialValue: this.props.unit_info?this.props.unit_info.description:null,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter unit description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={6} placeholder="unit description"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label='Unit Photo'>
                                    {
                                        getFieldDecorator('image', {

                                        })(
                                            <Upload
                                                name='image'
                                                listType='picture-card'
                                                showUploadList={false}
                                                action='/user/edit_image' //
                                            >
                                                <p className='uploadImg'>+</p>
                                            </Upload>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmitEditUnit} type="primary">Submit</Button>
                    </div>
                </Drawer>

                <Drawer
                    title="Add Unit"
                    width={720}
                    placement="right"
                    onClose={this.onAddClose}
                    maskClosable={true}
                    visible={this.state.addDrawer}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Title">
                                    {getFieldDecorator('title', {
                                        initialValue: this.props.unit_info?this.props.unit_info.title:null,
                                        rules: [{required: true, message: 'please enter unit name'}],
                                    })(<Input placeholder="unit name"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Price">
                                    {getFieldDecorator('price', {
                                        initialValue: this.props.unit_info?this.props.unit_info.price:null,
                                        rules: [{required: true, message: 'please enter price'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            placeholder="price per day"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Address">
                                    {getFieldDecorator('address', {
                                        initialValue: this.props.unit_info?this.props.unit_info.address:null,
                                        rules: [{required: true, message: 'Please enter address'}],
                                    })(
                                        <Input placeholder="address">
                                        </Input>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City">
                                    {getFieldDecorator('city', {
                                        initialValue: this.props.unit_info?this.props.unit_info.city:null,
                                        rules: [{required: true, message: 'Please enter city'}],
                                    })(
                                        <Select showSearch searchPlaceholder="select city">
                                            {this.renderCities(this.props.cities)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Country">
                                    {getFieldDecorator('country', {
                                        initialValue: this.props.unit_info?this.props.unit_info.country:null,
                                        rules: [{required: true, message: 'Please enter country'}],
                                    })(
                                        <Input placeholder="country">
                                        </Input>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Post code">
                                    {getFieldDecorator('post_code', {
                                        initialValue: this.props.unit_info?this.props.unit_info.post_code:null,
                                        rules: [{required: true, message: 'Please enter post code'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            placeholder="post code"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Facilities">
                                    {getFieldDecorator('facilities', {
                                        rules: [{required: true, message: 'Please enter facilities'}],
                                    })(
                                        <Select
                                            mode="tags"
                                            placeholder="facilities"
                                            style={{width:'100%', position:'relative'}}
                                            className="filters"
                                            dropdownStyle={{position:'fixed'}}
                                            // onChange={(value)=>{this.setState({facilities:value})}}
                                            // onChange={(value)=>{this.onChangeFacilities(value)}}
                                        >
                                            {this.renderFilters(this.props.facilities)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Capacity">
                                    {getFieldDecorator('capacity', {
                                        initialValue: this.props.unit_info?this.props.unit_info.capacity:null,
                                        rules: [{required: true, message: 'Please enter capacity'}],
                                    })(
                                        <InputNumber
                                            style={{width: '100%'}}
                                            placeholder="capacity"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        initialValue: this.props.unit_info?this.props.unit_info.description:null,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter unit description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={6} placeholder="unit description"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label='Unit Photo'>
                                    {
                                        getFieldDecorator('image', {

                                        })(
                                            <Upload
                                                name='image'
                                                listType='picture-card'
                                                showUploadList={false}
                                                action='/user/edit_image' //
                                            >
                                                <p className='uploadImg'>+</p>
                                            </Upload>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmitAddUnit} type="primary">Submit</Button>
                    </div>
                </Drawer>

            </div>
        )
    }
}
export default Form.create()(EditUnit)