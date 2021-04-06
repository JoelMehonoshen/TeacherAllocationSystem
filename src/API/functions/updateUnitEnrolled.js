sqlUpdateUnitEnrolled = require("./sqlUpdateFunctions/sqlUpdateUnitEnrolled.js"); 

const updateUnitEnrolled = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUpdateUnitEnrolled(query.unitYearCode, query.newEnrolled, query.share, query.minLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = updateUnitEnrolled; 