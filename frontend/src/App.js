import React from 'react';
import './App.css';
import './components/UpdateMovie.component';
import UploadMovie from './components/UpdateMovie.component';
import UserLogin from './components/UserLogin.component';
import Test from './components/test';
import RenderMovie from './components/RenderMovie.component';
import Cookies from 'universal-cookie';
import { Redirect,Route,BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <RenderMovie />
        <Route path="/login" component={UserLogin}/>
        <Route path="/movie" component={UploadMovie}/>
      </div>
    </Router>
    
  );
}

export default App;
