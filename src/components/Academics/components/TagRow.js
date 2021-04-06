import React from "react";
import { MDBCloseIcon } from "mdbreact"; 
import "./academicStyles.css"; 


class TagRow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { 
        refreshMethod: this.props.refreshMethod, 
        }
    }

    removeTag() {
        let academicID = this.props.academicID; 
        let tag = this.props.tag;  
        
        const url = `http://localhost:3001/removeAcademicTag?tag=${tag}&academicID=${academicID}`; 

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
        console.log("CLOSE")
        this.removeTag(); 
        this.props.refreshMethod(); 
    }

    render() {
    console.log(this.props.tag); 
    return (
        <div className="tag">
            {this.props.tag}
            <MDBCloseIcon onClick={this.closeHandler}/> 
        </div>
    )}; 
}

export default TagRow; 