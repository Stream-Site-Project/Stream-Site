import React, {Component} from "react"
import axios from "axios"
import Cookies from 'universal-cookie';

export default class UploadMovie extends Component{
	constructor(){
		super()
		this.state = {
			movieshowAddedby: "",
			movieshowName: "",
			movieDescription:"",
			movieCast: [],
			movieshowURL: [],
			moviePoster: "",
			movieshowTags: [],
			movieshowIMDBReview:"",
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount(){
		const cookies = new Cookies()
		this.setState({
			movieshowAddedby: "saipavan"
			// added by : cookies.get('username')
		})
	}

	handleSubmit(e){
		e.preventDefault()

		this.setState({
			...this.state,
			movieCast: this.state.movieCast.map(val => val.trim())
		})

		console.log(this.state.movieshowAddedby)

		axios
			.post("http://localhost:5000/movie/upload/", this.state)
			.then((response) => {
				console.log(response)
				console.log("done")
			})
			.catch(err => console.log(err))
	}

	handleChange(e){
		const {name, value} = e.target
		if(name === "movieCast"){
			this.setState({
				[name]: value.split(",")
			})
		}
		else if(name === "movieshowTags" || name === "movieshowURL"){
			this.setState({
				[name]: value.split(",").map(val => val.trim())
			})
		}
		else{
			this.setState({
				[name]: value
			})
		}
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					Name:<input type="text" name="movieshowName" value={this.state.movieshowName} onChange={this.handleChange} placeholder="Enter Movie Name"/><br/>
					desc:<textarea name="movieDescription" value={this.state.movieDescription} onChange={this.handleChange} placeholder="Enter Description"/><br/>
					Cast:<input type="text" name="movieCast" value={this.state.movieCast} placeholder="Enter Cast Seperated by commas" onChange={this.handleChange}/><br/>
					URL:<input type="text" name="movieshowURL" value={this.state.movieshowURL} placeholder="Enter Movie Embeded Link" onChange={this.handleChange}/><br/>
					Poster:<input type="text" name="moviePoster" value={this.state.moviePoster} placeholder="Enter Movie Poster Link" onChange={this.handleChange}/><br/>
					Tags:<input type="text" name="movieshowTags" value={this.state.movieshowTags} placeholder="Enter Tags Seperated by commas" onChange={this.handleChange}/><br/>
					Rating:<input type="text" name="movieshowIMDBReview" value={this.state.movieshowIMDBReview} onChange={this.handleChange} placeholder="Enter IMDB Rating"/><br/>
					<button> Submit </button>
				</form>
				<div className="display-movieDetails">
					<span><label>Movie Added By: </label> {this.state.movieshowAddedby}</span><br/>
					<span><label>Movie Name: </label> {this.state.movieshowName}</span><br/>
					<span><label>Movie Description: </label> {this.state.movieDescription}</span><br/>
					<span><label>Movie Cast: </label>{this.state.movieCast.join(",")}</span><br/>
					<span><label>Movie Url: </label>{this.state.movieshowURL.join(",")}</span><br/>
					<span><label>Movie Poster: </label>{this.state.moviePoster}</span><br/>
					<span><label>Movie Tags: </label>{this.state.movieshowTags.join(",")}</span><br/>
					<span><label>Movie IMDB Review: </label>{this.state.movieshowIMDBReview}</span><br/>
				</div>
			</div>
		)
	}

}