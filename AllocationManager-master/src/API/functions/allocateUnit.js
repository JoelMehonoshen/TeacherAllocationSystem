sqlAcademicUpdate = require("./sqlUpdateFunctions/sqlAcademicUpdate.js"); 
sqlSubjectUpdate = require("./sqlUpdateFunctions/sqlSubjectUpdate.js"); 
sqlUpdateTags = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 

// Allocates a unit to a specified academic 
const allocateUnit = (db, query) => { 
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAddAllocation(query.allocationAmount, query.academicID,query.yearID, query.UnitYearCode), (err, row) => {
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

      // Change timeID to actual amount later, 1 for now 

      
      db.each(sqlSubjectUpdate(query.UnitYearCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      

        db.each(sqlUpdateTags(query.academicID, query.yearID), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
  
      
    
      
  
    })
}
const sqlAddAllocation = (allocationAmount, academicID,yearID,UnitYearCode) => 
{
    sqlpt1 = "INSERT INTO Allocation ";
    sqlpt2 = "VALUES (" + UnitYearCode + "," + academicID + yearID +"," + allocationAmount + ")";
    return sqlpt1 + sqlpt2;
} 


module.exports = allocateUnit; 