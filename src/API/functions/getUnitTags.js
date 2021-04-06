sqlGetUnitTags = require("./sqlGetFunctions/sqlGetUnitTags.js"); 

// Get all the tags for a specified academic 
const getUnitTags = (db, unitCode) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlGetUnitTags(unitCode), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
  })
}

module.exports = getUnitTags; 