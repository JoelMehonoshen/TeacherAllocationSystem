import React from "react";
import { Col, Button } from "react-bootstrap"
import "./UnitRow.css"
import ColourPicker from "../ColourPicker/ColourPicker.js"
import Select from "react-select"
import RemoveUnitPopup from "../Allocations/components/RemoveUnitPopup.js"; 
import Popup from "reactjs-popup"
{/* format button and units */}

class UnitRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { 
        refreshMethod: this.props.refreshMethod,
        selectedLoad: null,
        removeUnitIsOpen: false,  
        }
    }

    updateAllocationAmount = (newLoad) => {

        const academicID = this.props.academicID; 
        const UnitYearCode = this.props.unit.UnitYearCode;
        const yearID = this.props.year.value;   
        
        
        const url = `http://localhost:3001/updateAllocationAmount?newAllocationAmount=${newLoad.value}&academicID=${academicID}&UnitYearCode=${UnitYearCode}&yearID=${yearID}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    removeUnit() {
        let academicID = this.props.academicID; 
        let UnitYearCode = this.props.unit.UnitYearCode;  
        const yearID = this.props.year.value;  
        
        const url = `http://localhost:3001/removeUnit?UnitYearCode=${UnitYearCode}&academicID=${academicID}&yearID=${yearID}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    handleChangeLoad = (selectedLoad) => {
        this.setState({ selectedLoad })
        this.updateAllocationAmount(selectedLoad); 
        this.props.refreshMethod(); 
    }

    closeHandler = () =>  {
        // Un-allocate the unit from the academic 
        this.setState({removeUnitIsOpen: false})
        this.removeUnit(); 
        this.props.refreshMethod(); 
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

    handleRemoveUnitOpen = () => {
        this.setState({removeUnitIsOpen: true}); 
    }

    handleRemoveUnitClose = () => {
        this.setState({removeUnitIsOpen: false}); 
    }

    render() {
    return (
        <Col md={2.8} style={{paddingRight: 0.5, style: "inline-block"}}>
            <p id= 'urcorners' style={ColourPicker(this.props.unit.LoadError)}>
                <label className = "test">sem {this.props.unit.Semester} : {this.props.unit.UnitCode} : {(this.props.unit.AssignedLoad).toFixed(2)} 
                </label>
                <div className="yeeto">
                <Select
                    defaultValue ={this.state.selectedLoad}
                    options ={this.loadOptions}
                    onChange={this.handleChangeLoad}
                    openMenuOnClick={false}
                    placeholder={this.props.unit.AllocationAmount}
                    className="select"
                />
                </div>
                {/* <div className="close" >
                    <MDBCloseIcon onClick={this.closeHandler}/>
                </div> */}
                <Popup 
                    trigger={<Button
                        variant = "light" 
                        size="sm"
                        style={{marginLeft: "10px", border: "1px solid"}}
                        >X
                    </Button>} 
                    position="center"
                    contentStyle={{border: "none", width: 320}}
                    open={this.state.removeUnitIsOpen}
                    onOpen={this.handleRemoveUnitOpen}>
                        <RemoveUnitPopup 
                            yesMethod={this.closeHandler} 
                            noMethod={this.handleRemoveUnitClose}/>
                    
                </Popup >
                

            </p>
        </Col>
    )}; 
}

export default UnitRow; 