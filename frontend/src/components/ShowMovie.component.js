import React from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


import Movie from './Movie.component'


export default class ShowMovie extends React.Component{
    constructor(){
        super()
        this.state = {
            movies: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/movie/")
            .then((response) => {

                this.setState({
                    movies : response.data.map(movie => movie)
                })
            })
            .catch((err) => {
                console.log("error",err)
            })
    }
    render(){
        const compoArray = this.state.movies.map(movie => {
            return <Movie key={movie._id} movie={movie} />
        })
        return(
            <div>
                {compoArray}
            </div>
        )
    }
}