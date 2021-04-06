sqlRemoveAcademicTag = require("./sqlUpdateFunctions/sqlRemoveAcademicTag.js"); 
sqlUpdateTagsUnit = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 
sqlSelectYearsToUpdates = require("./sqlGetFunctions/sqlSelectYearToUpdates.js"); 
const removeAcademicTag = async (db, query) => {
  removeTag(db, query);
  const Years = await YearsTo(db, query);
  updateTags(db, query, Years);
}
// Get all the tags for a specified academic 
const removeTag = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlRemoveAcademicTag(query.tag, query.academicID), (err, row) => {
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

module.exports = removeAcademicTag; 