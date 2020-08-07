import React from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Redirect,Route, Link } from 'react-router-dom';
import UpdateMovie from './UpdateMovie.component';

 
export default class UserLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            email : "",
            password : ""
        }
        this.handler = this.handler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handler(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event){
        const cookies = new Cookies(); 
        event.preventDefault()

        axios.post('http://localhost:5000/login',this.state)
            .then((response) => {
                // for data access response.data.variable
                cookies.set('userid',response.data.id)
                cookies.set('userLogged', true)
                window.location="/movie"
            })
            .catch((err) => {
                console.log("(-)Error",err)
            })    
    }
    render(){
        return (
            <div className="container myCtn">
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-12">
                            <h2 className="text-center mt-3">Log in</h2>
                            <form onSubmit={this.handleSubmit} id="contact-form" className="main-form needs-validation" role="form" noValidate>

                                <div className="form-group">
                                    <label>
                                        <input type="text" id="form_email" name="email" className="my_form-control" required/>
                                        <small className="my_place">Your email</small>
                                        <div className="invalid-feedback">Please enter the above field.</div>
                                    </label>
                                </div>   

                                <div className="form-group">
                                    <label>
                                        <input type="password" id="form_password" name="password" className="my_form-control" required/>
                                        <small className="my_place">Your password</small>
                                        <div className="invalid-feedback">Please enter the above field.</div>

                                    </label>
                                </div>  

                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary mt-3 mr-5 mx-auto" >SIGN IN</button>
                                </div>

                                <div className="form-group mt-4 text-center">
                                    <Link to="/recoverpass">Forgot password ?</Link>
                                </div>

                                <div className="form-group mt-4 text-center">
                                    <Link to="/signup">No Account ?, Sign Up here </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


