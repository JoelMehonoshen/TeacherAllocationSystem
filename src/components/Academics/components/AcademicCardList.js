import React from "react";
import { Row, Col } from "react-bootstrap"
import AcademicCardRow from "./AcademicCardRow.js"

export function AcademicCardList(props) {
    
    
    if (props.list != null) { 
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {   
                    JSON.parse(props.list).map(academic => {
                        return <AcademicCardRow 
                                    academic = {academic} 
                                    refreshMethod={props.refreshMethod} 
                                    newUpdate={props.newUpdate} 
                                    updateFinishedMethod={props.updateFinishedMethod}
                                    year={props.year}/>
                    })
                }
            </div>
        ); 
    }

    else {
        return (
            <Row>
                <Col>
                {
                    <label>Loading</label>
                }
                </Col>
            </Row>
        ); 
    }

}