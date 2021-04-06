
const sqlUpdateYearMinLoad = (yearID, newMinLoad) => {
    return("UPDATE Years SET Minimum = '"+newMinLoad+"' WHERE YearID = '"+yearID+"'");
}

module.exports = sqlUpdateYearMinLoad; 