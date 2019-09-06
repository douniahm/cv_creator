import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import {userService} from '../services/user.service';

class Navbar extends Component {
    render(){
        //navbar is showen only if user is logged
      if(userService.isUserLogged()!=null){
      return(
        <nav className="navbar navbar-expand-lg bg-dark">
            <ul className="navbar-nav">
                    <li>
                        <NavLink to={"/cvs"} activeClassName="activeLink" className="navLink">
                            My Cvs
                        </NavLink>
                    </li> &nbsp; /&nbsp; 
                    <li className="nav-item active">
                        <NavLink to={"/new"} activeClassName="activeLink" className="navLink">
                            New Cv
                        </NavLink>
                    </li> &nbsp; /&nbsp; 
                    <li className="nav-item">
                        <NavLink onClick={this.onLogOut} to="/login" className="navLink">
                            Log out
                        </NavLink>
                    </li>
                </ul>
        </nav>
      )}else return(
          <div></div>
      )
  }
  onLogOut(){
    userService.logout();
  }
}
export default Navbar;