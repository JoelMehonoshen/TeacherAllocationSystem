import React from "react";
import { Row, Col } from "react-bootstrap"
import "./AcademicRow.css"
import { UnitList } from "../UnitList/UnitList.js";
import AddUnit from "../AddUnit/AddUnit.js"; 
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup"
import ColourPicker from "../ColourPicker/ColourPicker.js"
{/* format button and units */}
{/*<UnitList list={props.academic.assignedUnits}/>*/}


class AcademicRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            academicID: null,
            units: null, 
            loading: false,
            error: null,
            addUnitIsOpen: false, 
        }
    }

    componentDidMount() {
        this.useUnitSearch(); 
    } 

    getUnitSearch = () => {
      const academicID = this.props.academic.AcademicAllocationCode; 
      const yearID = this.props.year.value; 

      const url = `http://localhost:3001/allocations?academicID=${academicID}&yearID=${yearID}`;  
    
      return fetch(url)
      .then(res => {
        if (res.ok) {
           return res.json(); 
        }
        throw new Error("Network response not ok"); 
      })
      .then(res => res)
      .catch(e => {
        console.log(e.message); 
      }); 
    }

    useUnitSearch = () => { 
        this.getUnitSearch()
        .then(results => { 
          this.setState({loading: false});
          this.setState({units: JSON.stringify(results)});
          this.setState({academicID: this.props.academic.AcademicID}); 
        })
        .catch(e => {
          this.setState({error: e});
          this.setState({loading: false});
        })
      }

    addUnit = () => {
        // Dummy fetch for adding a unit 
        
        const url = "http://localhost:3001/addUnit?"; 
        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    handleAddUnitOpen = () => {
      this.setState({addUnitIsOpen: true});  
    }

    handleAddUnitClose = () => {
      this.setState({addUnitIsOpen: false}); 
    }
    
    render() {
       
        if (this.state.academicID != null && this.state.loading == false && this.props.academic.ActualLoad != null) {  

            if (this.state.academicID != this.props.academic.AcademicID) {
              this.useUnitSearch(); 
            }

            // Check if the units need to re-render
            if (this.props.newUpdate == true) {
              this.useUnitSearch();
              this.props.updateFinishedMethod();  
            }
            
            return (
              <Row noGutters="True" style={{padding: 0.2}}>
                <Col noGutters="True">
                    <p id="rcorners" style={ColourPicker(this.props.academic.LoadError)}>
                    <div>
                        {this.props.academic.Name} ({this.props.academic.School})
                    </div> 
                    <div>
                      {this.props.academic.Load}   |   {(this.props.academic.UnitLoad).toFixed(1)}   |   {(this.props.academic.ActualLoad).toFixed(1)}   |   {(this.props.academic.LoadError).toFixed(1)} 
                    </div>
                    </p>
                </Col>
                <Col md={8} noGutters="True" style={{paddingLeft: 25}}>
                  <UnitList unitList={this.state.units} 
                            academicID={this.state.academicID} 
                            refreshMethod={this.props.refreshMethod} 
                            year={this.props.year}/>
                </Col>
                <Col noGutters="True" >
                
                </Col>
                <Popup 
                  trigger={<Button
                    variant = "light" 
                    className = "button"
                    size="sm"
                    style={{border: "1px solid"}}>
                    + add a unit
                    </Button>} 
                  position="left center"
                  contentStyle={{ padding: "20px", border: "none" }}
                  open={this.state.addUnitIsOpen}
                  onOpen={this.handleAddUnitOpen}>
                    <AddUnit 
                      unitList={this.state.units} 
                      refreshMethod={this.props.refreshMethod} 
                      academicID={this.state.academicID}
                      
                      closeMethod={this.handleAddUnitClose}
                      year={this.props.year}/>
                </Popup >
              </Row> 

            )}
        else {
            return (
                <Row>
                    {/* <label>{JSON.stringify(this.props)}</label> */}
                    <label>Loading...</label>
                </Row>
            )}
        }
}

export default AcademicRow; 