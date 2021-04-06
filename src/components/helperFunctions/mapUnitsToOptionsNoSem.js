
// A version of map units to options that only displays the unitlist, no semesters 
function mapUnitsToOptionsNoSem(unitsList) {
    const unitOptions = new Set(); 
    for (let i = 0; i < unitsList.length; i++) {
        unitOptions.add({value: unitsList[i].UnitCode, label: unitsList[i].UnitCode});  
    } 
    return Array.from(unitOptions); 
}

export default mapUnitsToOptionsNoSem; 