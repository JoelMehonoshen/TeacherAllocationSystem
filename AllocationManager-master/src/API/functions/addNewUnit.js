sqlAddNewUnit = require("./sqlUpdateFunctions/sqlAddNewUnit.js"); 

// Get all the tags
const addNewUnit = (db, query) => {
  console.log(query); 
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlAddNewUnit(query.unitCode, query.yearID, query.minLoad, query.semesterID, query.share, query.enrolled), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })

}


module.exports = addNewUnit; 