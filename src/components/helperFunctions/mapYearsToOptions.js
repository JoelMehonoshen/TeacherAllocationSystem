
function mapYearsToOptions(yearList) {
    const yearOptions = []; 
    for (let i = 0; i < yearList.length; i++) {
        yearOptions.push({value: yearList[i].YearID, label: yearList[i].Year, minLoad: yearList[i].Minimum, standardLoad: yearList[i].StandardLoad});  
    } 
    return yearOptions; 
}

export default mapYearsToOptions; 