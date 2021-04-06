import React from "react";
import Select from "react-select"
import { Button } from "react-bootstrap";
import fetchResults from "../fetchResults/fetchResults.js"; 
import mapUnitsToOptions from "../helperFunctions/mapUnitsToOptions.js"; 

class AddUnit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedUnit: null,
            selectedLoad: null,
            unitsFetched: false,
            units: null, 
        }
    }

    getUnits() {
        const yearID = this.props.year.value; 
        const qString = `allUnits=${this.getUnitsToExclude()}&yearID=${yearID}`; 

        fetchResults(qString)
        .then(results => {  
            this.setState({units: mapUnitsToOptions(results)}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    getUnitsToExclude() {
        const unitsToExclude = [];
        const unitsListJSON = JSON.parse(this.props.unitList); 
        for (let i = 0; i < unitsListJSON.length; i++) {
            unitsToExclude.push(unitsListJSON[i].UnitYearCode);    
        } 
        return unitsToExclude; 
    }

    loadOptions = [
        { value: "0", label: "0" },
        { value: "0.1", label: "0.1" },
        { value: "0.2", label: "0.2" }, 
        { value: "0.3", label: "0.3" },
        { value: "0.4", label: "0.4" },
        { value: "0.5", label: "0.5" },
        { value: "0.6", label: "0.6" },
        { value: "0.7", label: "0.7" },
        { value: "0.8", label: "0.8" }, 
        { value: "0.9", label: "0.9" },
        { value: "1", label: "1" },
    ]

    handleChangeUnit = (selectedUnit) => {
        this.setState({ selectedUnit })
    }

    handleChangeLoad = (selectedLoad) => {
        this.setState({ selectedLoad })
    }

    allocateUnit() {

        // Values for Post
        const UnitYearCode = this.state.selectedUnit.value; 
        const allocationAmount = this.state.selectedLoad.value; 
        const academicID = this.props.academicID;  
        const yearID = this.props.year.value; 

        
        const url = `http://localhost:3001/allocateUnit?allocationAmount=${allocationAmount}&academicID=${academicID}&yearID=${yearID}&UnitYearCode=${UnitYearCode}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }


    clickHandlerAdd = () => { 
        if (this.state.selectedUnit != null && this.state.selectedLoad != null) {
            this.allocateUnit(); 
            this.props.closeMethod(); 
            this.props.refreshMethod();  
        }
    }
    
    render() {

        if (!this.state.unitsFetched) {
            this.getUnits();  
            // this.mapUnitsToOptions(); 
            this.setState({unitsFetched: true})
          }

        return (
            <form>
                <Select
                    value ={this.state.selectedUnit}
                    options ={this.state.units}
                    onChange={this.handleChangeUnit}
                    placeholder= "Search units"
                    openMenuOnClick={false}
                />
                <Select
                    value ={this.state.selectedLoad}
                    options ={this.loadOptions}
                    onChange={this.handleChangeLoad}
                    placeholder= "Allocate Load"
                    openMenuOnClick={false}
                />
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginTop: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add</Button>
            </form>
        )
    }
}

export default AddUnit; 