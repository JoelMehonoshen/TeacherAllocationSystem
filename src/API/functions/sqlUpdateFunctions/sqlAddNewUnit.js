
//sql query that addes a new unit to a year
const sqlAddNewUnit = (unitCode,yearID,minLoad,semesterID,share,enrolled) => 
{
 

    AssignedLoad = Math.max(Math.log10(enrolled/7),minLoad)*share;
    sqlpt1 = "INSERT OR IGNORE INTO UnitYear(UnitID, YearID, SemesterID, Share , Enrolled,AssignedLoad, AlocatedLoad, LoadError,UnitYearCode)";
    sqlpt2 = "VALUES ((SELECT UnitID FROM Units WHERE UnitCode = '" + unitCode + "'),'" + yearID + "','" + semesterID + "','" + share + "','" + enrolled + "','" + AssignedLoad + "','0','0',(SELECT UnitID FROM Units WHERE UnitCode = '" + unitCode + "')||'" + yearID + "'||'" + semesterID + "')";

    return sqlpt1 + sqlpt2;
}


module.exports = sqlAddNewUnit;