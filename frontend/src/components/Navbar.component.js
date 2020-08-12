import React from "react";
import { Redirect,Route, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class Navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            userLoggedin : false
        }

        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount(){
        const cookies = new Cookies(); 
        const userLoggedin_cookie = cookies.get('userLogged')
        const userid_cookie = cookies.get('userid')

        if(userLoggedin_cookie && userid_cookie != null){
            this.setState({
                userLoggedin: true
            })
        }else{
            this.setState({
                userLoggedin: false
            })
        }
    }

    handleLogOut(e){
        const cookies = new Cookies();
        cookies.remove('userid')
        cookies.remove('userLogged')
        
        this.setState({
            userLoggedin: false
        })

        window.location = "/login"
    }

    render(){
        const loginSignup = this.state.userLoggedin
                            ?
                            <Link className="nav-link" to="/myprofile">My Account<span className="sr-only">(current)</span></Link>
                            :
                            <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
        
        const logOut = this.state.userLoggedin 
                        ?
                        <Link className="nav-link" onClick={this.handleLogOut} >Log Out<span className="sr-only">(current)</span></Link>
                        :
                        ""

        const watchMovie = this.state.userLoggedin 
                        ?
                        <Link className="nav-link" to="/showmovies">Watch Now<span className="sr-only">(current)</span></Link>
                        :
                        ""

        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p className="navbar-brand" >Streamer</p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                {loginSignup}
                            </li>
                            <li className="nav-item">
                                {watchMovie}
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                {logOut}
                            </li>
                        </ul>
                        </div>
                </nav>
            </div>
        )
    }
}