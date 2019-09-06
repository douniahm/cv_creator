import React, { Component } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import {userService} from '../services/user.service';
import {cvService} from '../services/cv.service';

class showCv extends Component {
    render(){
      const bodyRef = React.createRef();
      const cv = this.props.location.cv;
      const name = userService.isUserLogged().name;
      return(
        <div className="container col-12 center">
          <div className="text-right">
            <button className="btn btn-lg btn-outline-secondary" onClick={()=>this.onExportPdf(bodyRef.current)}>
              Export PDF
            </button>
            &nbsp; &nbsp; 
            <button className="btn btn-lg btn-outline-danger" onClick={()=>this.onDelete(cv.id)}>
              Delete
            </button>
          </div>
          {/* CV */}
          <div className="row" ref={bodyRef}>
            {/* right side: image, address title and contact info*/}
            <div className="col-3"> 
                <br/>
              {cv.image ? (<img src={"http://localhost:8000/images/"+cv.image} alt="cv_img"/>):''}
              <br/> <br/>
              {cv.contact ? 
                (<div>
                  {/*Handle untitled cvs: TRY TO MEROVE IT*/}
                  <p>{cv.contact.phone}</p>
                  <p>{cv.contact.email}</p>
                  <p>{cv.contact.address}</p>
                </div>) : ''
              }
            </div>
            {/* left side: title, name, formations...*/}
            <div className="col-9 vertical-line">
            <p className="cv-title text-center">{name}</p>
            <p className="cv-title blue-text text-center">{cv.title}</p>
            {cv.formations.length!==0 ? <p className="sub-title blue-text">Formations</p> : ''}
              {/*Formations*/
                  (cv.formations.map(f =>{
                      return(
                        <div key={f}>
                          <p className="sub-title">{f.degree}</p>
                          <p>{f.school}</p>
                          <p>{f.description}</p>
                          <hr className="mini-hr ml-0"/>
                        </div>
                      )
                    }))
              }

              {cv.experiences.length!==0 ? <p className="sub-title blue-text">Experiences</p> : ''}
              { /*Experiences*/
                cv.experiences.map( e=>{
                  return(
                    <div>
                      <p className="sub-title">{e.job}</p>
                      <p>{e.company}</p>
                      <p>{e.description}</p>
                      <hr className="mini-hr ml-0"/>
                    </div>
                  )
                })
              }
              {cv.competences.length!==0 ? <p className="sub-title blue-text">Competences</p> : ''}
              {/*Competences*/     
                cv.competences.map( c =>{
                    return(
                      <div key={c}>
                       <p>{c.title}</p>
                        <hr className="mini-hr ml-0"/>
                      </div>
                    )
                  }) 
              }
            </div>            
          </div>
        </div>
      )
  }
  //download cv as pdf
  onExportPdf = (html) => {
    savePDF(html, { 
      paperSize: "A3",
      fileName: 'cv.pdf',
      margin: 40
    })
  }
  //Delete cv
  onDelete(cv_id){
    cvService.deleteCv(cv_id)
    .then(response => {
      if(response.status===200){
        this.props.history.push('/cvs');
      }
      return response;
    })
    .catch( error => {
      this.setState({isError:true})
      });  
  }
}
export default showCv;