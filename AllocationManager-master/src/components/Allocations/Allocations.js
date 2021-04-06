import React from "react";
import { NavBar } from "../navBar/navBar.js";
import { Row, Col, Container } from "react-bootstrap"
import { AcademicList } from "../AcademicList/AcademicList.js"; 
import { UnderAllocatedAcademicList } from "../UnderAllocatedAcademicList/UnderAllocatedAcademicList.js"; 
import { UnderAllocatedUnitList } from "../UnderAllocatedUnitList/UnderAllocatedUnitList.js"; 
import "./Allocations.css"
import { Form, Button } from "react-bootstrap";
import Select from "react-select"; 
import fetchResults from "../fetchResults/fetchResults.js"
import fetchResultsNew from "../fetchResults/fetchResultsNew.js";
import mapTagsToOptions from "../helperFunctions/mapTagsToOptions.js"; 
import mapYearsToOptions from "../helperFunctions/mapYearsToOptions.js";
import Popup from "reactjs-popup"
import ManageYears from "../ManageYears/ManageYears.js";

class Allocations extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      underAllocatedFetched: false, 
      loading: false,
      academicResults: null,
      underAllocatedUnits: null,
      underAllocatedAcademics: null,
      error: false,
      selectedTags: "", 
      tagOptions: null, 
      tagsFetched: false,
      tagSearchPerformed: false,
      newUpdate: false, 
      tagOptionsFetched: false, 
      yearOptionsFetched: false, 
      yearOptions: null, 
      selectedYear: {value: 0, label: "select a year"},
      manageYearsIsOpen: false,   
    }
  }

  handleManageYearsOpen = () => {
    this.setState({manageYearsIsOpen: true}); 
  }

  handleManageYearsClose = () => {
    this.setState({manageYearsIsOpen: false}); 
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

    const qString = `tagSearchAcademics?tags=${tags}&yearID=${yearID}`; 

    fetchResultsNew(qString)
    .then(results => { 
      this.setState({loading: false});
      this.setState({academicResults: JSON.stringify(results)}); 
    })
    .catch(e => {
      this.setState({error: e});
      this.setState({loading: false});
    })
  }

  getUnderAllocated = (filter) => {  

    const yearID = this.state.selectedYear.value; 
    const qString = `underAllocated=${filter}&yearID=${yearID}`; 

    fetchResults(qString)
    .then(results => { 
      this.setState({loading: false});
      if (filter == "academics") {
        this.setState({underAllocatedAcademics: JSON.stringify(results)});
      }
      else if (filter == "units") {
        this.setState({underAllocatedUnits: JSON.stringify(results)});
      }
    })
    .catch(e => {
      console.log(e.message); 
      this.setState({error: e});
      this.setState({loading: false});
    })
  }

  handlerTagSearch = () => {  
    // Check if tags have been removed 
    if (this.state.selectedTags == null) {
      this.state.selectedTags = ""; 
    }
    this.getTagSearch(); 
  }

  handleChangeTagSearch = async (selectedTags) => {
    await this.setState({selectedTags}); 
    this.handlerTagSearch();    
  }

  refreshMethod = () => {
    this.setState({underAllocatedFetched: false}); 
    this.setState({tagSearchPerformed: false}); 
    this.setState({newUpdate: true}); 
    this.populateYears(); 
    this.populateTagOptions(); 
  }

  updateFinishedMethod = () => {
    this.setState({newUpdate: false});  
  }

  handleChangeSelectedYear = async (selectedYear) => {
    await this.setState({selectedYear});
    this.handlerTagSearch(); 
    this.setState({underAllocatedFetched: false});
  }

  populateYears = async () => {
    // Populate year options and set the selected year
    const qString = `allYears`; 

    await fetchResultsNew(qString)
    .then(results => {   
      const options = mapYearsToOptions(results);
      this.setState({yearOptions: options});
      // this.setState({selectedYear: options[0]}); 
    })
    .catch(e => {
        console.log(e.message); 
    })
  }

  render() {

    window.onbeforeunload=null; // Supress "reload page" warnings

    if (!this.state.underAllocatedFetched) {
      this.getUnderAllocated("academics"); 
      this.getUnderAllocated("units"); 
      this.setState({underAllocatedFetched: true})
    }

    if (!this.state.tagOptionsFetched) {
      this.populateTagOptions();  
      this.setState({tagOptionsFetched: true})
    }

    if (!this.state.yearOptionsFetched) {
      this.populateYears(); 
      this.setState({yearOptionsFetched: true}); 
    }

    if (!this.state.tagSearchPerformed) {
      this.getTagSearch();  
      this.setState({tagSearchPerformed: true})
    }

    if (this.state.selectedYear.value != 0) { 
    return (
      <Container fluid>
        
        {// NAVBAR
        }
        <Row>
          <Col>
            <NavBar />
          </Col>
        </Row>

        {// HEADER
        }
        <Row>
          <Col>
            <h1>Allocations</h1>
          </Col>
        </Row>

        
          {// SEARCH BAR 
           // Note: This should be its own component
          }
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
                <div>
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
                </div>
              </div>
            </Form>

        {// MAIN TABLE
        }
        <Row noGutters="True" style={{paddingTop: 20}}>

          {// ACADEMICS TABLE (SEARCH RESULTS)
          }
          {/*need to alter for the introduction of a line to distinguish academic from unit*/}
          <Col className="block-example border border border-dark" noGutters="True">
            <AcademicList 
              list={this.state.academicResults} 
              refreshMethod={this.refreshMethod} 
              newUpdate={this.state.newUpdate} 
              updateFinishedMethod={this.updateFinishedMethod}
              year={this.state.selectedYear}/>
          </Col>

          {// UNDER-ALLOCATED UNITS 
          }
          <Col md={1.5} className="block-example border border-left-0 border-dark" >
            <UnderAllocatedUnitList list={this.state.underAllocatedUnits} refreshMethod={this.refreshResults}/>
          </Col>

          {// UNDER-ALLOCATED ACADEMICS
          }
          <Col md={2} className="block-example border border-left-0 border-dark"  >
            <UnderAllocatedAcademicList list={this.state.underAllocatedAcademics} refreshMethod={this.refreshResults}/>
          </Col>
        </Row>

      </Container>
    )
  } 
    else {
      return(
        <Container fluid>
        
        {// NAVBAR
        }
        <Row>
          <Col>
            <NavBar />
          </Col>
        </Row>

        {// HEADER
        }
        <Row>
          <Col>
            <h1>Allocations</h1>
          </Col>
        </Row>

        
          {// SEARCH BAR 
           // Note: This should be its own component
          }
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
                <div>
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
                </div>
              </div>
            </Form>
            <div>
              Please select a year. 
            </div>
            </Container>
      )
    }
  }
};

export default Allocations; 
