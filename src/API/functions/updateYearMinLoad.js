sqlUpdateYearMinLoad = require("./sqlUpdateFunctions/sqlUpdateYearMinLoad.js"); 

const updateYearMinLoad = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUpdateYearMinLoad(query.yearID, query.newMinLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = updateYearMinLoad; 