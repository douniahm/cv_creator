import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { createBrowserHistory } from "history";
import {userService} from '../services/user.service';
import * as Yup from 'yup';

const history = createBrowserHistory();

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

      render(){
        const isLoginFailed = this.state.isLoginFailed;
        let errorMsg;
        if (isLoginFailed===true) errorMsg = <div className="text-danger">Login failed, try again!</div>
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
            const { name, email, auth_token } = json.data.data;
            let userData = {
              name,
              email,
              auth_token,
              timestamp: new Date().toString()
            };
            // save user data in browser local storage
            localStorage["user"] = JSON.stringify(userData);
            //REDIRECT
            history.push("/");
          } 
          //show error msg 
          else this.setState({isLoginFailed:true});  
        })
        .catch(error => {
          //show error msg 
          this.setState({isLoginFailed:true});
        });
      };
}
export default Login;
