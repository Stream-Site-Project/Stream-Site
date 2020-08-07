import React, {Component} from "react";
import axios from 'axios';

export default class UserSignUp extends Component{
	constructor(){
		super()
		this.state = {
			userFullName:"",
			username: "",
			userEmail:"",
			userPassword:"",
			userAge:"",
			userCnfPass:"",
            userAgree: false,
            passwordText: "",
            isPasswordOk: "",
            isUsernameOk:"",
            isEmailOk :"",
            canSignUp :""
		}

		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkData = this.checkData.bind(this);
    }
    
    checkData(e){
        const {name, value} = e.target
        const url = "http://localhost:5000/search/"+value

        axios.get(url)
             .then(response => {
                 if(name === "username"){
                    if(response.data.isUser){
                        this.setState({
                            isUsernameOk: "Username Not Available"
                        })
                    }else{
                        this.setState({
                            isUsernameOk: ""
                        })
                    }
                 }else if(name === "userEmail"){
                    if(response.data.isEmailRegistered){
                        this.setState({
                            isEmailOk: "Email Already Registered!"
                        })
                    }else{
                        this.setState({
                            isEmailOk: ""
                        })
                    }
                 }
                //console.log(response)
             })
             .catch((err) =>{
                //console.log("(-)Error\n",err)
                if(name === "username"){
                    this.setState({
                        isUsernameOk: ""
                    })
                }else if(name === "userEmail"){
                    this.setState({
                        isEmailOk: ""
                    })
                }
            })
    }

	handleChange(e){
        const {name, value, type, checked} = e.target
        
        if(type === "checkbox"){
            this.setState({
                userAgree: checked
            })
        }else{
            this.setState({
                [name] : value
            })
        }                
	}

    handlePassword(e){
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

    checkPassword(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })

        if(this.state.userPassword != value){
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

	handleSubmit(e){
        e.preventDefault()
        //console.log('Clicked')

        if(this.state.userAgree){

            this.setState({
                canSignUp: ""
            })
            const url ="http://localhost:5000/signup/add"
            
            axios.post(url, this.state)
                .then(res => {
                    if(res.data.isUserSignedUp){
                        console.log("Registration Successful")
                        alert('Registration Successful. Please continue to login')
                        window.location = '/login'
                    }
                    else{
                        console.log("Registration Failed, please try after some time.")
                    }    
                })
                .catch(err => console.log(err))
        }else{
            this.setState({
                canSignUp: <div className="alert alert-danger" role="alert">Please Agree to Terms and Conditions"</div>
            })
        }
	}

	render(){
		return(
			<div className="container"> 
				<div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign Up</h5>
                                <form className="form-signin" onSubmit={this.handleSubmit}>
                                    <div className="form-label-group">
                                        <input type="text" name="userFullName" id="userFullName" value={this.state.userFullName} onChange={this.handleChange} className="form-control" placeholder="Full Name" required autoFocus/>
                                        <label htmlFor="userFullName">Full Name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" name="username" onBlur={this.checkData} id="username" value={this.state.username} onChange={this.handleChange} className="form-control" placeholder="username" required />
                                        <label htmlFor="username">Username</label>
                                        {this.state.isUsernameOk}
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" name="userEmail" onBlur={this.checkData} id="userEmail" value={this.state.userEmail} onChange={this.handleChange} className="form-control" placeholder="Email address" required />
                                        <label htmlFor="userEmail">Email</label>
                                        {this.state.isEmailOk}
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" minLength="10" name="userPassword" id="inputPass" value={this.state.userPassword} onChange={this.handlePassword} className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPass">Password</label>
                                        {this.state.isPasswordOk}                 
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" name="userCnfPass" id="inputCnf" value={this.state.userCnfPass} onChange={this.checkPassword} className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputCnf">Confirm Password</label>
                                        {this.state.passwordText}
                                    </div>
                                    <div className="custom-control">
                                    	<label htmlFor="userAge">DOB:</label>
                                    	<input type="date" name="userAge" id="userAge" value={this.state.userAge} onChange={this.handleChange} className="form-control"/>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" name="userAgree" onChange={this.handleChange} className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">I Agree to Terms and Conditions</label>
                                        {this.state.canSignUp}
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		)
	}
}