import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

export default class Header extends Component {
    state = {
        buttonDisplay: "none"
    };
    componentDidMount() {
        if($.cookie("login_id")){
            this.setState({
                buttonDisplay: "block"
            });
        }else{
            this.setState({
                buttonDisplay: "none"
            });
        }
    }
    
    logout = () => {
        axios.get("http://localhost:5000/member/logout", {headers})
        .then(returnData => {
            if(returnData.data.message){
                $.removeCookie("login_id");
                alert("로그아웃되어 메인화면으로 이동합니다.");
                window.location.href="/";
            }
        })
    }
    render() {
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };
        const coverStyle = {
            width: "100%",
            height: "500px"
        }
        return (
            <div>
                <Navbar>
                    <Navbar.Brand href="/">First React Project</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        {/*
                            <NavLink to="/mypage">
                                <Button stype={buttonStyle} variant="primary">
                                    회원정보수정
                                </Button>
                            </NavLink>
                        */}
                        <NavLink to="/">
                            <Button style={buttonStyle} variant="primary">
                                글목록
                            </Button>
                        </NavLink>
                        <NavLink to="/boardWrite">
                            <Button style={buttonStyle} variant="primary">
                                글쓰기
                            </Button>
                        </NavLink>
                        <Button style={buttonStyle} onClick={this.logout} variant="primary">
                            로그아웃
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
                <Image src="./img/cover.jpg" style={coverStyle} fluid/>
            </div>
        )
    }
}
