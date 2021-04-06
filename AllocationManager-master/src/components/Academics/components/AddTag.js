import React from "react";
import Select from "react-select"
import { Button } from "react-bootstrap";
import fetchResults from "../../fetchResults/fetchResults.js"; 
import mapTagsToOptions from "../../helperFunctions/mapTagsToOptions.js"; 

class AddTag extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedTags: null,
            tagsFetched: false,
            tags: null, 
        }
    }

    getTags() {
        const qString = `allTagsExcludingSome=${this.getTagsToExclude()}`;
        console.log(this.getTagsToExclude());  

        fetchResults(qString)
        .then(results => { 
            console.log(results);  
            this.setState({tags: mapTagsToOptions(results)}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    getTagsToExclude = () => {
        const tagsToExclude = this.props.tagList; 
        return tagsToExclude; 
    }

    handleChangeTag = (selectedTags) => {
        this.setState({ selectedTags })
    }

    allocateTags() {

        // Assign all selected tags to an academic 
        const academicID = this.props.academicID;  

        const selectedTags = this.state.selectedTags; 
        // console.log(selectedTags[0]);

        const tagsToAssign = []; 
        for (let i = 0; i < selectedTags.length; i++) {
            console.log(selectedTags[i])
            tagsToAssign.push(selectedTags[i].value);  
        } 

        const url = `http://localhost:3001/assignAcademicTags?academicID=${academicID}&tagsToAssign=${tagsToAssign}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }


    clickHandlerAdd = () => {
        if (this.state.selectedTags != null) {
            this.allocateTags();
        }
        this.props.closeMethod(); 
        this.props.refreshMethod();  
    }
    
    render() {

        if (!this.state.tagsFetched) { 
            this.getTags();  
            this.setState({tagsFetched: true})
          }

        return (
            <form style={{padding: 30}}>
                <div style={{width: 250}}>
                <Select
                    value ={this.state.selectedTag}
                    options ={this.state.tags}
                    onChange={this.handleChangeTag}
                    placeholder= "Search Tags to Add"
                    openMenuOnClick={false}
                    isMulti
                />
                </div>
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginTop: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add all</Button>
            </form>
        )
    }
}

export default AddTag; 