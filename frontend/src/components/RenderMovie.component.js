import React from "react";

export default class RenderMovie extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movieName : this.props.location.state.movie[0].movieshowName,
            movieURL : "http://localhost:5000/video/" + this.props.location.state.movie[0].movieshowURL[0],
            moviePoster: "http://localhost:5000/getPoster/" + this.props.location.state.movie[0].moviePoster
        }
    }
    render(){
        //console.log(this.props.location.state.movie[0])
        return(
            <div>
                <video width="720"height="420" controls>
                    <source src={this.state.movieURL} type="video/mp4"/>
                </video>
                <h1>{this.state.movieName}</h1>
            </div>
        )
    }
}