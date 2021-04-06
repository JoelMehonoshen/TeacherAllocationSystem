sqlUpdateAcademicLoad = require("./sqlUpdateFunctions/sqlUpdateAcademicLoad.js"); 
sqlAcademicErrorUpdate = require("./sqlUpdateFunctions/sqlAcademicErrorUpdate.js"); 

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

const updateAcademicLoad = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlUpdateAcademicLoad(query.academicID, query.yearID, query.newLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
      wait(600)
      db.each(sqlAcademicErrorUpdate(query.academicID, query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

module.exports = updateAcademicLoad; 