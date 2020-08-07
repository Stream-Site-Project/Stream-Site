import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';
import './Login.css';
import { Redirect,Route,BrowserRouter as Router } from 'react-router-dom';

import UploadMovie from './components/UpdateMovie.component';
import UserLogin from './components/UserLogin.component';
import RenderMovie from './components/RenderMovie.component';
import Navbar from './components/Navbar.component';
import ShowMovies from './components/ShowMovie.component';
import UserSignUp from './components/UserSignUp.component';
import userLogOut from './components/userLogOut.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <br/>
        <Route path="/login" component={UserLogin}/>
        <Route path="/signup" component={UserSignUp}/>
        <Route path="/uploadMovie" component={UploadMovie}/>
        <Route path="/playvideo" component={RenderMovie} />
        <Route path="/showmovies" component={ShowMovies} />
        <Route path="/logout" component={userLogOut} />
      </div>
    </Router>
    
  );
}

export default App;
