sqlTagSearchAcademics = require("./sqlGetFunctions/sqlTagSearchAcademics.js"); 

// Search function
// Searches based on tag: e.g. "cab" 
const tagSearchAcademics = (db, searchQuery) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlTagSearchAcademics(searchQuery.tags, searchQuery.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = tagSearchAcademics; 