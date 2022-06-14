import React from 'react';
import Header from '../dashboard/Header'
import Sidebar from '../dashboard/Sidebar'
import Feed from '../dashboard/Feed';
import '../css/dashboard/header.css'
import Widgets from '../dashboard/Widgets';
import { withRouter } from 'react-router-dom';

function Dashboard(props) {

    return (
                <div className='dashboard'>
                    <Header setRole={props.setRole} user = {props.user}/>

                    <div className="content">
                        <Sidebar user = {props.user}/>
                        <Feed    user = {props.user}/>
                        <Widgets user = {props.user}/>
                    </div>

                </div>
    );
}

export default withRouter(Dashboard)