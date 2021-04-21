import React from "react";
import TagRow from "./TagRow.js"
import "./academicStyles.css"

export function TagList(props) {


    // const newList = props.tagList.AcademicTags.split(":"); 
    return (
        <div>
        {
            props.tagList.map(tag => {
                if (tag !== " ") {
                    return <TagRow tag = {tag} academicID={props.academicID} refreshMethod={props.refreshMethod} />
                } 
                return <div></div>
            })
        }
        </div>
    ); 
}