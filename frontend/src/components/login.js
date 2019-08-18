import React, { Component } from 'react';
import {userService} from '../services/user.service';
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
      super(props);
      //TODO: if user already logged, redirect him to create cv
      //Show error msg
      this.state = {
        email: '',
        password: '',
        msgError: '',
      };
      }

      render(){
        return(
            <div>
            <div className="title">Connection</div>
            <div className="container spacer col-md-4 offset-md-4 col-sm-12 login-form">
                  <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                      <label htmlFor="email"><input type="text"
                        className="form-control border rounded" id="email" name="email" placeholder="email" onChange={this.handleChange}/></label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password"><input type="password"
                        className="form-control border rounded" id="password" name="password" placeholder="password" onChange={this.handleChange}/></label>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-dark">Sign in</button>
                      <p>New? <Link to="/register">Sign up</Link></p>
                    </div>
                  </form>
            </div>
            </div>
        )
      }

      handleChange = (e) => {
        this.setState({message:'', errors:''})
        const { id, value } = e.target;
        this.setState({ [id]: value });
      }

      handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        userService.login(email, password);
      };
}
export default Login;
