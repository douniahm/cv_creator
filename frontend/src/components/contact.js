import React, { Component } from 'react';
import {userService} from '../services/user.service';
class Contact extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: '',
      };
    }
    componentDidMount(){
      this.getUserData();
    }
    render(){
        return(
          <div className="login-form">
            <form>
                <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input type="text" className="form-control border rounded title" defaultValue={this.state.user}
                      id="user" name="user" disabled/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control border rounded title" defaultValue={this.props.contact.title}
                      id="title" name="title" placeholder="cv title" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <input type="number" className="form-control border rounded" defaultValue={this.props.contact.phone}
                      id="phone" name="phone" placeholder="phone" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control border rounded" defaultValue={this.props.contact.email}
                      id="email" name="email" placeholder="email" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control border rounded" defaultValue={this.props.contact.address}
                      id="address" name="address" placeholder="address" onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
    )}
    handleChange = (e) => {
      const { id, value } = e.target;
      this.props.contact[id] = value;
      this.props.handleChange('contact', this.props.contact)
    }
    //if user is logged, get his name from browser local storage
    getUserData = () => {
      if(userService.isUserLogged()){
        this.setState({user: userService.isUserLogged().name}) 
      }
    }
}
export default Contact;