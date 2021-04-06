sqlAddYear = require("./sqlUpdateFunctions/sqlAddYear.js"); 

const addYear = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAddYear(query.year, query.minLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = addYear; 