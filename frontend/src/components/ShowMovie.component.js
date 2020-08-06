import React from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import '../OwlCarousel2-2.3.4/dist/assets/owl.carousel.css';
import '../OwlCarousel2-2.3.4/dist/assets/owl.theme.default.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


import Movie from './Movie.component'


export default class ShowMovie extends React.Component{
    constructor(){
        super()
        this.state = {
            movies: [],
            thrillerMovies :[],
            dramaMovies: []
        }
    }

    componentDidMount(){
        console.log("Requesting...")
        // for finding all the movies.
        const AllMovies = axios.get("http://localhost:5000/movie/findall");
        const ThrillerMovies = axios.get("http://localhost:5000/movie/find/genre/thriller");
        const DramaMovies = axios.get("http://localhost:5000/movie/find/genre/drama");
       

        axios.all([AllMovies,ThrillerMovies,DramaMovies])
            .then(axios.spread((...response) =>{
                const respAll = response[0]
                const respThriller = response[1]
                const respDrama = response[2]

                //console.log(respAll)
                //console.log(respThriller)
                //console.log(respDrama)
                this.setState({
                    movies : respAll.data.map(movie => movie),
                    thrillerMovies : respThriller.data.map(movie => movie),
                    dramaMovies : respDrama.data.map(movie => movie)
                })
            })).catch((err) =>{
                console.log(err)
            })
    }
    render(){
        const totalMovies = this.state.movies.map(movie => {
            return <Movie key={movie._id} movie={movie} />
        })
        const thrillerMovies = this.state.thrillerMovies.map(movie => {
            return <Movie key={movie._id} movie={movie} />
        })
        const dramaMovies = this.state.dramaMovies.map(movie => {
            return <Movie key={movie._id} movie={movie} />
        })
        return(
            // Here the owl crousel should be made.
            <div>
                {totalMovies}
                {thrillerMovies}
                {dramaMovies}
            </div>
        )
    }
}