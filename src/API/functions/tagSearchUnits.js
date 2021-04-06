sqlTagSearchUnits = require("./sqlGetFunctions/sqlTagSearchUnits.js"); 

// Search function for units 
// Searches based on tag: e.g. "cab" 
const tagSearchUnits = (db, searchQuery) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlTagSearchUnits(searchQuery.tags, searchQuery.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = tagSearchUnits; 