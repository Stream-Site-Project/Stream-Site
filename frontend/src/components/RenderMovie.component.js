import React from "react";

export default class RenderMovie extends React.Component{
    constructor(){
        super()
        this.state = {
            //movieName : props.movieDetails.MovieName,
            //movieURL : props.movieDetails.movieURL
            //moviePoster = props.moviePoster
        }
    }
    render(){
        return(
            <div>
                <video 
                    width="720"
                    height="420" controls>
                        <source src="http://localhost:5000/video" type="video/mp4"/>
                </video> 
                
            </div>
        )
    }
}