import React from 'react'
import NavTop from '../../component/navTop'
import './index.less'
import { NavLink, Link } from 'react-router-dom'

export default class Welcome extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div>
                <NavTop></NavTop>
                {/*<MultiSearch></MultiSearch>*/}
                {/*<NavLink to='/test'>*/}

                {/*</NavLink>*/}
                <div className="content">
                    {this.props.children}
                </div>

            </div>
        )
    }
}