
const sqlInsertAcademicAllocation = ( name, YearID, Load) => 
{
    sqlpt1 = "INSERT OR IGNORE INTO AcademicAllocation(AcademicID, YearID,Load, UnitLoad, ActualLoad, LoadError,AcademicAllocationCode) ";
    sqlpt2 = "VALUES ((SELECT AcademicID FROM Academic WHERE Name = '"+ name +"'),'" + YearID + "','" + Load + "',(SELECT StandardLoad FROM Years WHERE YearID = '" + YearID + "')*" + Load + ",'0.0',-(SELECT StandardLoad FROM Years WHERE YearID = '" + YearID + "')*" + Load + ",(SELECT AcademicID FROM Academic WHERE Name = '"+ name +"')||'" + YearID + "')";
    console.log(sqlpt1 + sqlpt2)
    return sqlpt1 + sqlpt2;
}

module.exports = sqlInsertAcademicAllocation; 