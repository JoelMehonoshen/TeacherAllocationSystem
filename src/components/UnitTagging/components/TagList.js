import React from "react";
import TagRow from "./TagRow.js"
import "./unitStyles.css"

export function TagList(props) {


    // const newList = props.tagList.AcademicTags.split(":");
    
    
    if (props.tagList !== null) {
        return (
            <div>
            {
                props.tagList.map(tag => {
                    if (tag !== " ") {
                        return <TagRow tag = {tag} unitCode={props.unitCode} refreshMethod={props.refreshMethod} />
                    }
                    return (
                        <div>
                        </div>
                    ) 
                    
                })
            }
            </div>
        ); 
    }

    else {
        return (
            <div>
                <label>Loading</label>
            </div>
        )}
    
}