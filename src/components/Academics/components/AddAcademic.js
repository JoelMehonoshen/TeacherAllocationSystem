import React from "react";
import { Button } from "react-bootstrap";

class AddAcademic extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedName: null,
            selectedLoad: null, 
            selectedSchool: null, 
        }
    }

    handleChangeName = (e) => {
        this.setState({selectedName: e.target.value})
    }

    handleChangeLoad = (e) => {
        this.setState({selectedLoad: e.target.value})
    }

    handleChangeSchool = (e) => {
        this.setState({selectedSchool: e.target.value})
    }


    addAcademic() {  

        const name = this.state.selectedName; 
        const load = this.state.selectedLoad; 
        const school = this.state.selectedSchool;  

        const yearID = this.props.year.value; 

        const url = `http://localhost:3001/addAcademic?name=${name}&load=${load}&yearID=${yearID}&school=${school}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    valuesAcceptable() {
        const numbers =  /^[0-9]+([,.][0-9]+)?$/g;  

        const name = this.state.selectedName; 
        const load = this.state.selectedLoad; 
        const school = this.state.selectedSchool; 
        
        if (name != null && load != null && school != null) {
            if (load.match(numbers)) {
                return true; 
            }
        }
        return false; 
    }


    clickHandlerAdd = () => {
        // Check if a year has been selected 
        if (this.props.year.value === 0) {
            alert("Please select a year before adding a new academic."); 
        }

        else if (this.valuesAcceptable()) {
            this.addAcademic();  
            this.props.closeMethod(); 
            this.props.refreshMethod();
        }

        else {
            alert("Please enter suitable values"); 
        }
    }
    
    render() {

        return (
            <form style={{padding: 30}}>
                <div class="form-group">
                    <label>Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeName}
                      value={this.state.selectedName}
                    />
                </div>
                
                <div className="form-group">
                    <label>Load: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeLoad}
                      value={this.state.selectedLoad}
                    />
                </div>

                <div className="form-group">
                    <label>School: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeSchool}
                      value={this.state.selectedSchool}
                    />
                </div>

                <div className="form-group">
                    <label>Year: </label> 
                    <br />
                    <label>{this.props.year.label}</label>
                </div>

                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginTop: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add Academic</Button>
            </form>
        )
    }
}

export default AddAcademic; 