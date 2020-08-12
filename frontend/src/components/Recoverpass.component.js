import React from 'react';
import Axios from 'axios';

export default class Recoverpass extends React.Component{
    constructor(){
        super()
        this.state = {
            email:"",
            emailFailText: "",
            emailSentText: "",
            isUser: false
        }
        this.handler = this.handler.bind(this)
        this.onsubmit = this.onsubmit.bind(this)
    }

    handler(event){
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    onsubmit(event){
        event.preventDefault()

        const url = "http://localhost:5000/recoverpass"

        Axios.post(url,this.state)
            .then( (res) => {
                //console.log(res)
                if(res.data.isUser === true){
                    console.log("sending mail....")
                    Axios.get(`http://localhost:5000/recoverpass/send/${this.state.email}`)
                    .then( (res) => {
                        if(res.data.sent === true){
                            this.setState({
                                emailSentText: <div className="alert alert-success" role="alert">Email Sent Successfully!</div>
                            })
                        }else{
                            this.setState({
                                emailFailText: <div className="alert alert-danger" role="alert">Sorry, we are trying to hard to send the message, try again some time.</div>
                            })
                        }
                    })
                    .catch(err => console.log(err))
                }else{
                    this.setState({
                        emailFailText: <div className="alert alert-danger" role="alert">No Email found, Please register first.</div>
                    })
                }
            })
            .catch(err => console.log(err))
    }
    render(){
        
        return(
            <form onSubmit={this.onsubmit}>
                <p>Enter your Email:</p>
                <input type="text" name="email" value={this.state.email} onChange={this.handler} required/>
                <button>Submit</button>
                {this.state.emailFailText}
                {this.state.emailSentText}
            </form>
        )
    }
}