import React from "react";
import YearRow from "./YearRow.js"

export function YearList(props) {
    
    if (props.yearList != null) {
        return (
            <div>
            {
                props.yearList.map(year => {
                    if (year !== " ") {
                        return <YearRow yearID = {year.value} 
                                        year={year.label} 
                                        minLoad={year.minLoad}
                                        standardLoad={year.standardLoad}
                                        refreshMethod={props.refreshMethod} 
                                        refreshManageYears={props.refreshManageYears} />
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