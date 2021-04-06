import React from "react";
import { Button } from "react-bootstrap"

class CreateUnit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedUnitCode: null, 
            selectedUnitName: null, 
            selectedTags: null, 
            tags: null, 
            tagsFetched: false,  
        }
    }

    handleChangeUnitCode = (e) => {
        this.setState({selectedUnitCode: e.target.value})
    }

    handleChangeUnitName = (e) => {
        this.setState({selectedUnitName: e.target.value})
    }

    valuesAcceptable() {
        const unitCode = this.state.selectedUnitCode; 
        const unitName = this.state.selectedUnitName; 
        
        if (unitCode != null && unitName != null) {
            return true; 
        }
        return false; 
    }

    createUnit = () => {
        const unitCode = this.state.selectedUnitCode;
        const unitName = this.state.selectedUnitName; 
        
        const url = `http://localhost:3001/createUnit?unitCode=${unitCode}&unitName=${unitName}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }


    clickHandlerCreate = () => { 
        if (this.valuesAcceptable()) { 
            this.createUnit(); 
            this.props.refreshParentUnits();  
            this.props.closeMethod(); 
        }
        else {
            alert("Please enter suitable values"); 
        }
    }

    semesterOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '1 & 2' }
    ]

    render() {

        return (
            <form style={{padding: 30}}>
                <div>
                    <div className="form-group">
                        <label>UnitCode: </label>
                        <input
                            className="form-control"
                            onChange={this.handleChangeUnitCode}
                            value={this.state.selectedUnitCode}
                        />
                    </div>

                    <div className="form-group">
                        <label>Unit Name: </label> 
                        <input
                            className="form-control"
                            onChange={this.handleChangeUnitName}
                            value={this.state.selectedUnitName}
                        />
                    </div>

                </div>
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginTop: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerCreate()}}>Create Unit</Button>
            </form>
        )
    }
}

export default CreateUnit; 