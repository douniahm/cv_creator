import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {cvService} from '../services/cv.service';

class ListCvs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cvs: [0], //user's cvs
        isError: false
      };
    }
    componentDidMount(){
      this.getCvs()
    }
    render(){
      let errorMsg;
        if (this.state.isError) errorMsg = <div className="text-danger">Operation failed, try again!</div>
        this.items = this.state.cvs.map((cv, key) =>
          <tr key={key}>
            { cv.title? (<td>{cv.title}</td>): 'Untitled'}
            <td>{cv.created_at}</td>
            <td>
              <Link to={{pathname: "/cv", cv: cv}}>
                <button type="submit" className="btn btn-outline-dark">Show Cv</button>
              </Link> &nbsp; &nbsp; 
              <button type="submit" className="btn btn-outline-danger" onClick = {() => this.onDelete(cv.id)}>Delete</button>
            </td>
          </tr>
        );
      return(
        <div className="card">
        <div className="title card-title">My Cvs<br/>{errorMsg}</div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>CV</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.items}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
  }
    //get all user cvs from api
   getCvs(){
     cvService.getCvs()
      .then(response => {
        console.log(response);
        if(response.status===200){
           this.setState({cvs: response.data})
        }
        return response;
      })
      .catch( error => {
        this.setState({isError:true})
        });  
    }
    
    //Delete a cv
    onDelete(cv_id){
      cvService.deleteCv(cv_id)
      .then(response => {
        if(response.status===200){
           this.getCvs();
        }
        return response;
      })
      .catch( error => {
        this.setState({isError:true})
        });  
    }
}
export default ListCvs;