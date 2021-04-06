import React from "react";
import { Row } from "react-bootstrap"
import UnitRow from "../UnitRow/UnitRow.js"

export function UnitList(props) {
    return (
        <Row>
        {
            JSON.parse(props.unitList).map(unit => {
                return <UnitRow unit = {unit} 
                                academicID={props.academicID} 
                                refreshMethod={props.refreshMethod} 
                                year={props.year}/>
            })
        }
        </Row>
    ); 
}