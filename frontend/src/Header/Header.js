import React, {Component} from "react";
import "./header.css";
import logo from "./img/logo.png";
import detector from "./img/detector.png";
import log_reader from "./img/log_reader.png"
import detector433 from "./img/detector433.png";
import { SerialReader } from "../SerialReader";

class Header extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            cur_time: "00:00:00"
        }

        // this.serial = null

        this.updateTime = this.updateTime.bind(this)
        this.readSerial = this.readSerial.bind(this)
        this.read = this.read.bind(this)
    }

    updateTime(){
        let unform_time = new Date()
        let hours = unform_time.getHours()>=10?unform_time.getHours():("0"+unform_time.getHours())
        let minutes = unform_time.getMinutes()>=10?unform_time.getMinutes():("0"+unform_time.getMinutes())
        let seconds = unform_time.getSeconds()>=10?unform_time.getSeconds():("0"+unform_time.getSeconds())
        this.setState(state => ({
            cur_time: hours+":"+minutes+":"+seconds
        }), () => {
            setTimeout(this.updateTime, 1000)
        })
    }

    componentDidMount(){
        this.updateTime()
    }

    readSerial(){
        this.serial = new SerialReader()
        this.serial.init()
    }
    read(){
        this.serial.read()
    }

    render(){
        return(
            <div className="header">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <p>Канарейка</p>
                </div>
                <div className="navigation">
                    <button className={this.props.active_cmp==0?"active":""} onClick={() => {this.props.changeCMP(0)}}>
                        <img src={detector433} alt="detector"/>
                        <p className="hint">
                            Устройство 433 МГц
                        </p>
                    </button>
                    <button className={this.props.active_cmp==1?"active":""} onClick={() => {this.props.changeCMP(1)}}>
                        <img src={detector} alt="detector"/>
                        <p className="hint">
                            Устройство 2.4 ГГц
                        </p>
                    </button>
                    <button className={this.props.active_cmp==2?"active":""} onClick={() => {this.props.changeCMP(2)}}>
                        <img src={log_reader} alt="log_reader"/>
                        <p className="hint">
                            Просмотр записей
                        </p>
                    </button>
                    {/* <button onClick={this.readSerial}>reader</button>
                    <button onClick={this.read}>read</button> */}
                </div>
                <div className="time">
                    <p>{this.state.cur_time}</p>
                </div>
            </div>
        )
    }
}

export default Header