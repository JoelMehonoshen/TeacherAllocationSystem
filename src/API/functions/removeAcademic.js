const removeAcademic = (db, query) => {
    console.log("YEETYUM"); 
    console.log(query); 
    // Remove an academic with the given academicID and yearID (both lowercase)
    // Also perform any updates necessary
sqlRemoveAllocationsAca = require("./sqlUpdateFunctions/sqlRemoveAllocationsAca.js"); 
sqlRemoveAcademic = require("./sqlUpdateFunctions/sqlRemoveAcademic.js");


  console.log(query); 
  removeAllocations(db, query);
  removeAcademic2(db, query);
}


// Allocates a unit to a specified academic 
const removeAllocations = (db, query) => { 
    console.log("REMOVE allocations"); 
    
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlRemoveAllocationsAca(query.academicAllocationCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      
      console.log("REMOVED allocations");
    })
  }

const removeAcademic2 = (db, query) => { 
      console.log("REMOVE UNIT"); 
      
      return new Promise((resolve, reject) => {
        let result = []; 
      
      db.each(sqlRemoveAcademic(query.academicID,query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      console.log("REMOVED Unit")
    })
  }

  module.exports = removeAcademic; 