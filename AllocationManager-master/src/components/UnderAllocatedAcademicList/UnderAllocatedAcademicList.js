import React from "react";
import { Row, Col } from "react-bootstrap"
import UnderAllocatedAcademicRow from "../UnderAllocatedAcademicRow/UnderAllocatedAcademicRow.js"

export function UnderAllocatedAcademicList(props) {
    
    if (props.list != null) {

        return (
            <div style={{padding: 10}}>
            <h6 style={{textAlign: "center"}}>Under-allocated Academics</h6>
                {   
                    JSON.parse(props.list).map(academic => {
                        return <UnderAllocatedAcademicRow academic = {academic} refreshMethod={props.refreshMethod} />
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