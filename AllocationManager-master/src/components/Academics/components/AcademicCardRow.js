import React from "react";
import { Row, Col } from "react-bootstrap"
import { Button, Card } from "react-bootstrap";
import Popup from "reactjs-popup"
import { TagList } from "./TagList.js"; 
import fetchResults from "../../fetchResults/fetchResults.js"; 
import ColourPicker from "../../ColourPicker/ColourPicker.js"
import AddTag from "./AddTag.js"; 
import "./academicStyles.css"; 
import RemoveAcademicPopup from "./RemoveAcademicPopup.js";
import Select from "react-select";
{/* format button and units */}
{/*<UnitList list={props.academic.assignedUnits}/>*/}


class AcademicCardRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            academicID: null,
            tags: null,  
            loading: false,
            error: null,
            addTagIsOpen: false, 
            removeAcademicIsOpen: false,
        }
    }

    componentDidMount() {
        this.getTags(); 
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
        { value: "1.1", label: "1.1" },
        { value: "1.1", label: "1.1" },
        { value: "1.2", label: "1.2" }, 
        { value: "1.3", label: "1.3" },
        { value: "1.4", label: "1.4" },
        { value: "1.5", label: "1.5" },
        { value: "1.6", label: "1.6" },
        { value: "1.7", label: "1.7" },
        { value: "1.8", label: "1.8" }, 
        { value: "1.9", label: "1.9" },
        { value: "2", label: "2" },
        { value: "2.1", label: "2.1" },
        { value: "2.2", label: "2.2" },
        { value: "2.3", label: "2.3" },
        { value: "2.4", label: "2.4" }, 
        { value: "2.5", label: "2.5" },
    ]
    
    getTags = () => {
        const qString = `getAcademicTags=${this.props.academic.AcademicID}`; 

        fetchResults(qString)
        .then(results => {   
            this.setState({loading: false}); 

            // Split and remove spaces from returned taglist 
            let fixedTags = results[0].Tags.split(":");
            fixedTags = fixedTags.filter(function (element) {
                return element != ""; 
            })

            this.setState({tags: fixedTags});  
            this.setState({academicID: this.props.academic.AcademicID}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    removeAcademic = () => {
        const academicID = this.props.academic.AcademicID; 
        const yearID = this.props.year.value;  

        const url = `http://localhost:3001/removeAcademic?academicID=${academicID}&yearID=${yearID}`; 

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

    handleRemoveAcademicOpen = () => {
        this.setState({removeAcademicIsOpen: true}); 
    }

    handleRemoveAcademicClose = () => {
        this.setState({removeAcademicIsOpen: false}); 
    }

    closeHandler = () => {
        this.handleRemoveAcademicClose(); 
        this.removeAcademic(); 
        this.props.refreshMethod(); 
    }

    updateLoad = (newLoad) => {
        // Update the academic with their new load 
        const academicID = this.props.academic.AcademicID; 
        const yearID = this.props.year.value;  

        const url = `http://localhost:3001/updateAcademicLoad?academicID=${academicID}&yearID=${yearID}&newLoad=${newLoad.value}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    } 

    handleChangeAcademicLoad = (selectedLoad) => {
        // Send the new load to the backend 
        this.updateLoad(selectedLoad);  
        this.props.refreshMethod(); 
    }

    render() {
        if (this.props.academic != null && this.state.tags != null) { 

            if (this.state.academicID != this.props.academic.AcademicID) {
              this.getTags(); 
            }

            // Check if the tags need to re-render
            if (this.props.newUpdate == true) {
              this.getTags(); 
              this.props.updateFinishedMethod();  
            }
            
            return (
                <div className = "academicCard" style={ColourPicker(this.props.academic.LoadError)}>
                    <Popup 
                        trigger={<Button
                            variant = "light" 
                            size="sm"
                            style={{marginLeft: "10px", border: "1px solid", float: "right"}}
                            >X
                        </Button>} 
                        position="center"
                        contentStyle={{border: "none", width: 320}}
                        open={this.state.removeAcademicIsOpen}
                        onOpen={this.handleRemoveAcademicOpen}>
                            <RemoveAcademicPopup 
                                yesMethod={this.closeHandler} 
                                noMethod={this.handleRemoveAcademicClose}/>
                    </Popup >
                    <h3>{this.props.academic.Name}</h3>

                    <div>

                        <p style={{display: "inline-flex", fontWeight: 650}}>
                            Actual Load:  
                            <p style={{fontWeight: "normal", paddingLeft: 3}}> {(this.props.academic.ActualLoad).toFixed(1)}</p>
                            <p style={{display: "inline-flex", fontWeight: 650, paddingLeft: 10}}>
                                Load Error:   
                                <p style={{fontWeight: "normal", paddingLeft: 3}}> {(this.props.academic.LoadError).toFixed(1)}</p>
                            </p>
                        </p>  

                        <p style={{display: "inline-flex", fontWeight: 650}}>
                            Load: 
                            <div className="academicLoad"> 
                            <Select
                                defaultValue ={this.props.academic.Load}
                                options ={this.loadOptions}
                                onChange={this.handleChangeAcademicLoad}
                                openMenuOnClick={false}
                                placeholder={this.props.academic.Load}
                                className="select"
                            />
                            </div>
                            <p style={{display: "inline-flex", fontWeight: 650, paddingLeft: 10}}>
                                Unit Load:  
                                <p style={{fontWeight: "normal", paddingLeft: 3}}>{(this.props.academic.UnitLoad).toFixed(1)}</p>
                            </p>
                        </p>

                    </div>


                    <p>Assigned Tags: </p>
                    <TagList tagList={this.state.tags} 
                             academicID={this.state.academicID} 
                             refreshMethod={this.props.refreshMethod}/>
                    <Popup 
                            trigger={<Button
                                variant = "light" 
                                className = "button"
                                size="sm"
                                style={{border: "1px solid", float: "right", marginTop: "10px"}}>
                                + add tags
                                </Button>} 
                            position="bottom center"
                            contentStyle={{border: "none", width: 320}}
                            open={this.state.addTagIsOpen}
                            onOpen={this.handleAddTagOpen}>
                        <AddTag 
                            closeMethod={this.handleAddTagClose} 
                            tagList={this.state.tags} 
                            refreshMethod={this.props.refreshMethod} 
                            academicID={this.state.academicID}/>
                    </Popup >
            
                </div>
              
            )}
        else { 
            return (
                <Row>
                    {/* <label>{JSON.stringify(this.props)}</label> */}
                    <label>Loading</label>
                </Row>
            )}
        }
}

export default AcademicCardRow; 