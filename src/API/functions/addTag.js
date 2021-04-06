sqlAddTag = require("./sqlUpdateFunctions/sqlAddTag.js"); 

// Allocates a unit to a specified academic 
const addTag = (db, query) => { 
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAddTag(query.tag), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
}

module.exports = addTag; 