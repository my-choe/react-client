import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './common/Header';
import Body from './common/Body';
import Footer from './common/Footer';

ReactDOM.render(
    <HashRouter>
        <Header/>
        <Body/>
        <Footer/>
    </HashRouter>,
    document.querySelector("#container")
);