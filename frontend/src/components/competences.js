import React, { Component } from 'react';
//competences passed as props from Cv component
let competences = [];
/*function for update cv content in the parent component(cv), passed as props from cv creation component*/
let handleChange;

/*Adding Competence component*/
class Competence extends Component {
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
                <div className="form-group">
                  <input type="text" className="form-control border rounded"
                   defaultValue={this.props.competence.title}
                  id="title" name="title" placeholder="title" onChange={this.handleChange}/>
                </div>
              </form>
              <hr/>
          </div>
    )}
    handleChange = (e) => {
      const { id, value } = e.target;
      competences[this.state.index][id] = value;
      handleChange('competences',competences);
    }
}
//Competences component: has many Competence
class Competences extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
      };
    }
    componentDidMount(){
      competences = this.props.competences;
      handleChange = this.props.handleChange;
      this.renderCompetences();
    }

    render(){
      return(
        <div className="container spacer col-12 login-form">
        <div className="sub-title">
          Competences
           <button className="btn btn-light" 
          onClick={this.newCompetence}><span>&#43;</span></button></div>
          <React.Fragment>
            {this.state.items}
          </React.Fragment>
        </div>
    )}
    renderNewCompetence = () => {
      let it = [];
      const index = competences.length - 1;
      let competence = competences[index];
      it.push(<Competence index={index} competence={competence} key={index}/>)
      this.setState({
        items: [...this.state.items, ...it]
      })
    }
    newCompetence = () => {
      competences.push({title:''});
      this.renderNewCompetence();
    }
    renderCompetences = () => {
      let it = [];
      for(const [index, competence] of competences.entries()){
          it.push(<Competence index={index} competence={competence} key={index}/>)
      }
      this.setState({
        items: [...this.state.items, ...it]
      })
    }
    
}
export default Competences;