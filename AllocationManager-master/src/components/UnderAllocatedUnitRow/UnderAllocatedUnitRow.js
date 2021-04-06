import React from "react";
import { Row, Col } from "react-bootstrap"
import ColourPicker from "../ColourPicker/ColourPicker.js"
import "./UnderAllocatedUnitRow.css"

class UnderAllocatedUnitRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            unit: null
        }
    }
    
    render() {
        if (true) { 
            
            return (
              <Row noGutters="True" style={{padding: 0.2, textAlign: "center"}}>
                <p className= "unit" style={ColourPicker(this.props.unit.LoadError)}>
                    <label style={{paddingTop: 10}}>
                        sem {this.props.unit.Semester} : {this.props.unit.UnitCode} : {(this.props.unit.AssignedLoad).toFixed(2)} : {(this.props.unit.LoadError).toFixed(1)}
                    </label>
                </p>
              </Row> 
              
            )}
        else {
            return (
                <Row>
                    <label>yeet2</label>
                </Row>
            )}
        }
}

export default UnderAllocatedUnitRow; 