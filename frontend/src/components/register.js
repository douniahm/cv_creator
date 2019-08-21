import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { createBrowserHistory } from "history";
import {userService} from '../services/user.service';
import * as Yup from 'yup';

const history = createBrowserHistory();

const SignupSchema = Yup.object().shape({ 
  name: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

class Register extends Component {
    constructor(props) {
      super(props);
      //TODO: if user already logged, redirect him to create cv
      this.state = {
        isRegistrationFailed: false, //for showing error msg
      };
      }

      render(){
        const isRegistrationFailed = this.state.isRegistrationFailed;
        let errorMsg;
        if (isRegistrationFailed===true) errorMsg = <div className="text-danger">Registation failed, try again!</div>
        return(
          <div>
            <div className="title">Create Account</div>
            <div className="container spacer col-md-4 offset-md-4 col-sm-12 login-form">
              {errorMsg}
            <Formik
      initialValues={{
        name: '',
        password: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        const { name, email, password } = values;
        this.handleRegister(name, email, password);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" 
            className="form-control border rounded" placeholder="full name"/>
          {errors.name && touched.name ? (
            <div className="text-danger">{errors.name}</div>
          ) : null}
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
            <button type="submit" className="btn btn-dark">Register</button>
            <p>Already registred?<Link to="/login">Sign in</Link></p>
          </div>   
        </Form>
      )}
    </Formik>
          </div>
          </div>
        )
      }

      handleRegister (name, email, password){
        userService.register(name, email, password)
        .then(response => {
          console.log(response);
          return response;
        })
        .then(json => {
          if (json.data.success) {
            const {id, name, email, api_token } = json.data.data;
            let userData = {
              id,
              name,
              email,
              api_token,
              timestamp: new Date().toString()
            };
            // save user data in browser local storage
            localStorage["user"] = JSON.stringify(userData);
            //REDIRECT
            history.push("/");
          } 
          // show error msg
          else this.setState({isRegistrationFailed:true});  
        })
        .catch(error => {
          //show error msg 
          this.setState({isRegistrationFailed:true});
        });
      };
}
export default Register;
