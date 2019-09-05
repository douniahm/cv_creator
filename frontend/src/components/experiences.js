import React, { Component } from 'react';
//experiences passed as props from Cv component
let experiences = [];
/*function for update cv content in the parent component(cv), passed as props from cv creation component*/
let handleChange;

/*Adding Experience component*/
class Experience extends Component {
    constructor(props) {
      super(props);
      this.state = {
        index: this.props.index,
      };
    }

    render(){
        return(
          <div>
              <form>
                <div className="row">
                  <div className="form-group col-6">
                    <input type="text" className="form-control border rounded" 
                    defaultValue={this.props.experience.job}
                    id="job" name="job" placeholder="job" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group col-6">
                    <input type="text" className="form-control border rounded" 
                    defaultValue={this.props.experience.company}
                    id="company" name="company" placeholder="company" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control border rounded" 
                  defaultValue={this.props.experience.description}
                  id="description" name="description" placeholder="description" onChange={this.handleChange}/>
                </div>
              </form>
              <hr/>
          </div>
    )}
    handleChange = (e) => {
      const { id, value } = e.target;
      experiences[this.state.index][id] = value;
      handleChange('experiences',experiences);
    }
}

//Experiences component: has many Experience
class Experiences extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
      };
    }
    componentDidMount(){
      experiences = this.props.experiences;
      handleChange = this.props.handleChange;
      this.renderExperiences();
    }

    render(){
      return(
        <div className="container spacer col-12 login-form">
        <div className="sub-title">
          Experiences 
          <button className="btn btn-light" onClick={this.newExperience}><span>&#43;</span></button></div>
          <React.Fragment>
            {this.state.items}
          </React.Fragment>
        </div>
    )}
    renderNewExperience = () => {
      let it = [];
      const index = experiences.length - 1;
      let experience = experiences[index];
      it.push(<Experience index={index} experience={experience} key={index}/>)
      this.setState({
        items: [...this.state.items, ...it]
      })
    }
    newExperience = () => {
      experiences.push({job:'', company:'', description:''});
      this.renderNewExperience();
    }
    renderExperiences = () => {
      let it = [];
      for(const [index, experience] of experiences.entries()){
          it.push(<Experience index={index} experience={experience} key={index}/>)
      }
      this.setState({
        items: [...this.state.items, ...it]
      })
    }
    
}
export default Experiences;