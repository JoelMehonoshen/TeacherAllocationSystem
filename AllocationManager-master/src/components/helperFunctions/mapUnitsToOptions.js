
function mapUnitsToOptions(unitsList) {
    const unitOptions = []; 
    for (let i = 0; i < unitsList.length; i++) {
        unitOptions.push({value: unitsList[i].UnitYearCode, label: "Sem " + unitsList[i].Semester + " " + unitsList[i].UnitCode});  
    } 
    return unitOptions; 
}

export default mapUnitsToOptions; 