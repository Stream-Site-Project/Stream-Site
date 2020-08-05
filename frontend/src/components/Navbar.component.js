import React from "react";
import { Redirect,Route, Link } from 'react-router-dom';

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p className="navbar-brand" >Streamer</p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/uploadmovie">Upload Movie</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/showmovies">DashBoard</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}