import React from "react";
import { Button } from "react-bootstrap";
import fetchResultsNew from "../fetchResults/fetchResultsNew.js"; 
import mapYearsToOptions from "../helperFunctions/mapYearsToOptions.js";
import { YearList } from "./components/YearList.js"; 

class ManageYears extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            yearsFetched: false,
            years: null,
            selectedNewYear: "",
            selectedMinimumLoad: "", 
        }
    }
    
    getAllYears = () => {
        const qString = `allYears`; 

        fetchResultsNew(qString)
        .then(results => {   
            this.setState({years: mapYearsToOptions(results)}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    addYear() {
        const year = this.state.selectedNewYear;   
        const minLoad = this.state.selectedMinimumLoad;  
        
        const url = `http://localhost:3001/addYear?year=${year}&minLoad=${minLoad}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    changeHandlerNewYear = (e) => {
        this.setState({selectedNewYear: e.target.value})
    }

    changeHandlerMinimumLoad = (e) => {
        this.setState({selectedMinimumLoad: e.target.value})
    }

    clickHandlerAdd = () => {
        // Add the new year to the years table in the db 
        if (this.state.selectedNewYear != "" && this.state.selectedMinimumLoad != "") {
            this.addYear(); 
            this.props.closeMethod(); 
            this.props.refreshMethod(); 
            this.refreshManageYears();
        }    
    }

    refreshManageYears = () => {
        this.setState({yearsFetched: false});
        this.setState({selectedNewYear: ""});  
    }

    render() {

        if (!this.state.yearsFetched) { 
            this.getAllYears();  
            this.setState({yearsFetched: true})
          }

        return (
            <div>
                <YearList 
                    yearList={this.state.years} 
                    refreshMethod={this.props.refreshMethod} 
                    refreshManageYears = {this.refreshManageYears}/>

                <div className="form-group" style={{marginTop: "20px"}}>
                    <label>Year: </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{marginTop: "10px"}}
                      value={this.state.selectedNewYear}
                      onChange={this.changeHandlerNewYear}>
                    </input>
                </div>

                 <div className="form-group">
                    <label>Minimum Load: </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{marginTop: "10px"}}
                        value={this.state.selectedMinimumLoad}
                        onChange={this.changeHandlerMinimumLoad}>
                    </input>
                </div>

                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginLeft: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add Year
                </Button>
            </div>
        )
    }
}

export default ManageYears; 