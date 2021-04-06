import React from "react";
import { Row, Col } from "react-bootstrap"
import UnitCardRow from "./UnitCardRow.js"

export function UnitCardList(props) {
    
    
    if (props.list != null) { 
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {   
                    JSON.parse(props.list).map(unit => {
                        return <UnitCardRow 
                                    unit = {unit} 
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