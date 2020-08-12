import React from 'react';

import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class UserLogOut extends React.Component{
    render(){
        const cookies = new Cookies();
        cookies.set('userid',null)
        cookies.set('userLogged', false)
        return(
            <Redirect to="/login"/>
        )
    }
}