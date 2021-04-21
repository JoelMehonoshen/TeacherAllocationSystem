import React from 'react';
import './importExport.css';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

import { Col, Row, Fade, FormFeedback, Container, Card } from 'reactstrap';
import { NavBar } from "../navBar/navBar.js";

import mapYearsToOptions from "../helperFunctions/mapYearsToOptions.js"; 
import fetchResultsNew from "../fetchResults/fetchResultsNew.js"; 
import Select from "react-select";

class Import extends React.Component {
    
    constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      fileToImport: null,
      cols: null,
      rows: null,
      yearsFetched: false, 
      selectedYear: {value: "1", label: "loading", minLoad: 0.8, standardLoad: 0.8}, 
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });
        }
      }); 
  }

  checkFile(file) {
    let errorMessage = null;
    if (!file) {
        console.log("No File Found");
      return false;
    }
    const isExcel =
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload an Excel file!";
    }
    if (errorMessage !== null) {
        console.log("errorMessage", errorMessage);
        return false;
    } else {
        return true;
    }
  }

  onFileChange = event => {
    // Update the state
    if (this.checkFile(event.target.files[0])) {
        this.setState({ fileToImport: event.target.files[0], isFormInvalid: false });
    }
    else {
        this.setState({ isFormInvalid: true});
    }
  };

    fileHandler = () => {
        if(this.checkFile(this.state.fileToImport)) {
            this.renderFile(this.state.fileToImport);
            this.datasplit(this.state.rows, this.state.cols);
        }    
        else {
            this.setState({ isFormInvalid: true});
        }
    };

  insertToDatabase = (url) => {  
        console.log("bruh");
        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
  }

  datasplit = (data,cols) => {
          if (data !== null) {

            //Years
            let minLoad = data[5][2]
            let yearID = this.state.selectedYear.value; 
            let standardLoad = data[1][2]
            this.insertToDatabase(`http://localhost:3001/import?tableName=years&yearID=${yearID}&minLoad=${minLoad}&standardLoad=${standardLoad}`)
            //Units
            for(let i = 7; i < cols.length;i++)
            {
                
                if(data[0][i] !== null)
                {
                //Call InsertUnit parsing 
                let unitCode = data[0][i]
                let unitName = data[1][i]
                this.insertToDatabase(`http://localhost:3001/import?tableName=units&unitCode=${unitCode}&unitName=${unitName}`); 
                }}
        
                //Call InsertSubject
                //Grab UnitCode
            for(let i = 7; i < cols.length;i++)
            {
                
                if(data[0][i] !== null)
                {
                let unitCode = data[0][i]
                let yearID = this.state.selectedYear.value; 
                let semester = data[2][i]
                let students = data[3][i]
                let share = data[4][i]
                let assignedLoad = data[5][i]
                let allocatedLoad = data[6][i]
                let loadError = data[7][i]
                if(semester.toString() === "1 & 2") { 
                    semester = 12; 
        
                } 
                
                
        
                const url = `http://localhost:3001/import?tableName=subject&unitCode=${unitCode}&yearID=${yearID}&semester=${semester}&students=${students}&share=${share}&assignedLoad=${assignedLoad}&allocatedLoad=${allocatedLoad}&loadError=${loadError}`;  
        
                this.insertToDatabase(url);
                } 
            }
                for(let i = 7; i < cols.length;i++)
            {
                
                if(data[0][i] !== null)
                {
                let unitCode = data[0][i]
                let yearID = this.state.selectedYear.value; 
                let semester = data[2][i]
                if(semester.toString() === "1 & 2") { 
                    semester = 12; 
            
                } 
                this.insertToDatabase(`http://localhost:3001/import?tableName=subjectpt2&unitCode=${unitCode}&yearID=${yearID}&semester=${semester}`);
                
                } 
            }
        
            for(let i = 8; i < data.length;i++)
            {
                
                if(data[i][4] !== null)
                {
                //Academic
                let name = data[i][0]
                let school = data[i][2]
                
                this.insertToDatabase(`http://localhost:3001/import?tableName=academic&name=${name}&school=${school}`);
        
                }}
                for(let i = 8; i < data.length;i++)
            {
                if(data[i][4] !== null)
                {
                let name = data[i][0]
                let yearID = this.state.selectedYear.value; 
                let load = data[i][3]
                let unitLoad = data[i][4]
                let actualLoad = data[i][5]
                let loadError = data[i][6]
                this.insertToDatabase(`http://localhost:3001/import?tableName=academicAllocation&name=${name}&yearID=${yearID}&load=${load}&unitLoad=${unitLoad}&actualLoad=${actualLoad}&loadError=${loadError}`);
        
                }}
                for(let i = 8; i < data.length;i++)
                {
                for (let j = 7; j < cols.length;j++)
                {
                    let name = data[i][0]
                    if(data[i][j] !== null)
                    {
                    let allocation = data[i][j]
                    let unitCode = data[0][j]
                    let yearID = this.state.selectedYear.value; 
                    let semester = data[2][j]
                    this.insertToDatabase(`http://localhost:3001/import?tableName=allocation&unitCode=${unitCode}&semester=${semester}&yearID=${yearID}&name=${name}&allocation=${allocation}`);
        
                    }
                }
                }
                for(let i = 8; i < data.length;i++)
                {
                    
                    if(data[i][4] !== null)
                    {
                    //Academic
                    let name = data[i][0]
                let yearID = this.state.selectedYear.value; 
                this.insertToDatabase(`http://localhost:3001/import?tableName=updateTags&yearID=${yearID}&name=${name}`)
                    }
            }
      
    
          }
    console.log("finished");
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }


  populateYears = async () => {
    // Populate year options and set the selected year
    const qString = `allYears`; 

    await fetchResultsNew(qString)
    .then(results => {   
      const options = mapYearsToOptions(results);
      this.setState({yearOptions: options});
      this.setState({selectedYear: options[0]}); 
    })
    .catch(e => {
        console.log(e.message); 
    })
  }

  handleChangeSelectedYear = (selectedYear) => {
    this.setState({selectedYear: selectedYear}); 
  }

  render() {

    window.onbeforeunload=null; // Supress "reload page" warnings

    if (!this.state.yearOptionsFetched) {
      this.populateYears(); 
      this.setState({yearOptionsFetched: true});  
    }

    return (
        <Container fluid>
        <Row>
          <Col>
            <NavBar />
          </Col>
        </Row>
        <Row className="form">
          <h1>Import</h1>
        </Row>

        <div className="yearSelector">
            <Select
              value ={this.state.selectedYear}
              options ={this.state.yearOptions}
              onChange={this.handleChangeSelectedYear}
              placeholder= "Select Year"
            />
        </div>

        <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.fileHandler.bind(this)}>Upload!</button>
            <FormFeedback>    
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                    Please select a .xlsx file only !
                  </Fade>                                                                
                </FormFeedback>
        </div>

        {this.state.dataLoaded && 
        <Row className="preview">
          <Card body outline color="secondary" className="restrict-card">
            
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
              
          </Card>  
        </Row>}
        </Container>
    );
  }
}

export default Import;
