import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import {userService} from '../services/user.service';
import * as Yup from 'yup';

//Form validation
const SignupSchema = Yup.object().shape({ 
  password: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

class Login extends Component {
    constructor(props) {
      super(props);
      //TODO: if user already logged, redirect him to create cv
      this.state = {
        isLoginFailed: false, //for showing error msg
      };
    }
    //if user already logged, redirect him to cvs 
    componentDidMount(){
      if(userService.isUserLogged()) this.toCvs();
    }

      render(){
        let errorMsg;
        if (this.state.isLoginFailed) errorMsg = <div className="text-danger">Login failed, try again!</div>
        return(
          <div>
            <div className="title">Connection</div>
            <div className="container spacer col-md-4 offset-md-4 col-sm-12 login-form">
              {errorMsg}
              <Formik
                initialValues={{
                  password: '',
                  email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  const { email, password } = values;
                  this.handleLogin(email, password);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field name="email"
                      className="form-control border rounded" placeholder="email"/>
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                    <Field name="password" type="password" 
                    className="form-control border rounded" placeholder="password"/>
                    {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
                    <br/>
                    <div>
                      <button type="submit" className="btn btn-dark">Sign in</button>
                      <p>New? <Link to="/register">Register</Link></p>
                    </div>   
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )
      }
      
      handleLogin (email, password){
        userService.login(email, password)
        .then(response => {
          console.log(response);
          return response;
        })
        .then(json => {
          if (json.data.success) {
            const { id, name, email, api_token } = json.data.data;
            let userData = {
              id,
              name,
              email,
              api_token,
              timestamp: new Date().toString()
            };
            // save user data in browser local storage
            localStorage.setItem('user', JSON.stringify(userData));
            //REDIRECT to user's cvs
            this.toCvs();
          } 
          //show error msg 
          else this.setState({isLoginFailed:true});  
        })
        .catch(error => {
          //show error msg 
          this.setState({isLoginFailed:true});
        });
      }
      toCvs(){
        window.location.href = "/cvs";
      }
      
}
export default Login;
