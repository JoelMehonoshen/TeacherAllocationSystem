import React from "react";
import { MDBCloseIcon } from "mdbreact"; 


class TagRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { 
        refreshMethod: this.props.refreshMethod, 
        }
    }

    removeTag() {
        let tag = this.props.tag;  
        
        const url = `http://localhost:3001/removeTag?tag=${tag}`; 

        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
    }

    closeHandler = () =>  {
        // Un-allocate the unit from the academic 
        this.removeTag(); 
        this.props.refreshMethod(); 
        this.props.refreshManageTags(); 
    }

    render() { 
    return (
        <div className="tag">
            {this.props.tag}
            <MDBCloseIcon onClick={this.closeHandler}/> 
        </div>
    )}; 
}

export default TagRow; 