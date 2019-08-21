import React from 'react';
import './App.css';

import Register from './components/register'
import Login from './components/login'
import Formations from './components/formations'
import Experiences from './components/experiences'
import Competences from './components/competences'
import Contact from './components/contact'
import Cv from './components/cv'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <Router>
          <React.Fragment>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Register} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/formations' component={Formations} />
                <Route path='/experiences' component={Experiences} />
                <Route path='/competences' component={Competences} />
                <Route path='/contact' component={Contact} />
                <Route path='/cv' component={Cv} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
  );
}

export default App;
