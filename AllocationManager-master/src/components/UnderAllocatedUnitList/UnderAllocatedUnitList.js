import React from "react";
import { Row, Col } from "react-bootstrap"
import UnderAllocatedUnitRow from "../UnderAllocatedUnitRow/UnderAllocatedUnitRow.js"

export function UnderAllocatedUnitList(props) {
    
    if (props.list != null) {

        return (
            <div style={{padding: 10}}>
            <h6 style={{textAlign: "center"}}>Under-allocated Units</h6>
                {   
                    JSON.parse(props.list).map(unit => {
                        return <UnderAllocatedUnitRow unit = {unit} refreshMethod={props.refreshMethod} />
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