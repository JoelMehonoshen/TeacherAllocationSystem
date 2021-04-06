import React from "react";
import { Button } from "react-bootstrap";  

class RemoveAcademicPopup extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        }
    }
    
    clickHandlerYes = () => {
        this.props.yesMethod(); 
    }

    clickHandlerNo = () => {
        this.props.noMethod(); 
    }

    render() {
        return (
            <div>
                <p>Are you sure you want to remove this academic?</p>
                <p>This will also remove all allocations for this academic.</p>
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginLeft: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerYes()}}>Yes
                </Button>
                <Button
                    variant = "light" 
                    size="sm"
                    style={{marginLeft: "10px", border: "1px solid"}}
                    onClick={e => {
                        this.clickHandlerNo()}}>No
                </Button>
            </div>
        )
    }
}

export default RemoveAcademicPopup; 