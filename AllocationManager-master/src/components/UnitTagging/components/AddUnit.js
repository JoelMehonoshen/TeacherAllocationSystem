import React from "react";
import Select from "react-select"
import { Button } from "react-bootstrap"
import fetchResultsNew from "../../fetchResults/fetchResultsNew.js";
import mapUnitsToOptionsNoSem from "../../helperFunctions/mapUnitsToOptionsNoSem.js"; 
import Popup from "reactjs-popup"
import CreateUnit from "./createUnit.js"; 

class AddUnit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedUnitCode: null, 
            selectedSemester: null, 
            selectedShare: null, 
            selectedEnrolled: null, 
            unitOptions: null, 
            yearOptions: null, 
            unitsFetched: false, 
            units: null, 
            createUnitIsOpen: false, 
        }
    }

    handleChangeUnitCode = (selectedUnitCode) => {
        this.setState({selectedUnitCode: selectedUnitCode})
    }

    handleChangeSemester = (selectedSemester) => {
        this.setState({selectedSemester: selectedSemester})
    }

    handleChangeShare = (e) => {
        this.setState({selectedShare: e.target.value})
    }

    handleChangeEnrolled = (e) => {
        this.setState({selectedEnrolled: e.target.value})
    }

    handleCreateUnitOpen = () => {
        this.setState({createUnitIsOpen: true});
    }

    
    handleCreateUnitClose = () => {
        this.setState({createUnitIsOpen: false});
    }

    getUnits() {
        const qString = `allUnitCodes`; 

        fetchResultsNew(qString)
        .then(results => {  
            this.setState({units: mapUnitsToOptionsNoSem(results)}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    refreshUnits = () => {
        this.setState({unitsFetched: false}); 
    }

    addUnit() {  

        const unitCode = this.state.selectedUnitCode.value
        const semesterID = this.state.selectedSemester.value;
        const yearID = this.props.year.value;  

        const share = this.state.selectedShare;
        const enrolled = this.state.selectedEnrolled;
        const minLoad = this.props.year.minLoad; 

        const url = `http://localhost:3001/addNewUnit?unitCode=${unitCode}&semesterID=${semesterID}&share=${share}&yearID=${yearID}&enrolled=${enrolled}&minLoad=${minLoad}`; 

        console.log(url); 

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

        const unitCode = this.state.selectedUnitCode; 
        const semester = this.state.selectedSemester; 
        const share = this.state.selectedShare;
        const enrolled = this.state.selectedEnrolled; 
        
        if (unitCode != null && semester != null && share != null && enrolled != null) {

            if (share.match(numbers) && enrolled.match(numbers)) {
                return true; 
            }
        }
        return false; 
    }


    clickHandlerAdd = () => { 
        // Check if a year has been selected 
        if (this.props.year.value == 0) {
            alert("Please select a year before adding a new academic."); 
        }

        else if (this.valuesAcceptable()) { 
            this.addUnit(); 
            this.props.closeMethod(); 
            this.props.refreshMethod();  
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

        if (!this.state.unitsFetched) {
            this.getUnits();  
            this.setState({unitsFetched: true})
          }

        return (
            <form style={{padding: 30}}>
                <div>
                    <div className="form-group">
                        <label>UnitCode: </label>
                        <Select
                            value ={this.state.selectedUnitCode}
                            options ={this.state.units}
                            onChange={this.handleChangeUnitCode}
                            openMenuOnClick={false}
                        />
                        <Popup 
                            trigger={<Button
                                variant = "light" 
                                size="sm"
                                style={{marginTop: "10px", border: "1px solid"}}>
                            Create Unit</Button>} 
                            position="right top"
                            contentStyle={{border: "none", width: 320}}
                            open={this.state.createUnitIsOpen}
                            onOpen={this.handleCreateUnitOpen}>
                            <CreateUnit
                                closeMethod={this.handleCreateUnitClose} 
                                refreshParentUnits={this.refreshUnits}/>
                        </Popup >
                    </div>

                    <div className="form-group">
                        <label>Year: </label> 
                        <br />
                        <label>{this.props.year.label}</label>
                    </div>

                    <div className="form-group">
                        <label>Semester: </label>
                        <Select
                            value ={this.state.selectedSemester}
                            options ={this.semesterOptions}
                            onChange={this.handleChangeSemester}
                            openMenuOnClick={false}
                        />
                    </div>

                    <div className="form-group">
                        <label>Share: </label>
                        <input
                            className="form-control"
                            onChange={this.handleChangeShare}
                            value={this.state.selectedShare}
                        />
                    </div>

                    <div className="form-group">
                        <label>Enrolled: </label>
                        <br />
                        <input
                            className="form-control"
                            onChange={this.handleChangeEnrolled}
                            value={this.state.selectedEnrolled}
                        />
                    </div>

                </div>
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginTop: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add Unit</Button>
            </form>
        )
    }
}

export default AddUnit; 