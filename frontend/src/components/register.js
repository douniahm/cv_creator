import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {userService} from '../services/user.service';

class Register extends Component {
    constructor(props) {
      super(props);
      //TODO: if user already logged, redirect him to create cv
      //show error msg
      this.state = {
        name: '',
        email: '',
        password: '',
        msgError: '',
      };
      }

      render(){
        return(
          <div>
            <div className="title">Create Account</div>
            <div className="container spacer col-md-4 offset-md-4 col-sm-12 login-form">
                  <form onSubmit={this.handleRegister}>
                    <div className="form-group">
                      <label htmlFor="name"><input type="text"
                        className="form-control border rounded" id="name" name="name" placeholder="full name" onChange={this.handleChange}/></label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><input type="text"
                        className="form-control border rounded" id="email" name="email" placeholder="email" onChange={this.handleChange}/></label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password"><input type="password"
                        className="form-control border rounded" id="password" name="password" placeholder="password" onChange={this.handleChange}/></label>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-dark">Register</button>
                      <p>Already registred?<Link to="/login">Sign in</Link></p>
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

      handleRegister = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        userService.register(name, email, password);
      };
}
export default Register;
