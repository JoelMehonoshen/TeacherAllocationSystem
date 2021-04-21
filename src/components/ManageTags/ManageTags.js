import React from "react";
import { Button } from "react-bootstrap";
import fetchResults from "../fetchResults/fetchResults"; 
import { TagList } from "./components/TagList.js"; 

class ManageTags extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            tagsFetched: false,
            tags: null,
            selectedNewTag: "", 
        }
    }

    getAllTags = () => {
        const qString = `allTags=${true}`; 

        fetchResults(qString)
        .then(results => {   
            this.setState({loading: false});  

            // Build tag list from results
            const tagsList = []; 
            for (let i = 0; i < results.length; i++) {
                tagsList.push(results[i].Tag); 
            } 

            this.setState({tags: tagsList}); 
        })
        .catch(e => {
            console.log(e.message); 
        })
    }

    addTag() {
        let tag = this.state.selectedNewTag;   
        
        const url = `http://localhost:3001/addTag?tag=${tag}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    changeHandlerNewTag = (e) => {
        this.setState({selectedNewTag: e.target.value})
    }

    clickHandlerAdd = () => {
        // Add the new tag to the tags table in the db
        if (this.state.selectedNewTag !== "") {
            this.addTag(); 
            this.props.closeMethod(); 
            this.props.refreshMethod(); 
            this.refreshManageTags();
        }    
    }

    refreshManageTags = () => {
        this.setState({tagsFetched: false});
        this.setState({selectedNewTag: ""});  
    }

    render() {

        if (!this.state.tagsFetched) { 
            this.getAllTags();  
            this.setState({tagsFetched: true})
          }

        return (
            <div>
                <TagList tagList={this.state.tags} refreshMethod={this.props.refreshMethod} refreshManageTags = {this.refreshManageTags}/>
                <input
                    style={{marginTop: "10px"}}
                    value={this.state.selectedNewTag}
                    onChange={this.changeHandlerNewTag}>
                </input> 
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginLeft: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerAdd()}}>Add Tag
                </Button>
            </div>
        )
    }
}

export default ManageTags; 