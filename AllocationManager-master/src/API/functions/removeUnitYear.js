
sqlRemoveAllocations = require("./sqlUpdateFunctions/sqlRemoveAllocations.js"); 
sqlRemoveUnit = require("./sqlUpdateFunctions/sqlRemoveUnit.js");
sqlUpdateTagsUnit = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 
sqlSelectAcademicTagUpdates = require("./sqlGetFunctions/sqlSelectAcademicTagUpdates.js"); 

const removeUnitYear = async (db, query) => {
  removeAllocations(db, query);
  removeUnit(db, query);
  const Academics = await AcademicTags(db, query);
  updateTags(db, query, Academics);
}


// Allocates a unit to a specified academic 
const removeAllocations = (db, query) => { 
    console.log("REMOVE allocations"); 
    
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlRemoveAllocations(query.unitYearCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      
      console.log("REMOVED allocations");
    })
  }

const removeUnit = (db, query) => { 
      console.log("REMOVE UNIT"); 
      
      return new Promise((resolve, reject) => {
        let result = []; 
      
      db.each(sqlRemoveUnit(query.unitYearCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      console.log("REMOVED Unit")
    })
  }
  const updateTags = (db, query,academics) => { 

      
    return new Promise((resolve, reject) => {
      let result = []; 
     console.log(academics)
    for (let i=0; i < academics.length; i++) {
      db.each(sqlUpdateTags(academics[i].AcademicID, academics[i].YearID), (err, row) => {
          if (err) { console.log(err) }
          result.push(row); 
      })
  }
  })
  }
  const AcademicTags = (db, query) => { 
  
  return new Promise((resolve, reject) => {
    let result = []; 
  // Change timeID to actual amount later, 1 for now 
  db.each(sqlSelectAcademicTagUpdates(query.UnitCode), (err, row) => {
    if(err) {reject(err)}
    result.push(row)
  }, () => {
    resolve(result)
  })
  
  })
  
  
  }

module.exports = removeUnitYear; 