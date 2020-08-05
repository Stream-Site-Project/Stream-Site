import React from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Redirect,Route, Link } from 'react-router-dom';
import UpdateMovie from './UpdateMovie.component';

 
export default class UserLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
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
                window.location="/movie"
            })
            .catch((err) => {
                console.log("(-)Error",err)
            })    
    }
    render(){
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}> 
                    <span>
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={this.state.username}
                            onChange={this.handler}
                            required
                        />
                    </span>
                    <br />
                    <span>
                        <label>password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handler}
                            required
                        />
                    </span>
                    <button>submit</button>
                </form>
                <p>{this.state.username}<br />{this.state.password}</p>
            </div>
        )
    }
}

