import React from 'react';
import Axios from 'axios';

export default class Recoveremail extends React.Component{
    constructor(){
        super()
        this.state = {
            email:"",
            password: "",
            cpassword: "",
            passwordText: "",
            isPasswordOk: "",
            completed: ""
        }
        this.handler = this.handler.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }
    handleEmail(e){
        const {name,value} = e.target;
        this.setState({
            [name] : value
        })
    }
    checkPassword(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })

        if(this.state.password !== value){
            //console.log("Password Not Matched")
            this.setState({
                passwordText: <div className="alert alert-danger" role="alert">Password Not Matched</div>
            })
        }else{
            //console.log("Password Matched")
            this.setState({
                passwordText: ""
            })
        }
    }
    handler(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })

        if(value.length < 10){
            this.setState({
                isPasswordOk: <div className="alert alert-danger" role="alert">Password Length must be 10 characters or more</div>
            })
        }else{
            this.setState({
                isPasswordOk: ""
            })
        }
    }
    onsubmit(event){
        event.preventDefault()
        const url ="http://localhost:5000/signup/recoverpass"
        const message = {
            email: this.state.email,
            password: this.state.password
        }

        Axios.post(url,message)
            .then((res) =>{
                console.log(res)
                if(res.data.isComp === true){
                    this.setState({
                        completed: <div className="alert alert-success" role="alert">Successfully changed, plese login.</div>
                    })
                }else{
                    this.setState({
                        completed: <div className="alert alert-danger" role="alert">Please try again.</div>
                    })
                }
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onsubmit}>
                    <input 
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmail}
                        placeholder="Email"
                    />
                    <br/>
                    <p>We are checking for additional Security.</p>
                    <br />
                    <input 
                        type="password"
                        value={this.state.password} 
                        name="password" 
                        onChange={this.handler}
                        placeholder="Password"
                    />
                    {this.state.isPasswordOk}
                    <br />
                    <input 
                        type="password"
                        value={this.state.cpassword} 
                        name="cpassword" 
                        onChange={this.checkPassword}
                        placeholder="confirm Password"
                    />
                    {this.state.passwordText}

                    <button>Change</button>
                </form>
                {this.state.completed}
            </div>
        )
    }
}