import React from 'react'
import { Form, Card, Input, Button, message, Popconfirm, Icon, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import './index.less'
import {login, delMsg} from './../../redux/user.redux'

const FormItem = Form.Item;
const {Meta} = Card;
@connect(
    state => ({
        searchResult: state.unit.searchResult
    }),
    {login, delMsg}
)
 export default class SearchResult extends React.Component{

    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            history:''
        }
    }

    renderSearchResult = (data) => {
        return data.map(unit=>{
            return (
                <Col span={6}>
                    {/*<Card*/}
                        {/*style={{marginBottom: 16}}*/}
                        {/*cover={<img src={unit["image"]} alt="image"/>}*/}
                        {/*// cover={<Icon type='plus'></Icon>}*/}
                        {/*actions={[*/}

                            {/*<Button type='primary' size='large'>Book</Button>*/}

                        {/*]}*/}
                        {/*// loading={true}*/}
                    {/*>*/}
                        {/*<Meta*/}
                            {/*title={unit["title"]}*/}
                            {/*title={`$${unit["price"]}`}*/}
                            {/*description={[`${unit["city"]}`, `$${unit["price"]}`]}*/}
                        {/*/>*/}
                    {/*</Card>*/}
                    <div className="home">
                        {/*<a href="javascript:void(0);" className="content">*/}
                            <NavLink to={`unitInfo/${unit["unit_id"]}`} className="content">
                                {/*<div className="photo"></div>*/}
                                {/*<img src="http://164.52.34.210:8000/media/upload/50.jpg" alt="img" style={{width:'100%',height: 185}}/>*/}
                                <img src={unit["image"]} alt="img" style={{width:'100%',height: 185}}/>
                                <article>
                                    <div className="home-location">{unit["city"]}</div>
                                    <div className="home-name">{unit["title"]}</div>
                                    <div className="home-price">${unit["price"]}
                                        · Free cancellation
                                    </div>
                                </article>
                            </NavLink>

                        {/*</a>*/}
                    </div>
                </Col>
            )
        })
    }


    render(){
        return (
            <div>
                <Row gutter={16} className="wrap" style={{width:'90%', margin:'190px auto 0'}}>
                    <div className="homes-list">
                        {this.renderSearchResult(this.props.searchResult)}
                    </div>

                </Row>
            </div>
        )

    }
}
