sqlAssignAcademicTags = require("./sqlUpdateFunctions/sqlAssignAcademicTags.js"); 

sqlUpdateTagsUnit = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 
sqlSelectYearsToUpdates = require("./sqlGetFunctions/sqlSelectYearToUpdates.js"); 
const assignAcademicTags = async (db, query) => {
  assignTag(db, query);
  const Years = await YearsTo(db, query);
  updateTags(db, query, Years);
}
// Allocates a unit to a specified academic 
const assignTag = (db, query) => { 
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAssignAcademicTags(query.academicID, query.tagsToAssign), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
}
const updateTags = (db, query,years) => { 

      
  return new Promise((resolve, reject) => {
    let result = []; 

  for (let i=0; i < years.length; i++) {
    db.each(sqlUpdateTags(query.academicID, years[i].YearID), (err, row) => {
        if (err) { console.log(err) }
        result.push(row); 
    })
}
})
}
const YearsTo = (db, query) => { 

return new Promise((resolve, reject) => {
  let result = []; 
// Change timeID to actual amount later, 1 for now 
db.each(sqlSelectYearsToUpdates(query.academicID), (err, row) => {
  if(err) {reject(err)}
  result.push(row)
}, () => {
  resolve(result)
})

})


}

module.exports = assignAcademicTags; 