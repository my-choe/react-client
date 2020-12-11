import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import {} from 'jquery.cookie';
axios.defaults.withCredentials = true; //서버 동일기원 처리용
const headers = { withCredentials:true }

class LoginForm extends Component {

    // 회원가입 버튼 클릭 시
    join = () => {
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식
        const regExp2 =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/; //비밀번호 정규식

        // 이메일 & 이름 & 비밀번호 유효성 검사
        if(joinEmail === "" || joinEmail === undefined){
            alert("이메일 주소를 입력해주세요.");
            this.joinEmail.focus();
            return;            
        }else if(joinEmail.match(regExp) === null || joinEmail.match(regExp) === undefined){
            alert("이메일 형식에 맞게 입력해주세요.");
            this.joinEmail.value = "";
            this.joinEmail.focus();
            return;
        }else if(joinName === "" || joinName === undefined){
            alert("이름을 입력해주세요.");
            return;
        }else if(joinPw === "" || joinPw === undefined){
            alert("비밀번호를 입력해주세요.");
            this.joinPw.focus();
            return;
        }else if(joinPw.match(regExp2) === "" || joinPw.match(regExp2) === undefined){
            alert("비밀번호는 숫자, 문자, 특수문자 포함 8~16자리로 입력해주세요.")
            this.joinPw.value = "";
            this.joinPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };

        axios.post("http://localhost:5000/member/join", send_param)
        // 정상수행 시
        .then(returnData => {
            if(returnData.data.message){
                alert(returnData.data.message);
                
                //이메일 중복체크
                if(returnData.data.dupYn === "1"){
                    this.joinEmail.value = "";
                    this.joinEmail.focus();
                } else {
                    this.joinEmail.value = "";
                    this.joinName.value = "";
                    this.joinPw.value = "";
                }
            } else {
                alert("회원가입에 실패하였습니다. 관리자에게 문의하세요.");
            }
        })
        // 에러
        .catch(err => {
            console.log(err);
        })
    }


    // 로그인 버튼 클릭시
    login = () => {
        const loginEmail = this.loginEmail.value;
        const loginPw = this.loginPw.value;

        if(loginEmail === "" || loginEmail === undefined){
            alert("이메일 주소를 입력해주세요.");
            this.loginEmail.focus();
            return;
        } else if (loginPw === "" || loginPw === undefined){
            alert("비밀번호를 입력해주세요.");
            this.loginPw.focus();
            return;
        }
        
        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPw.value
        };

        axios.post("http://localhost:5000/member/login", send_param)
            // 정상수행
            .then(returnData => {
                if(returnData.data.message){
                    $.cookie("login_id", returnData.data._id, {expires: 1});
                    $.cookie("login_email", returnData.data.email, {expires: 1});
                    alert(returnData.data.message);
                    window.location.reload();
                }else{
                    alert(returnData.data.message);
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
        
    };

    render() {
        const formStyle = { marginLeft: 700, marginRight: 700, marginTop: 50 };
        const buttonStyle = { marginTop: 10 };

        return (
            //회원가입 & 로그인폼
            <Form style={formStyle}>
                <Form.Group controlId="joinForm">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        maxLength="100"
                        ref={ref => (this.joinEmail = ref)} //아이디 값 부여
                        placeholder="Enter Email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength="20"
                        ref={ref => (this.joinName = ref)}
                        placeholder="Enter Name"    
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength="64"
                        ref={ref => (this.joinPw = ref)}
                        placeholder="Enter Password"
                    />
                    <Button
                        style={buttonStyle}
                        onClick={this.join}
                        variant="warning"
                        type="button"
                        block
                    >
                        Sign Up
                    </Button>
                </Form.Group>
                <br/><br/>
                <Form.Group controlId="loginForm">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        maxLength="100"
                        ref={ ref =>this.loginEmail = ref }
                        placeholder="Enter Email"
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        maxLength="20"
                        ref={ref => (this.loginPw = ref)}
                        placeholder="Enter Password"
                    />
                    <Button
                        style={buttonStyle}
                        onClick={this.login}
                        variant="outline-warning"
                        type="button"
                        block
                    >
                        Sign In
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}


export default LoginForm;
