sqlUpdateUnitShare = require("./sqlUpdateFunctions/sqlUpdateUnitShare.js"); 

const updateUnitShare = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUpdateUnitShare(query.unitYearCode, query.newShare, query.enrolled, query.minLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = updateUnitShare; 