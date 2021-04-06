import React from "react";
import { Row, Col } from "react-bootstrap"
import AcademicRow from "../AcademicRow/AcademicRow.js"

export function AcademicList(props) {
    
    
    if (props.list != null) {

        return (
            <div style={{padding: 10}}>
                {   
                    JSON.parse(props.list).map(academic => {
                        return <AcademicRow 
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
                    <label>YEET2</label>
                }
                </Col>
            </Row>
        ); 
    }

}
    