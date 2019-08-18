import React from 'react';
import './App.css';

import Register from './components/register'
import Login from './components/login'
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
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
  );
}

export default App;
