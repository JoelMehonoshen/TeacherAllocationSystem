import React from "react";
import "./yearRow.css"; 
import Popup from "reactjs-popup"
import RemoveYearPopup from "./RemoveYearPopup.js"; 
import { Button } from "react-bootstrap";

class YearRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { 
            removeYearIsOpen: false, 
        }
    }

    handleRemoveYearOpen = () => {
        this.setState({removeYearIsOpen: true}); 
    }

    handleRemoveYearClose = () => {
        this.setState({removeYearIsOpen: false}); 
    }

    removeYear() {
        let yearID = this.props.yearID;  
        
        const url = `http://localhost:3001/removeYear?yearID=${yearID}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    updateMinLoad = (newMinLoad) => {
        const yearID = this.props.yearID;  

        const url = `http://localhost:3001/updateYearMinLoad?yearID=${yearID}&newMinLoad=${newMinLoad}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    valuesAcceptable = (value) => {
        const numbers =  /^[0-9]+([,.][0-9]+)?$/g; 

        if (value !== "" && value.match(numbers)) {
            return true; 
        }

        return false; 
    }
    
    handleBlurMinLoad = (e) => {
        if (this.valuesAcceptable(e.target.value)) {
            this.updateMinLoad(e.target.value);
            this.props.refreshMethod(); 
        }
        else {
            alert("Please enter a suitable value");
        }
    }

    closeHandler = () => {
        this.handleRemoveYearClose(); 
        this.removeYear(); 
        this.props.refreshMethod();
        this.props.refreshManageYears();  
    }

    render() { 
    return (
        <div className="year">
        <p>
            {this.props.year}
            <Popup 
                        trigger={<Button
                            variant = "light" 
                            size="sm"
                            style={{marginLeft: "10px", border: "1px solid", float: "right"}}
                            >X
                        </Button>} 
                        position="center"
                        contentStyle={{border: "none", width: 320}}
                        open={this.state.removeYearIsOpen}
                        onOpen={this.handleRemoveYearOpen}>
                            <RemoveYearPopup 
                                yesMethod={this.closeHandler} 
                                noMethod={this.handleRemoveYearClose}/>
                    </Popup >
        </p>
        <p style={{display: "inline-flex"}}>
            Minimum Load: 
            <div style={{display: "inline-block"}}>
                <input
                className="minLoad"
                placeholder={this.props.minLoad}
                style={{fontWeight: "normal", paddingLeft: 3}}
                onBlur={this.handleBlurMinLoad}></input>
            </div> 
        </p>
        <p>
            Standard Load: {(this.props.standardLoad).toFixed(1)}
        </p>
        </div>
    )}; 
}

export default YearRow; 