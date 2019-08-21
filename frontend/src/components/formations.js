import React, { Component } from 'react';
let formations = []; //formations passed as props from Cv component
let handleChange;

class Formation extends Component {
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
                    <input type="text" className="form-control border rounded" defaultValue={this.props.formation.degree}
                    id="degree" name="degree" placeholder="degree" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group col-6">
                    <input type="text" className="form-control border rounded" defaultValue={this.props.formation.school}
                    id="school" name="school" placeholder="school" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control border rounded" defaultValue={this.props.formation.description}
                  id="description" name="description" placeholder="description" onChange={this.handleChange}/>
                </div>
              </form>
              <hr/>
          </div>
    )}
    handleChange = (e) => {
      const { id, value } = e.target;
      formations[this.state.index][id] = value;
      handleChange('formations',formations);  
    }
}

class Formations extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
      };
    }
    componentDidMount(){
      formations = this.props.formations;
      handleChange = this.props.handleChange;
      this.renderFormations();
    }

    render(){
      return(
        <div className="container spacer col-12 login-form">
        <div className="sub-title">Formations <button className="btn btn-light" onClick={this.newFormation}>Add formation</button></div>
          <React.Fragment>
            {this.state.items}
          </React.Fragment>
        </div>
    )}
    renderNewFormation = () => {
      let it = [];
      const index = formations.length - 1;
      let formation = formations[index];
      it.push(<Formation index={index} formation={formation} key={index}/>)
      this.setState({
        items: [...this.state.items, ...it]
      })
    }
    newFormation = () => {
      formations.push({degree:'', school:'', description:''});
      this.renderNewFormation();
    }
    renderFormations = () => {
      let items = [];
      for(const [index, formation] of formations.entries()){
          items.push(<Formation index={index} formation={formation} key={index}/>)
      }
      this.setState({
        items: [...this.state.items, ...items]
      })
    }
    
}
export default Formations;