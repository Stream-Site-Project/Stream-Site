import React from "react";
import axios from 'axios';
import RenderMovie from "./RenderMovie.component";
import { Redirect } from 'react-router-dom';

export default class Movie extends React.Component{
    constructor(){
        super()
        
        this.state={
            movieID: ""
        }

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event){
        let {name} = await event.target
        this.setState({
            movieID: name
        })

        console.log("Clicked!")
        let url= `http://localhost:5000/movie/${this.state.movieID}`
        axios.get(url)
            .then((res) =>{
                console.log(res);
                return <Redirect to="/showmovies"/>
            })
            .catch((err) =>{
                console.log("error",err)
            })
        
    }


    render(){
        return(
            <div className="movie-component" name={this.props.movie._id} onClick={this.handleClick}>
                <p>{this.props.movie.movieshowName}</p>
                <p>{this.props.movie.movieshowURL[0]}</p>
                <p>{this.props.movie.moviePoster}</p>
                <p>{this.props.movie._id}</p>
            </div>
        )
    }
}


