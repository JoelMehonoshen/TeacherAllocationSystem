import React from "react";
import { NavBar } from "../navBar/navBar.js";
import { UnitCardList } from "./components/UnitCardList.js"
import { Form, Button, Container } from "react-bootstrap"
import fetchResults from "../fetchResults/fetchResults.js"
import fetchResultsNew from "../fetchResults/fetchResultsNew.js"; 
import mapTagsToOptions from "../helperFunctions/mapTagsToOptions.js";
import mapYearsToOptions from "../helperFunctions/mapYearsToOptions.js"; 
import Select from "react-select";
import "./UnitTagging.css"
import AddUnit from "./components/AddUnit.js"; 
import Popup from "reactjs-popup"
import ManageTags from "../ManageTags/ManageTags.js"; 
import ManageYears from "../ManageYears/ManageYears.js"; 

class UnitTagging extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      loading: false,
      unitResults: null,
      error: false,
      selectedTags: "", 
      tagOptions: null, 
      yearOptions: null, 
      tagsFetched: false,
      tagSearchPerformed: false,
      newUpdate: false, 
      selectedYear: {value: 0, label: "select a year"}, 
      tagOptionsFetched: false, 
      yearOptionsFetched: false, 
      addUnitIsOpen: false,
      manageTagsIsOpen: false, 
      manageYearsIsOpen: false,  
    }
  }

  refreshMethod = () => { 
    // this.setState({tagSearchPerformed: false}); 
    this.setState({newUpdate: true}); 
    this.populateYears(); 
    this.populateTagOptions(); 
    this.getTagSearch(); 
  }

  updateFinishedMethod = () => {
    this.setState({newUpdate: false}) 
  }

  populateTagOptions() {
    const qString = `allTags=${true}`; 

    fetchResults(qString)
    .then(results => {   
        this.setState({tagOptions: mapTagsToOptions(results)}); 
    })
    .catch(e => {
        console.log(e.message); 
    })
  }

  getTagSearch = () => {  
    const tagsObject = this.state.selectedTags;
    const tags = []; 

    for (let i = 0; i < tagsObject.length; i++) {
      tags.push(tagsObject[i].value);  
    }

    const yearID = this.state.selectedYear.value; 

    const qString = `tagSearchUnits?tags=${tags}&yearID=${yearID}`; 
 
    fetchResultsNew(qString)
    .then(results => { 
      this.setState({loading: false}); 
      this.setState({unitResults: JSON.stringify(results)});
    })
    .catch(e => {
      this.setState({error: e});
      this.setState({loading: false});
    })
  }

  handlerTagSearch = (e) => {  
    // Check if tags have been removed
    if (this.state.selectedTags == null) {
      this.state.selectedTags = ""; 
    }
    this.getTagSearch();  
  }

  handleChangeTagSearch = async (selectedTags) => {
    await this.setState({ selectedTags });
    this.handlerTagSearch(); 
  }

  handleChangeSelectedYear = async (selectedYear) => {
    await this.setState({selectedYear});
    this.handlerTagSearch();  
  }

  populateYears = async () => {
    // Populate year options and set the selected year
    const qString = `allYears`; 

    await fetchResultsNew(qString)
    .then(results => {   
      const options = mapYearsToOptions(results); 
      this.setState({yearOptions: options});
    })
    .catch(e => {
        console.log(e.message); 
    })
  }

  handleAddUnitOpen = () => { 
    this.setState({addUnitIsOpen: true}); 
  }
  
  handleAddUnitClose = () => {
    this.setState({addUnitIsOpen: false});
  }
  
  handleManageTagsOpen = () => {
    this.setState({manageTagsIsOpen: true}); 
  }
  
  handleManageTagsClose = () => {
    this.setState({manageTagsIsOpen: false}); 
  }

  handleManageYearsOpen = () => {
    this.setState({manageYearsIsOpen: true}); 
  }

  handleManageYearsClose = () => {
    this.setState({manageYearsIsOpen: false}); 
  }

  render() {

    window.onbeforeunload=null; // Supress "reload page" warnings

    if (!this.state.tagOptionsFetched) {
      this.populateTagOptions();  
      this.setState({tagOptionsFetched: true}); 
    }

    if (!this.state.yearOptionsFetched) {
      this.populateYears(); 
      this.setState({yearOptionsFetched: true}); 
    }

    if (!this.state.tagSearchPerformed) {
      this.populateYears(); 
      this.getTagSearch();
      this.setState({tagSearchPerformed: true})
    }

    if (this.state.selectedYear.value != 0) {
    return (
      <Container fluid>

        <NavBar />
        <h1>Units</h1>
          <Form>
          <div className = "searchBars"> 
            <div className="searchBar">
              <Select
                    value ={this.state.selectedTags}
                    isMulti
                    options ={this.state.tagOptions}
                    onChange={this.handleChangeTagSearch}
                    placeholder= "Tag Search"
                  />
            </div>
            <div className = "yearSelector">
              <Select
                    value ={this.state.selectedYear}
                    options ={this.state.yearOptions}
                    onChange={this.handleChangeSelectedYear}
                    placeholder= "Select Year"
                  />
            </div>
          </div>
          
          <Popup 
            trigger={<Button
            variant = "light" 
            className = "button"
            style={{border: "1px solid"}}>
              + Add a new Unit
            </Button>} 
          position="right top"
          contentStyle={{border: "none", width: 320}}
          open={this.state.addUnitIsOpen}
          onOpen={this.handleAddUnitOpen}>
            <AddUnit
              closeMethod={this.handleAddUnitClose} 
              refreshMethod={this.refreshMethod}
              year={this.state.selectedYear}/>
          </Popup >

          <Popup 
            trigger={<Button
            variant = "light" 
            className = "button"
            style={{border: "1px solid"}}>
              Manage Tags
            </Button>} 
          position="right center"
          contentStyle={{border: "none", width: 320}}
          open={this.state.manageTagsIsOpen}
          onOpen={this.handleManageTagsOpen}>
            <ManageTags
              closeMethod={this.handleManageTagsClose} 
              refreshMethod={this.refreshMethod}/>
          </Popup >

          <Popup 
            trigger={<Button
            variant = "light" 
            className = "button"
            style={{border: "1px solid"}}>
              Manage Years
            </Button>} 
          position="right center"
          contentStyle={{border: "none", width: 320}}
          open={this.state.manageYearsIsOpen}
          onOpen={this.handleManageYearsOpen}>
            <ManageYears
              closeMethod={this.handleManageYearsClose} 
              refreshMethod={this.refreshMethod}/>
          </Popup >

        </Form>
        
        <br/>
        
        <div class = "card-group">
          <UnitCardList 
              list={this.state.unitResults} 
              refreshMethod={this.refreshMethod} 
              newUpdate={this.state.newUpdate} 
              updateFinishedMethod={this.updateFinishedMethod}
              year={this.state.selectedYear}/>
        </div>

      </Container>
    )}
  else {
    return(
      <Container fluid>

      <NavBar />
      <h1>Units</h1>
        <Form>
        <div className = "searchBars"> 
          <div className="searchBar">
            <Select
                  value ={this.state.selectedTags}
                  isMulti
                  options ={this.state.tagOptions}
                  onChange={this.handleChangeTagSearch}
                  placeholder= "Tag Search"
                />
          </div>
          <div className = "yearSelector">
            <Select
                  value ={this.state.selectedYear}
                  options ={this.state.yearOptions}
                  onChange={this.handleChangeSelectedYear}
                  placeholder= "Select Year"
                />
          </div>
        </div>
        
        <Popup 
          trigger={<Button
          variant = "light" 
          className = "button"
          style={{border: "1px solid"}}>
            + Add a new Unit
          </Button>} 
        position="right top"
        contentStyle={{border: "none", width: 320}}
        open={this.state.addUnitIsOpen}
        onOpen={this.handleAddUnitOpen}>
          <AddUnit
            closeMethod={this.handleAddUnitClose} 
            refreshMethod={this.refreshMethod}
            year={this.state.selectedYear}/>
        </Popup >

        <Popup 
          trigger={<Button
          variant = "light" 
          className = "button"
          style={{border: "1px solid"}}>
            Manage Tags
          </Button>} 
        position="right center"
        contentStyle={{border: "none", width: 320}}
        open={this.state.manageTagsIsOpen}
        onOpen={this.handleManageTagsOpen}>
          <ManageTags
            closeMethod={this.handleManageTagsClose} 
            refreshMethod={this.refreshMethod}/>
        </Popup >

        <Popup 
          trigger={<Button
          variant = "light" 
          className = "button"
          style={{border: "1px solid"}}>
            Manage Years
          </Button>} 
        position="right center"
        contentStyle={{border: "none", width: 320}}
        open={this.state.manageYearsIsOpen}
        onOpen={this.handleManageYearsOpen}>
          <ManageYears
            closeMethod={this.handleManageYearsClose} 
            refreshMethod={this.refreshMethod}/>
        </Popup >
      </Form>
      <div>
        Please select a year. 
      </div>
      </Container>
    )
  }};
  }

  export default UnitTagging; 