sqlGetAcademicTags = require("./sqlGetFunctions/sqlGetAcademicTags.js"); 

// Get all the tags for a specified academic 
const getAcademicTags = (db, academicID) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlGetAcademicTags(academicID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
  })
}

module.exports = getAcademicTags; 