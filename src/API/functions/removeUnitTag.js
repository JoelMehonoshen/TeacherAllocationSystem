sqlRemoveUnitTag = require("./sqlUpdateFunctions/sqlRemoveUnitTag.js"); 
sqlUpdateTagsUnit = require("./sqlUpdateFunctions/sqlUpdateTags.js"); 
sqlSelectAcademicTagUpdates = require("./sqlGetFunctions/sqlSelectAcademicTagUpdates.js"); 
const removeUnitTag = async (db, query) => {
  removeTags(db, query);
  const Academics = await AcademicTags(db, query);
  updateTags(db, query, Academics);
}
// Get all the tags for a specified academic 
const removeTags = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlRemoveUnitTag(query.tag, query.UnitCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
  })
}
const updateTags = (db, query,academics) => { 

      
  return new Promise((resolve, reject) => {
    let result = []; 

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


module.exports = removeUnitTag; 