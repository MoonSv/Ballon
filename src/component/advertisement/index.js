import React from 'react'
import './index.less'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div>
                <section className="advertisement"></section>
                {/*<div className="box"></div>*/}
                <div className="ad">
                    <div className="w">
                        <div className="img"></div>

                        <div className="slogon">Feeling at home everywhere.</div>
                    </div>
                </div>

                <section className="popular-tag">
                    <div className="w">
                        <div className="title">
                            <span className="tag-ad">Popular tags<br></br></span>
                        <span className="tag-ad-sub">sub slogon...<br></br></span>
                        </div>
                    <div className="tags">
                        <a href="#" className="tag1">
                            <div className="tag-image1"></div>
                            <span className="desciption">Lake<br></br> Detail...</span>
                        </a>
                        <a href="#" className="tag2">
                            <div className="tag-image2"></div>
                            <span className="desciption">Mountain<br></br> Detail...</span>
                        </a>
                        <a href="#" className="tag3">
                            <div className="tag-image3"></div>
                            <span className="desciption">City<br></br> Detail...</span>
                        </a>
                    </div>
                </div>
                </section>

            </div>
        )
    }
}


