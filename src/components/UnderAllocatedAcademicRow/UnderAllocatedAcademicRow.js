import React from "react";
import { Row } from "react-bootstrap"
import ColourPicker from "../ColourPicker/ColourPicker.js"
import "./UnderAllocatedAcademicRow.css"; 

class UnderAllocatedAcademicRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            academicID: null
        }
    }
    
    render() {
        return (
            <Row noGutters="True" style={{padding: 0.2, textAlign: "center"}}>
            <p id="urcorners" style={ColourPicker(this.props.academic.LoadError)}>
                <div>
                    {this.props.academic.Name} 
                </div>
                <div>
                {this.props.academic.Load}   |   {(this.props.academic.UnitLoad).toFixed(1)}   |   {(this.props.academic.ActualLoad).toFixed(1)}   |   {(this.props.academic.LoadError).toFixed(1)}
                </div>
            </p>
            </Row> 
        )}
}

export default UnderAllocatedAcademicRow; 