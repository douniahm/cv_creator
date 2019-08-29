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
let cv = {title:'',};

class Cv extends Component {
    constructor(props) {
      super(props);
      this.handleScroll = this.handleScroll.bind(this);
      this.state = {
        items: [], //cv elements components (Formations, Contact..)
        isSaveFailed : false, //for showing error msg
        isTitle : false, //show only one title bar
      };
    }
    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll, true);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render(){
        let errorMsg;
        if (this.state.isSaveFailed===true) errorMsg = <div className="text-danger">Operation failed, try again!</div>
      return(
        <div className="container col-12 bg-light cv-container">
        <div className="title">Build your CV <br/> {errorMsg}</div>
        <div className="row">
            <div className="col-10">
                  {this.state.items}
                  <br/>
            </div>
            <div className="col-2" id="side-menu" ref={this.nav}>
              <div className="menu-option"><button className="btn btn-md" id="title" onClick={this.renderTitle}>
                <img src="/icons/title.png" alt="title"/> Title
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="formations" onClick={this.renderFormations}>
                <img src="/icons/formation.png" alt="formations"/> Formations
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="competences" onClick={this.renderCompetences}>
                <img src="/icons/competence.png" alt="competences"/> Competences
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="experiences" onClick={this.renderExperiences}>
                <img src="/icons/experience.png" alt="experiences"/> Experiences
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="contact" onClick={this.renderContact}>
                <img src="/icons/contact.png" alt="contact"/> Contact
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="clear" onClick={this.onClear}>
                <img src="/icons/clean.png" alt="clean"/> Clear
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="cancel" onClick={this.onCancel}>
                <img src="/icons/cancel.png" alt="cancel"/> Cancel
              </button></div><hr/>
              <div className="menu-option"><button className="btn btn-md" id="save" onClick={this.onSave}>
                <img src="/icons/save.png" alt="save"/> Save
              </button></div><hr/>
            </div>
        </div>
        </div>
    )}
    
    //add formations proprety to cv if it doesn't exist and then show Formations component
    renderFormations = () => {
      if(!cv.hasOwnProperty('formations')){ 
        cv.formations = [{degree:'', school:'', description:''}]; //initilize formations array
        let formationsItem = [];
        formationsItem.push(
            <Formations handleChange={this.handleChangeFromOtherComponents} formations={cv.formations} key={'formations'}/>
          )
        this.setState({
          items: [...this.state.items, ...formationsItem]
        })
      }
    }
    renderTitle = () => {
      if(!this.state.isTitle){
        let titleItem = [];
        titleItem.push(
          <form key={'title'}><br/><div className="form-group">
            <input type="text" className="form-control border rounded" defaultValue={cv.title}
            id="title" name="title" placeholder="title" onChange={(e) => this.handleChangeFromOtherComponents(e.target.id, e.target.value)}/>
          </div><hr/>
          </form>
          );
        this.setState({
          items: [...this.state.items, ...titleItem],
          isTitle: true,
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
      //TODO: redirection to homepage
    }
    onSave = () => {
      this.saveCv();
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
    saveCv = () => {
      cvService.save(cv.title)
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
export default Cv;