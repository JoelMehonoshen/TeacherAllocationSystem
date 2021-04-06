sqlAllYears = require("./sqlGetFunctions/sqlAllYears.js"); 

// Get all the tags
const allYears = (db) => {
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlAllYears(), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })
}

module.exports = allYears; 