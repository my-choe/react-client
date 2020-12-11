import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginForm from '../User/LoginForm';
import BoardForm from '../Board/BoardForm';
import BoardDetail from '../Board/BoardDetail';
import BoardWriteForm from '../Board/BoardWriteForm';
import $ from 'jquery';
import {} from 'jquery.cookie';

export default class Body extends Component {
    render() {
        let resultForm;
        function getResultForm(){
            if($.cookie("login_id")){
                resultForm = <Route exact path="/" component={BoardForm}></Route>
            }else{
                resultForm = <Route exact path="/" component={LoginForm}></Route>
            }
            return resultForm;
        }
        getResultForm();
        return (
            
            <div>
                 <Route path="/board/detail" component={BoardDetail}></Route>
                 <Route path="/boardWrite" component={BoardWriteForm}></Route>
                {resultForm}
            </div>
            
        )
    }
}
