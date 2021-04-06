sqlAllocationUpdate = require("./sqlUpdateFunctions/sqlAllocationUpdate.js"); 
sqlAcademicUpdate = require("./sqlUpdateFunctions/sqlAcademicUpdate.js"); 

sqlSubjectUpdate = require("./sqlUpdateFunctions/sqlSubjectUpdate.js"); 



// Update SQL table based on changes made (allocation amounts)  
const applyChanges = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAllocationUpdate(query.newAllocationAmount, query.academicID, query.UnitYearCode, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
     
      // Change timeID to actual amount later, 1 for now 
      db.each(sqlAcademicUpdate(query.academicID, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      
      db.each(sqlSubjectUpdate(query.UnitYearCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = applyChanges; 