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

    handleClick(event, MovieId){
        
        console.log("Clicked!")
        //console.log(event.target.tagName)
        const id  =  MovieId
    
        //console.log(id)
        const urll= `http://localhost:5000/movie/find/id/${id}`
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
                console.log("(-)Error \n",err)
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
            console.log(this.state.movie)
            const picSrc = `http://localhost:5000/getPoster/${this.props.movie.moviePoster}`
            return(
                // here the event should be made to be generated for the entire div ,
                // but here the event is only for the button
                <div>
                    <div className="card" onClick={(event) => this.handleClick(event, this.props.movie._id)}>
                        <img className="card-img-top" src={picSrc} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.movie.movieshowName}</h5>
                            <p className="card-text">{this.props.movie.movieDescription}</p>
                            <p>{this.props.movie._id}</p>
                            <button className="btn btn-primary" 
                                id={this.props.movie._id}
                                onClick={(event) => this.handleClick(event, this.props.movie._id)}
                            >   Watch</button>
                        </div>
                    </div> 
                </div>
            )
        }
    }
}


