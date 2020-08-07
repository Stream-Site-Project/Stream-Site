import React from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


import Movie from './Movie.component'


export default class ShowMovie extends React.Component{
    constructor(){
        super()
        this.state = {
            movies: [],
            thrillerMovies :[],
            dramaMovies: [],
            searchFilter: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
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

    handleSearch(event){
        this.setState({
            searchFilter: event.target.value
        })
    }


    render(){

        //here we need to filter the movies.
        const filtolM = this.state.movies.filter(movie =>{
            return movie.movieshowName.indexOf(this.state.searchFilter) !== -1
        })





        // these are the components that go on the screen with there details.
        const totalMovies = filtolM.map(movie => {
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
                <input type="text" value={this.state.searchFilter} placeholder="Search Movie" onChange={this.handleSearch}/>
                <h3>All Movies</h3>
                {totalMovies}
                <br />
                <h3>Thriller Movies</h3>
                {thrillerMovies}
                <br />
                <h3>Drama Movies</h3>
                {dramaMovies}
            </div>
        )
    }
}