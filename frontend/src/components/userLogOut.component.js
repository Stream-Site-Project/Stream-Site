import React from 'react';

import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class UserLogOut extends React.Component{
    render(){
        const cookies = new Cookies();
        cookies.remove('userid')
        cookies.remove('userLogged')
        return(
            <Redirect to="/login"/>
        )
    }
}