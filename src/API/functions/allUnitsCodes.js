sqlAllUnitCodes = require("./sqlGetFunctions/sqlAllUnitCodes.js"); 

// Get all the tags
const allUnitCodes = (db) => {
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlAllUnitCodes(), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })
}

module.exports = allUnitCodes; 