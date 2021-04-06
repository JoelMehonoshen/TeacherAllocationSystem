import React from "react";
import { Row } from "react-bootstrap"
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup"
import { TagList } from "./TagList.js"; 
import fetchResults from "../../fetchResults/fetchResults.js"; 
import AddTag from "./AddTag.js"; 
import "./unitStyles.css"; 
import ColourPicker from "../../ColourPicker/ColourPicker.js"
import RemoveUnitPopup from "./RemoveUnitPopup.js"; 
import Select from "react-select";

class UnitCardRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            // Not sure what other info needs to be stored here 
            unitCode: null,
            tags: null,  
            loading: false,
            error: null,
            addTagIsOpen: false, 
            removeUnitIsOpen: false, 
        }
    }

    shareOptions = [
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

    componentDidMount() {
        this.getTags(); 
    }
    
    getTags = () => {

        // Convert this function to get the tags assigned to the unit 
        const qString = `getUnitTags=${this.props.unit.UnitCode}`; 

        fetchResults(qString)
        .then(results => {   
            this.setState({loading: false});  

            if (results[0] == undefined) {
                return 0;  
            } 

            // Split and remove spaces from returned taglist 
            let fixedTags = results[0].Tags.split(":");
            fixedTags = fixedTags.filter(function (element) {
                return element != ""; 
            }) 

            this.setState({tags: fixedTags});
              
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    removeUnit = () => {
        const unitYearCode = this.props.unit.UnitYearCode; 
        const yearID = this.props.year.value; 

        const url = `http://localhost:3001/removeUnitYear?unitYearCode=${unitYearCode}&yearID=${yearID}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    handleAddTagOpen = () => {
        this.setState({addTagIsOpen: true});
    }

    handleAddTagClose = () => {
        this.setState({addTagIsOpen: false});
    }

    closeHandler = () => {
        this.handleRemoveUnitClose(); 
        this.removeUnit(); 
        this.props.refreshMethod(); 
    }

    updateShare = (newShare) => {
        const unitYearCode = this.props.unit.UnitYearCode;  
        const enrolled = this.props.unit.Enrolled; 
        const yearID = this.props.year.value;
        const minLoad = this.props.year.minLoad;

        const url = `http://localhost:3001/updateUnitShare?unitYearCode=${unitYearCode}&newShare=${newShare.value}&enrolled=${enrolled}&yearID=${yearID}&minLoad=${minLoad}`;

        console.log(url); 
        
        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    updateEnrolled = (newEnrolled) => {
        const unitYearCode = this.props.unit.UnitYearCode;
        const share =  this.props.unit.Share; 
        const yearID = this.props.year.value;
        const minLoad = this.props.year.minLoad; 

        const url = `http://localhost:3001/updateUnitEnrolled?unitYearCode=${unitYearCode}&newEnrolled=${newEnrolled}&share=${share}&yearID=${yearID}&minLoad=${minLoad}`;  

        console.log(url); 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    handleChangeShare = (selectedShare) => {
        this.updateShare(selectedShare);  
        this.props.refreshMethod(); 
    }

    valuesAcceptable = (value) => {
        const numbers =  /^[0-9]+([,.][0-9]+)?$/g; 

        if (value != "" && value.match(numbers)) {
            return true; 
        }

        return false; 
    }

    handleBlurEnrolled = (e) => {
        if (this.valuesAcceptable(e.target.value)) {
            this.updateEnrolled(e.target.value);
            this.props.refreshMethod(); 
        }
        else {
            alert("Please enter a suitable value"); 
        }
    }

    render() {
        if (this.props.unit != null) {

            if (this.state.unitCode != this.props.unit.UnitCode) {
                this.getTags(); 
                this.setState({unitCode: this.props.unit.UnitCode});
            }

            // Check if tisNullhe tags need to re-render
            if (this.props.newUpdate == true) {
              this.getTags(); 
              this.props.updateFinishedMethod();  
            }
            
            return (
                <div className = "unitCard" style={ColourPicker(this.props.unit.LoadError)}>
                    <Popup 
                        trigger={<Button
                            variant = "light" 
                            size="sm"
                            style={{marginLeft: "10px", border: "1px solid", float: "right"}}
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
                    <h3>sem {this.props.unit.Semester} : {this.props.unit.UnitCode} : {(this.props.unit.AssignedLoad).toFixed(2)} </h3>
                    <div>
                        <p style={{display: "inline-flex", fontWeight: 650}}>
                            Share: 
                            <div className="unitShare"> 
                                <Select
                                    defaultValue ={this.props.unit.Share}
                                    options ={this.shareOptions}
                                    onChange={this.handleChangeShare}
                                    openMenuOnClick={false}
                                    placeholder={this.props.unit.Share}
                                    className="select"
                                />
                            </div>
                            <p style={{display: "inline-flex", fontWeight: 650, paddingLeft: 10}}>
                                Enrolled: 
                                <div className="unitEnrolled">
                                    <input 
                                    className="unitEnrolled"
                                    style={{fontWeight: "normal", paddingLeft: 3}}
                                    placeholder={this.props.unit.Enrolled}
                                    onBlur={this.handleBlurEnrolled}></input>
                                </div>
                            </p>
                        </p>    
                        <p style={{display: "inline-flex", fontWeight: 650, paddingLeft: 10}}>
                            Allocated Load:  
                            <p style={{fontWeight: "normal", paddingLeft: 3}}> {(this.props.unit.AlocatedLoad).toFixed(2)}</p>
                        </p>
                    </div>
                    
                    <p>Assigned Tags: </p>
                    <TagList tagList={this.state.tags} unitCode={this.state.unitCode} refreshMethod={this.props.refreshMethod}/>
                    <Popup 
                            trigger={<Button
                                variant = "light" 
                                className = "button"
                                size="sm"
                                style={{border: "1px solid", float: "right"}}>
                                + add tags
                                </Button>} 
                            position="bottom center"
                            contentStyle={{border: "none", width: 320}}
                            open={this.state.addTagIsOpen}
                            onOpen={this.handleAddTagOpen}>
                        <AddTag 
                            tagList={this.state.tags} 
                            refreshMethod={this.props.refreshMethod} 
                            unitCode={this.state.unitCode}
                            closeMethod={this.handleAddTagClose}/>
                    </Popup >
               
                </div>
              
            )}
        else {
            return (
                <Row>
                    <label>Loading</label>
                </Row>
            )}
        }
}

export default UnitCardRow; 