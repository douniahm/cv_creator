import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoutes from './guards/ProtectedRoutes.guard'
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import newCv from './components/newCv'
import ListCvs from './components/listCvs'
import ShowCv from './components/showCv' 
import './App.css';

class App extends Component {
  render(){
    return (
    <div className="App">
        <Router>
          <React.Fragment>
          {window.location.pathname === '/register' || window.location.pathname === '/login' ? null
        : <Navbar />}
            <Switch>
              <ProtectedRoutes exact path='/' component={ListCvs} /> 
              <ProtectedRoutes path='/cvs' component={ListCvs} />
              <ProtectedRoutes path='/cv' component={ShowCv}/>
              <ProtectedRoutes path='/new' component={newCv}/>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
  );
}
}
export default App;
