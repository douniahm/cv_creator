//Second Version of cv with drag and drop
import React, { Component } from 'react';
import Formations from './formations'
import Experiences from './experiences'
import Competences from './competences'
import Contact from './contact'
import {cvService} from '../services/cv.service'
import {formationService} from '../services/formation.service'
import {competenceService} from '../services/competence.service'
import {experienceService} from '../services/experience.service'
import {contactService} from '../services/contact.service'

//for handling scrolling, useful for keeping side-menu sticky
let lastScrollY = 0;
let ticking = false;
//cv data
let cv;

class newCv extends Component {
    constructor(props) {
      super(props);
      this.handleScroll = this.handleScroll.bind(this);
      this.state = {
        items: [], //cv elements components (Formations, Contact..)
        isSaveFailed : false, //for showing error msg
        hasTitleAndImage : false, //show only one title bar and image uploader
      };
    }
    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll, true);
      this.initializeCv();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render(){
        let errorMsg;
        if (this.state.isSaveFailed) errorMsg = <div className="text-danger">Operation failed, try again!</div>
      return(
        <div className="container col-12 bg-light cv-container">
        <div className="title">Drag & Drop your CV <br/> {errorMsg}</div>
        <div className="row">
            <div className="col-10" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}>
                  {this.state.items}
                  <br/>
            </div>
            <div className="col-2" id="side-menu" ref={this.nav}>
              <div className="menu-option" draggable="true" id="title" onDragStart={(event)=>this.drag(event)}>
                <img src="/icons/title.png" alt="title"/> Title
              </div><hr/>
              <div className="menu-option" draggable="true" id="formations" onDragStart={(event)=>this.drag(event)}>
                <img src="/icons/formation.png" alt="formations"/> Formations
              </div><hr/>
              <div className="menu-option" draggable="true" id="competences" onDragStart={(event)=>this.drag(event)}>
                <img src="/icons/competence.png" alt="competences"/> Competences
              </div><hr/>
              <div className="menu-option" draggable="true" id="experiences" onDragStart={(event)=>this.drag(event)}>
                <img src="/icons/experience.png" alt="experiences"/> Experiences
              </div><hr/>
              <div className="menu-option" draggable="true" id="contact" onDragStart={(event)=>this.drag(event)}>
                <img src="/icons/contact.png" alt="contact"/> Contact
              </div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="clear" onClick={this.onClear}>
                <img src="/icons/clean.png" alt="clean"/> Clear
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="cancel" onClick={this.onCancel}>
                <img src="/icons/cancel.png" alt="cancel"/> Cancel
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="save" onClick={this.onSave}>
                <img src="/icons/save.png" alt="save"/> Save
              </button></div>
            </div>
        </div>
        </div>
    )}
    //transfert element from sidebar
    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    //get transfered element after drop is finished
    drop = (ev) =>{
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      if(data === 'title') this.renderTitle();
      else if(data === 'formations') this.renderFormations();
      else if(data === 'experiences') this.renderExperiences();
      else if(data === 'competences') this.renderCompetences();
      else if(data === 'contact') this.renderContact();
    }
    allowDrop = (ev) => {
        ev.preventDefault();
    }
    initializeCv(){
      cv = {title:'', image:'',};  //initialize cv with title and image
    }
    //add formations proprety to cv if it doesn't exist and then show Formations component
    renderFormations = () => {
      if(!cv.hasOwnProperty('formations')){ 
        cv.formations = [{degree:'', school:'', description:''}]; //initilize formations array
        let formationsItem = [];
        formationsItem.push(
            <Formations handleChange={this.handleChangeFromOtherComponents} formations={cv.formations} key={'formations'}/>
          )
        //update state
        this.setState({
          items: [...this.state.items, ...formationsItem]
        })
      }
    }
    renderTitle = () => {
      if(!this.state.hasTitleAndImage){
        let titleItem = [];
        titleItem.push(
          <form key={'title'} encType="multipart/form-data"><br/>
            <div className="row">
              <div className="form-group col-8">
                <input type="text" className="form-control border rounded" defaultValue={cv.title}
                id="title" name="title" placeholder="title" 
                onChange={(e) => this.handleChangeFromOtherComponents(e.target.id, e.target.value)}/>
              </div>
              <div className="form-group col-4">
                <input type="file" className="form-control border rounded" defaultValue={cv.image}
                id="image" name="image"/>
              </div>
            </div>
          </form>
          );
        this.setState({
          items: [...this.state.items, ...titleItem],
          hasTitleAndImage: true,
        })
      }
    }
    renderCompetences = () => {
      if(!cv.hasOwnProperty('competences')){ 
        cv.competences = [{title:''}]; 
        let competencesItem = [];
        competencesItem.push(
            <Competences handleChange={this.handleChangeFromOtherComponents} competences={cv.competences} key={'competences'}/>
        )
        this.setState({
          items: [...this.state.items, ...competencesItem]
        })}
    }
    renderExperiences = () => {
      if(!cv.hasOwnProperty('experiences')){ 
        cv.experiences = [{job:'', company:'', description:''}]; 
        let experiencesItem = [];
        experiencesItem.push(
            <Experiences handleChange={this.handleChangeFromOtherComponents} experiences={cv.experiences} key={'experiences'}/>
        )
        this.setState({
          items: [...this.state.items, ...experiencesItem]
        })}
    }
    renderContact = () => {
      if(!cv.hasOwnProperty('contact')){ 
        cv.contact = {phone:'', email:'', address:'', title:''}; 
        let contactItem = [];
        contactItem.push(
            <Contact handleChange={this.handleChangeFromOtherComponents} contact={cv.contact} key={'contact'}/>
          )
        this.setState({
          items: [...this.state.items, ...contactItem]
        })}
    }
    //get changes from childrens components (Formations, Contact..) and update cv
    //item : cv proprety (formations, contact..), content: proprety value
    handleChangeFromOtherComponents = (item, content) => {
      cv[item] = content;
      console.log(cv);
    }
    onClear = () => {
      cv = [];
      this.setState({items:[]})
    }
    onCancel = () => {
      //redirection to list of cvs
      this.props.history.push('/cvs');
    }
    onSave = () => {
      cvService.save(cv.title, document.getElementById('image').files[0])
      .then(response => {
        console.log(response);
        if(response.data.success===true){
          this.saveCvData(response.data.data.id);
          //TODO redirec to show cv
          this.props.history.push('/cvs');
        }
        return response;
      })
      .catch( error => {
        this.setState({isSaveFailed:true});  
      })
    }
    saveCvData = (cv_id) => {
      if(cv.hasOwnProperty('contact'))
          this.saveContact(cv.contact, cv_id);
      if(cv.hasOwnProperty('formations'))
          cv.formations.forEach(f => this.saveFormation(f, cv_id));
      if(cv.hasOwnProperty('experiences'))
          cv.experiences.forEach(e => this.saveExperience(e, cv_id));
      if(cv.hasOwnProperty('competences'))
          cv.competences.forEach(c => this.saveCompetence(c, cv_id));
    }
    saveFormation = (formation, cv_id) => {
      formationService.save(formation.degree, formation.school, formation.description,cv_id)
      .then(json => {
        if (json.data.success) {
          console.log("done");
        } 
        //show error msg 
        else this.setState({isLoginFailed:true});  
      })
      .catch(error => {
        //show error msg 
        this.setState({isSaveFailed:true});
      });

    }
    saveCompetence = (competence, cv_id) => {
      competenceService.save(competence.title,cv_id)
      .then(json => {
        if (json.data.success) {
          console.log("done");
        } 
        //show error msg 
        else this.setState({isLoginFailed:true});  
      })
      .catch(error => {
        //show error msg 
        this.setState({isSaveFailed:true});
      });
    } 
    saveExperience = (experience, cv_id) => {
      experienceService.save(experience.job_title, experience.company, experience.description,cv_id)
      .then(json => {
        if (json.data.success) {
          console.log("done");
        } 
        //show error msg 
        else this.setState({isLoginFailed:true});  
      })
      .catch(error => {
        //show error msg 
        this.setState({isSaveFailed:true});
      });
    }
    saveContact = (contact,cv_id) => {
      contactService.save(contact.phone, contact.address, contact.email,cv_id)
      .then(json => {
        if (json.data.success) {
          console.log("done");
        } 
        //show error msg 
        else this.setState({isLoginFailed:true});  
      })
      .catch(error => {
        //show error msg 
        this.setState({isSaveFailed:true});
      });
    }
    //keep side-menu sticky
    nav = React.createRef();
    handleScroll = () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
              this.nav.current.style.top = `${lastScrollY}px`;
              ticking = false;
            });
            ticking = true;
          }
    }
}
export default newCv;