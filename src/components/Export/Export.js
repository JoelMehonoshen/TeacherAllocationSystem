import React from 'react';
import './export.css';

import { Button, Container } from 'reactstrap';
import { NavBar } from "../navBar/navBar.js";
import XLSX from 'xlsx';
import {saveAs} from 'file-saver';




// react-native-fs


import mapYearsToOptions from "../helperFunctions/mapYearsToOptions.js"; 
import fetchResultsNew from "../fetchResults/fetchResultsNew.js"; 
import Select from "react-select";

 class Export extends React.Component {
    
    constructor(props){
    super(props);
    this.state={
      yearOptions: null,
      yearsFetched: false, 
      selectedYear: null, 
      exportResults: null, 
    }
    
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

  export = async () => {
    this.setState({loading : "Getting data from database"})
    // Passes a yearID to the backend for exporting (does nothing else yet)
    const yearString = `export?tablename=year&yearID=${this.state.selectedYear.value}`;

    await fetchResultsNew(yearString)
    .then(results => { 
      this.setState({yearDetails: results}); 
    })
    .catch(e => {
      this.setState({error: e});
    })
    const academicYearString = `export?tablename=academicYear&yearID=${this.state.selectedYear.value}`;

    await fetchResultsNew(academicYearString)
    .then(results => { 

      this.setState({academicYearDetailsLength: JSON.stringify(results.length)});
      this.setState({academicYearDetails: results}); 
    })
    .catch(e => {
      this.setState({error: e});
    })
    let academicDetailstemp =Array(JSON.parse(this.state.academicYearDetailsLength));
    for (let i=0; i < this.state.academicYearDetailsLength; i++) {
      
    const academicString = `export?tablename=academic&yearID=${this.state.selectedYear.value}&academicID=${this.state.academicYearDetails[i].AcademicID}`;

    await fetchResultsNew(academicString) 
    .then(results => { 
      this.setState({academics: results}); 
      
      academicDetailstemp[i] = this.state.academics
    })
    .catch(e => {
      this.setState({error: e});
    })
    
  }
  this.setState({academicDetails: academicDetailstemp})
    const unitYearString = `export?tablename=unitYear&yearID=${this.state.selectedYear.value}`;

    await fetchResultsNew(unitYearString)
    .then(results => { 
      this.setState({unitYearDetailsLength: JSON.stringify(results.length)});
      this.setState({unitYearDetails: results}); 
    })
    .catch(e => {
      this.setState({error: e});
    })
    let unitDetailstemp = Array(JSON.parse(this.state.unitYearDetailsLength));
    for (let i=0; i < this.state.unitYearDetailsLength; i++) {
  const unitString = `export?tablename=unit&yearID=${this.state.selectedYear.value}&unitID=${this.state.unitYearDetails[i].UnitID}`;

    await fetchResultsNew(unitString)
    .then(results => { 
      this.setState({units: results}); 
      unitDetailstemp[i] = this.state.units
    })
    .catch(e => {
      this.setState({error: e});
    })
  }
  this.setState({unitDetails: unitDetailstemp})
  let allocationDetailstemp = [];
    for (let i=0; i < this.state.unitYearDetailsLength; i++) 
    {
      for (let j=0; j < this.state.academicYearDetailsLength; j++) 
      {
        const allocationString = `export?tablename=allocations&unitYearCode=${this.state.unitYearDetails[i].UnitYearCode}&academicAllocationCode=${this.state.academicYearDetails[j].AcademicAllocationCode}`;

        await fetchResultsNew(allocationString)
        .then(results => { 
        if (results[0] != null){
        
        this.setState({allocations: results}); 
        allocationDetailstemp.push(this.state.allocations)
        }
        })
        .catch(e => {
        this.setState({error: e});
        })
      }
    }
  this.setState({allocationDetails: allocationDetailstemp})
}

  handleChangeSelectedYear = (selectedYear) => {
    this.setState({selectedYear: selectedYear}); 
  }

  exportHandler = async () => {
    
      await this.export();

      // Check if year is populated
      // if(this.state.academicYearDetailsLength) {
      //   await this.organise(); 
      // }

      // else{
      //   alert("Please select a populated year."); 
      // }

      await this.organise(); 
       
  }
  organise()
  {
    this.setState({loading : "constructing xlsx"})
    var Letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var formatted = new Array(JSON.parse(this.state.academicYearDetailsLength)+10);
    for (var i = 0; i < formatted.length; i++) { 
      formatted[i] = new Array(JSON.parse(this.state.unitYearDetailsLength)+10);
    } 
    
    formatted[5][2] = this.state.yearDetails[0].Minimum
    
    formatted[1][0] = "Standard Load:";
    formatted[5][0] = "Minimum Load:";
    formatted[0][6] = "Code";
    formatted[1][6] = "Name";
    formatted[2][6] = "Sem";
    formatted[3][6] = "Students";
    formatted[4][6] = "Share";
    formatted[5][6] = "Assigned Load";
    formatted[6][6] = "Allocated Load";
    formatted[7][6] = "Load Error";
    formatted[7][5] = "Actual Load";
    formatted[7][4] = "Unit Load";
    formatted[7][3] = "Load";
    formatted[7][2] = "School";
    formatted[7][0] = "Academic";
    var o = 0;
    var icopy  = 7;
    var lett  = 0;
    for(let i = 7; i < JSON.parse(this.state.unitYearDetailsLength)+10;i++)
    {
      
      if (o < this.state.unitYearDetailsLength)
      {
      //semesters
      if (this.state.unitYearDetails[o].SemesterID == 3){
        formatted[2][i] = "1 & 2"
      }
      else{
      formatted[2][i] = JSON.stringify(this.state.unitYearDetails[o].SemesterID);
      }
      //students
      formatted[3][i] = this.state.unitYearDetails[o].Enrolled
      //Share
      formatted[4][i] = this.state.unitYearDetails[o].Share
      //Name and Code
      for(let j = 0; j < this.state.unitDetails.length;j++)
      {
        if (JSON.stringify(this.state.unitYearDetails[o].UnitID) == JSON.stringify(this.state.unitDetails[j][0].UnitID)){
          formatted[0][i] = this.state.unitDetails[j][0].UnitCode;
          formatted[1][i] = this.state.unitDetails[j][0].UnitName;
          break;
        }
      }
      if (icopy > 25)
      {
        icopy = 0;
        lett++;
      }
      var Letter = ""; 
      if (lett > 0) {
      Letter = Letters[lett-1]+Letters[icopy]
      }
      else{Letter = Letters[icopy]}
      formatted[5][i] = {f:"=MAX(LOG10("+Letter+"4/7),$C$6)*"+Letter+"5"};
      formatted[6][i] = {f:"=SUM("+Letter+"9:"+Letter+(8+JSON.parse(this.state.academicYearDetails.length))+")"};
      formatted[7][i] = {f:"=IF("+Letter+"5<>0,"+Letter+"7-1,"+Letter+"7)"};
      formatted[5][(9 +JSON.parse(this.state.unitYearDetailsLength))] = { f: "=SUM(H6:"+Letter+"6)"};
    }
    icopy++;
    o++;
    }
     o = 0;
     icopy  = 7 +JSON.parse(this.state.unitYearDetailsLength);
     lett  = 0;
    for(let i = 8; i < JSON.parse(this.state.academicYearDetailsLength)+10;i++)
    {
      if (o < JSON.parse(this.state.academicYearDetailsLength))
      {
      while (icopy > 25){
        icopy = icopy - 26;
        lett++;
      }
      var Letter = ""; 
      if (lett > 0) {
      Letter = Letters[lett-1]+Letters[icopy-1]
      }
      else{Letter = Letters[icopy]}
      formatted[i][3] = this.state.academicYearDetails[o].Load;
      
      formatted[i][4] = {f:'=D'+(i+1)+'*$C$2'};
      formatted[i][5] = {f:'=SUMPRODUCT(H$6:'+Letter+'$6,H'+(i+1)+':'+Letter+(i+1)+')'};
      formatted[i][6] = {f:'=F'+(i+1)+'-E'+(i+1)+''};

      for(let j = 0; j < JSON.parse(this.state.academicDetails.length);j++)
      {
      if (JSON.stringify(this.state.academicYearDetails[o].AcademicID) == JSON.stringify(this.state.academicDetails[j][0].AcademicID)){
          formatted[i][0] = this.state.academicDetails[j][0].Name;
          formatted[i][2] = this.state.academicDetails[j][0].School;
          break;
        }
      }
    }
      o++;
    }
    icopy  = 10 +JSON.parse(this.state.unitYearDetailsLength);
     lett  = 0;
     while (icopy > 25){
      icopy = icopy - 26;
      lett++;
    }
    var Letter = ""; 
    if (lett > 0) {
    Letter = Letters[lett-1]+Letters[icopy-1]
    }
    else{Letter = Letters[icopy]}
    formatted[1][2] = { f: "="+Letter+"6/D"+(JSON.parse(this.state.academicYearDetailsLength)+10)};
    formatted[5][(8 +JSON.parse(this.state.unitYearDetailsLength))] = "Total:";
    var pos = 9 + JSON.parse(this.state.academicYearDetailsLength)
    formatted[pos][2] = "Total";
    formatted[pos][3] = {f: '=SUM(D9:D'+(JSON.parse(this.state.academicYearDetailsLength)+8)+')'};
    formatted[pos][0] = {f:'=TEXT(COUNTA(A9:A'+(JSON.parse(this.state.academicYearDetailsLength)+8)+'),"0")&" bodies"'};

    for (let i = 8; i < JSON.parse(this.state.academicYearDetailsLength)+8;i++){
      for (let j = 7; j < JSON.parse(this.state.unitYearDetailsLength)+7;j++){
        var acti = i-8
        var actj = j-7
        for(let k = 0; k < JSON.parse(this.state.allocationDetails.length);k++)
        {
        if (this.state.allocationDetails[k][0].AcademicAllocationCode == this.state.academicYearDetails[acti].AcademicAllocationCode && this.state.allocationDetails[k][0].UnitYearCode == this.state.unitYearDetails[actj].UnitYearCode){
        formatted[i][j] = this.state.allocationDetails[k][0].AllocationAmount}
        }
      }
    }
    
    this.setState({loading : "Done"})

    // JSON.stringify(this.state.allocationDetails)
    this.setState({exportformat: formatted})


    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "SheetJS Tutorial",
      Subject: "Test",
      Author: "Red Stapler",
      CreatedDate: new Date(2017,12,19)
};
    wb.SheetNames.push("Test Sheet");
    var ws_data = formatted;  //a row with 2 columns
    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            
    function s2ab(s) { 
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf);  //create uint8array as viewer
      for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
      return buf;    
}
    
      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Allocations'+JSON.stringify(this.state.yearDetails[0].Year)+'.xlsx');

  }
  render() {

    window.onbeforeunload=null; // Supress "reload page" warnings

    if (!this.state.yearOptionsFetched) {
      this.populateYears();
      
      this.setState({yearOptionsFetched: true});  
    }

    return (
        <Container fluid>

            <NavBar />

            <h1 className = "title">Export</h1>

            <div className="form">
        
                <p>Select a year to export</p>
                
                <Select
                value ={this.state.selectedYear}
                options ={this.state.yearOptions}
                onChange={this.handleChangeSelectedYear}
                placeholder= "Select Year"
                />

                <Button
                    variant = "light" 
                    className = "button"
                    onClick = {this.exportHandler}
                    style={{border: "1px solid"}}>
                        Export
                </Button>
                

                <p>{JSON.stringify(this.state.loading)}</p>

            </div>
            
            
        </Container>
        
    );
  }
}

export default Export;
