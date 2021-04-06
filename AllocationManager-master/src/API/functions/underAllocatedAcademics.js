
// Get all under allocated academics
const underAllocatedAcademics = (db, yearID) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUnderAllocatedAcademics(yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }    

const sqlUnderAllocatedAcademics = (yearID) => {
    return (`SELECT DISTINCT Academic.AcademicID, Academic.Name, AcademicAllocation.Load, AcademicAllocation.UnitLoad , AcademicAllocation.ActualLoad, AcademicAllocation.LoadError 
    FROM Academic,AcademicAllocation
    WHERE Academic.AcademicID = AcademicAllocation.AcademicID
    AND AcademicAllocation.YearID = '${yearID}'
    AND AcademicAllocation.LoadError < -0.05`); 
}

module.exports = underAllocatedAcademics