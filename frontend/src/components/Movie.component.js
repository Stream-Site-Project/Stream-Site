import React from "react";
import axios from 'axios';
import RenderMovie from "./RenderMovie.component";
import { Redirect } from 'react-router-dom';

export default class Movie extends React.Component{
    constructor(){
        super()
        
        this.state={
            ist:false,
            movie: ""
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            ist:false
        })
    }

    handleClick(event){
        const {id} =  event.target
        console.log("Clicked!")
        //console.log(id)
        const urll= `http://localhost:5000/movie/find/${id}`
        //console.log(urll)
        axios.get(urll)
            .then((res) =>{
                //console.log(res)
                this.setState({
                    ist:true,
                    movie:res.data
                })
            })
            .catch((err) =>{
                console.log("(-)Error\n",err)
            })
        
    }


    render(){
        if(this.state.ist === true){
            console.log(this.state.movie)
            return <Redirect push to={{
                pathname:"/playvideo",
                state:{movie: this.state.movie} 
            }}/>
        }else{
            return(
                
                <div className="movie-component" id={String(this.props.movie._id)} onClick={this.handleClick}>
                    <p>{this.props.movie.movieshowName}</p>
                    <p>{this.props.movie.movieshowURL[0]}</p>
                    <p>{this.props.movie.moviePoster}</p>
                    <p>{this.props.movie._id}</p>
                </div>
            )
        }
    }
}


