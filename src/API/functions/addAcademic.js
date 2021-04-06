sqlInsertAcademic = require("./sqlUpdateFunctions/sqlInsertAcademic.js");
sqlInsertAcademicAllocation = require("./sqlUpdateFunctions/sqlInsertAcademicAllocation.js"); 


const addAcademic = (db, query) => {
  console.log(query);
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlInsertAcademic(query.name, query.school), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
  
      db.each(sqlInsertAcademicAllocation(query.name, query.yearID,query.load), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = addAcademic; 