import React, { Component } from 'react';
import {userService} from '../services/user.service';

//helpers components for displaying fomration, experiences and competences
class Formations extends Component {
  render(){
      return(
        <div>
          <p className="title">Formations</p>
          {
            this.props.formations.map(f =>{
              return(
                <div key={f}>
                  <p className="cv-title">{f.degree}</p>
                  <p>{f.school}</p>
                  <p>{f.description}</p>
                  <hr className="mini-hr ml-0"/>
                </div>
              )
            })
          }
        </div>
  )}
}
class Competences extends Component {
  render(){
      return(
        <div>
          <p className="title">Competences</p>
          {
            this.props.competences.map( c =>{
              return(
                <div key={c}>
                 <p>{c.title}</p>
                  <hr className="mini-hr ml-0"/>
                </div>
              )
            })
          }
          
        </div>
  )}
}
class Experiences extends Component {
  render(){
      return(
        <div>
          <p className="title">Experiences</p>
          {
            this.props.experiences.map( e=>{
              return(
                <div key={e}>
                  <p className="cv-title">{e.job}</p>
                  <p>{e.company}</p>
                  <p>{e.description}</p>
                  <hr className="mini-hr ml-0"/>
                </div>
              )
            })
          }
        </div>
  )}
}
//Show CV component
class ShowCv extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [], //cv elements (Formations, Contact..), useful for showin a navbar that permit to naviguate between elements
        cv: this.props.location.cv,//cv is passed as props from listCv component
        itemToRender: '', //user choose which item(formations, experiences..) want to see 
      };
    }
    componentDidMount(){
      console.log(this.props.location.cv)
      this.getItems();
    }
    render(){
      const name = userService.isUserLogged().name;
      return(
          //ADD BACK TO CVS ARROW
        <div className="container col-12">
          {/* cv title and contact info*/}
          <div className="row">
            <div className="col-6"> 
              <p className="cv-title">{name}</p>
              {this.state.cv.title ? (<p className="cv-title">{this.state.cv.title}</p>) : ''}
            </div>
            <div className="col-6">
              {this.state.cv.contact ? 
                (<p>
                  <p>{this.state.cv.contact.phone}</p>
                  <p>{this.state.cv.contact.email}</p>
                  <p>{this.state.cv.contact.address}</p>
                </p>) : ''
              }
              
            </div>
          </div>
          <hr className="hr"/>
          <div className="row">
            <div className="col-3">
              {/* sidebar*/}
              <div className="card border-light">
              <div className="card-body">
                <table className="table table-hover">
                  <tbody>
                  {this.state.items.map((item) => {     
                    return (<tr className="item alert alert-secondary" key={item} onClick={() => this.renderItem(item)}><td>{item}</td></tr>) 
                  })}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
            <div className="col-9">
              {this.state.itemToRender}
            </div>
          </div>
        </div>
      )
  }
  //get cv items, store them in this.state.items, and show them as options in sidebar
  getItems(){
    let items = [];
    let keys = Object.keys(this.state.cv);
    keys.forEach( k => {
      if(k === 'formations') items.push('Formations')
      else if(k === 'experiences') items.push('Experiences')
      else if(k === 'competences') items.push('Competences')
    });
    this.setState({
      items: [...this.state.items, ...items]
    })
  }
  //render item after user's choice from sidebar
  renderItem = (item)=>{
    if(item === 'Formations') this.setState({
      itemToRender: <Formations key='formations' formations={this.state.cv.formations}/>
    })
    else if(item === 'Experiences') this.setState({
      itemToRender: <Experiences key='experiences' experiences={this.state.cv.experiences}/>
    })
    else if(item === 'Competences') this.setState({
      itemToRender: <Competences key='competences' competences={this.state.cv.competences}/>
    })
  }
}
export default ShowCv;