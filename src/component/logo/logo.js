import React from 'react'
import logoImg from './logo.svg'
import './logo.less'
export default class Logo extends React.Component{

    render(){
        return(
            <div className='logo-container'>
                <img src={logoImg} alt="logo"/>
            </div>
        )
    }

}