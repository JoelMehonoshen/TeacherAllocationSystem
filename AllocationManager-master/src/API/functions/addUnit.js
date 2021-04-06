sqlInsertUnit = require("./sqlUpdateFunctions/sqlCreateUnit.js"); 


const addUnit = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlInsertUnit(query.unitCode, query.unitName, query.tags), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = addUnit; 