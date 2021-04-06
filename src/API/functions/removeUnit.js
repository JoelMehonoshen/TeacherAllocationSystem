sqlAcademicUpdate = require("./sqlUpdateFunctions/sqlAcademicUpdate.js"); 

sqlSubjectUpdate = require("./sqlUpdateFunctions/sqlSubjectUpdate.js"); 
sqlDeleteUnit = require("./sqlUpdateFunctions/sqlDeleteUnit.js"); 
sqlUpdateTags = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 

const removeUnit = (db, query) => {
  deleteUnit(db, query);
  
  academicUpdate(db, query);
  subjectUpdate(db, query)
  updateTags(db,query)
}


// Allocates a unit to a specified academic 
const deleteUnit = (db, query) => { 

    
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlDeleteUnit(query.UnitYearCode, query.academicID, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      

    })
  }

const academicUpdate = (db, query) => { 
 
      
      return new Promise((resolve, reject) => {
        let result = []; 
      // Change timeID to actual amount later, 1 for now 
      db.each(sqlAcademicUpdate(query.academicID, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

    })
  }
  
  const subjectUpdate = (db, query) => { 
 
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlSubjectUpdate(query.UnitYearCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

    })
  }
    const updateTags = (db, query) => { 

      
      return new Promise((resolve, reject) => {
        let result = []; 
      // Change timeID to actual amount later, 1 for now 
      db.each(sqlUpdateTags(query.academicID, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

    })
  
    
}

module.exports = removeUnit; 