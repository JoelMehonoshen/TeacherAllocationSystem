
// Get all under allocated units
const underAllocatedUnits = (db, yearID) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUnderAllocatedUnits(yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }    

const sqlUnderAllocatedUnits = (yearID) => {
    return (`SELECT DISTINCT Semesters.Semester, Units.UnitCode, UnitYear.AssignedLoad, UnitYear.LoadError
    FROM UnitYear,Units,Semesters
    WHERE  UnitYear.UnitID = Units.UnitID
    AND UnitYear.SemesterID = Semesters.SemesterID
    AND UnitYear.YearID = '`+yearID+`'
    AND UnitYear.LoadError < 0.0
    ORDER BY Units.UnitCode ASC`); 
}

module.exports = underAllocatedUnits; 