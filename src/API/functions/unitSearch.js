
// Gets the units for a specified academic
const unitSearch = (db, academicAllocationCode, yearID) => {
    return new Promise((resolve, reject) => {
      let result = [];
      db.each(sqlUnitSearch(academicAllocationCode, yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }    

const sqlUnitSearch = (academicAllocationCode, yearID) => {
    sqlpt1 = "SELECT UnitYear.UnitYearCode, Semesters.Semester, Units.UnitCode, UnitYear.AssignedLoad, Allocation.AllocationAmount, UnitYear.LoadError FROM UnitYear,Units,Semesters,Allocation WHERE  UnitYear.UnitID = Units.UnitID AND UnitYear.UnitYearCode = Allocation.UnitYearCode AND UnitYear.SemesterID = Semesters.SemesterID AND Allocation.AcademicAllocationCode =";
    sqlpt2 = "'" + academicAllocationCode + "' AND UnitYear.YearID = '" + yearID + "'";
    sqlpt3 = "ORDER BY Units.UnitCode ASC";
    return sqlpt1 + sqlpt2 + sqlpt3;
}

module.exports = unitSearch; 