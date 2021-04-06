sqlCreateUnit = require("./sqlUpdateFunctions/sqlCreateUnit.js"); 

// Get all the tags
const createUnit = (db, query) => {
    console.log(query); 
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlCreateUnit(query.unitCode, query.unitName), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })
}

module.exports = createUnit; 